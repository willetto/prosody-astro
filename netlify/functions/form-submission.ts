/**
 * Netlify Serverless Function: Form Submission Handler (TypeScript)
 * Processes contact form submissions and creates leads in Pipedrive
 *
 * Triggered by: Netlify Forms on form submission
 * Environment Variables Required:
 * - PIPEDRIVE_API_KEY: Your Pipedrive API token
 */

import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const DEBUG_PREFIX = "[FORM-SUBMISSION]";
const PIPEDRIVE_DOMAIN = "prosodydigital.pipedrive.com";

/**
 * Log levels for consistent logging
 */
type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Form data structure from contact form
 */
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  "form-name": string;
  "bot-field"?: string; // Honeypot field
}

/**
 * Pipedrive Person object structure
 */
interface PipedrivePerson {
  id: number;
  name: string;
  first_name?: string;
  last_name?: string;
  email?: Array<{ value: string; primary: boolean }>;
}

/**
 * Pipedrive Lead object structure
 */
interface PipedriveLead {
  id: string;
  title: string;
  person_id: number;
  source_name: string;
  note?: string;
}

/**
 * Pipedrive API response structure
 */
interface PipedriveResponse<T = any> {
  success: boolean;
  data: T;
  additional_data?: any;
}

/**
 * Enhanced logging utility with timestamps and context
 */
function log(level: LogLevel, message: string, data: any = null): void {
  const timestamp = new Date().toISOString();
  const logMessage = `${DEBUG_PREFIX} [${level.toUpperCase()}] ${timestamp}: ${message}`;

  if (data) {
    console.log(logMessage, JSON.stringify(data, null, 2));
  } else {
    console.log(logMessage);
  }
}

/**
 * Make authenticated requests to Pipedrive API
 */
async function pipedriveRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PipedriveResponse<T>> {
  const apiKey = process.env.PIPEDRIVE_API_KEY;

  if (!apiKey) {
    throw new Error("PIPEDRIVE_API_KEY environment variable is required");
  }

  const baseUrl = `https://${PIPEDRIVE_DOMAIN}/v1`;
  const url = `${baseUrl}${endpoint}?api_token=${apiKey}`;

  const defaultOptions: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  const requestOptions = { ...defaultOptions, ...options };

  log("debug", `Making Pipedrive API request`, {
    method: requestOptions.method,
    endpoint,
    domain: PIPEDRIVE_DOMAIN,
    url: url.replace(apiKey, "***API_KEY***"), // Hide API key in logs
  });

  try {
    const response = await fetch(url, requestOptions);
    const data: PipedriveResponse<T> = await response.json();

    if (!response.ok) {
      log("error", `Pipedrive API error`, {
        status: response.status,
        statusText: response.statusText,
        data,
      });
      throw new Error(
        `Pipedrive API error: ${response.status} ${response.statusText}`
      );
    }

    log("debug", `Pipedrive API response`, {
      success: data.success,
      dataCount: Array.isArray(data.data)
        ? data.data.length
        : data.data
        ? 1
        : 0,
    });

    return data;
  } catch (error) {
    log("error", `Pipedrive API request failed`, {
      endpoint,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Find existing person by email or create new one
 */
async function findOrCreatePerson(
  email: string,
  firstName: string,
  lastName: string
): Promise<PipedrivePerson> {
  log("info", `Finding or creating person`, { email, firstName, lastName });

  try {
    // Search for existing person by email
    const searchResponse = await pipedriveRequest<{
      items: Array<{ item: PipedrivePerson }>;
    }>("/persons/search", {
      method: "GET",
    });

    let person: PipedrivePerson | null = null;
    if (searchResponse.data && Array.isArray(searchResponse.data.items)) {
      const foundItem = searchResponse.data.items.find(
        (item) =>
          item.item &&
          item.item.email &&
          item.item.email.some((emailObj) => emailObj.value === email)
      );

      if (foundItem) {
        person = foundItem.item;
        log("info", `Found existing person`, {
          personId: person.id,
          name: person.name,
        });
        return person;
      }
    }

    // Create new person if not found
    log("info", `Creating new person in Pipedrive`);
    const createResponse = await pipedriveRequest<PipedrivePerson>("/persons", {
      method: "POST",
      body: JSON.stringify({
        name: `${firstName} ${lastName}`.trim(),
        email: [email],
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (createResponse.success && createResponse.data) {
      log("info", `Successfully created person`, {
        personId: createResponse.data.id,
        name: createResponse.data.name,
      });
      return createResponse.data;
    } else {
      throw new Error("Failed to create person in Pipedrive");
    }
  } catch (error) {
    log("error", `Error in findOrCreatePerson`, {
      email,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Create a lead in Pipedrive
 */
async function createLead(
  person: PipedrivePerson,
  formData: Pick<ContactFormData, "message">
): Promise<PipedriveLead> {
  log("info", `Creating lead in Pipedrive`, {
    personId: person.id,
    personName: person.name,
  });

  try {
    const leadData: Partial<PipedriveLead> & {
      title: string;
      person_id: number;
      source_name: string;
      note?: string;
    } = {
      title: `Website Contact: ${person.name}`,
      person_id: person.id,
      source_name: "Website Contact Form",
      // Add custom fields if you have them configured in Pipedrive
      // visible_to: 1, // Visible to owner & followers (adjust as needed)
    };

    // Add the message as a note if provided
    if (formData.message) {
      leadData.note = `Contact Form Message:\n\n${formData.message}`;
    }

    log("debug", `Lead data being sent`, leadData);

    const response = await pipedriveRequest<PipedriveLead>("/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    });

    if (response.success && response.data) {
      log("info", `Successfully created lead`, {
        leadId: response.data.id,
        leadTitle: response.data.title,
        personId: response.data.person_id,
      });
      return response.data;
    } else {
      throw new Error("Failed to create lead in Pipedrive");
    }
  } catch (error) {
    log("error", `Error creating lead`, {
      personId: person.id,
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }
}

/**
 * Parse URL-encoded form data into ContactFormData object
 */
function parseFormData(body: string): ContactFormData {
  const params = new URLSearchParams(body);
  const formData = Object.fromEntries(params) as unknown as ContactFormData;
  return formData;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Main handler function
 */
export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Start timing
  const startTime = Date.now();

  log("info", `Form submission handler started`, {
    httpMethod: event.httpMethod,
    headers: event.headers,
    timestamp: new Date().toISOString(),
  });

  // Only process POST requests
  if (event.httpMethod !== "POST") {
    log("warn", `Invalid HTTP method`, { method: event.httpMethod });
    return {
      statusCode: 405,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse form data
    let formData: ContactFormData;
    try {
      if (!event.body) {
        throw new Error("No form data received");
      }

      formData = parseFormData(event.body);

      log("info", `Parsed form data`, {
        formName: formData["form-name"],
        hasFirstName: !!formData.firstName,
        hasLastName: !!formData.lastName,
        hasEmail: !!formData.email,
        hasMessage: !!formData.message,
        messageLength: formData.message ? formData.message.length : 0,
        isSpam: !!formData["bot-field"], // Honeypot field should be empty
      });
    } catch (parseError) {
      log("error", `Failed to parse form data`, {
        error:
          parseError instanceof Error ? parseError.message : String(parseError),
        body: event.body,
      });
      throw new Error("Invalid form data");
    }

    // Check honeypot field for spam
    if (formData["bot-field"]) {
      log("warn", `Spam detected via honeypot field`, {
        botField: formData["bot-field"],
      });
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Spam detected" }),
      };
    }

    // Validate required fields
    const { firstName, lastName, email, message } = formData;

    if (!firstName || !lastName || !email) {
      log("warn", `Missing required fields`, {
        firstName: !!firstName,
        lastName: !!lastName,
        email: !!email,
      });
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: "Missing required fields",
          required: ["firstName", "lastName", "email"],
        }),
      };
    }

    // Validate email format
    if (!isValidEmail(email)) {
      log("warn", `Invalid email format`, { email });
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ error: "Invalid email format" }),
      };
    }

    // Process with Pipedrive
    log("info", `Starting Pipedrive integration`);

    // Step 1: Find or create person
    const person = await findOrCreatePerson(email, firstName, lastName);

    // Step 2: Create lead
    const lead = await createLead(person, { message });

    // Calculate processing time
    const processingTime = Date.now() - startTime;

    log("info", `Form submission processed successfully`, {
      personId: person.id,
      leadId: lead.id,
      processingTimeMs: processingTime,
      email: email.replace(/(.{3}).*(@.*)/, "$1***$2"), // Partially hide email in logs
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: true,
        message: "Contact form submitted successfully",
        leadId: lead.id,
        processingTime: processingTime,
      }),
    };
  } catch (error) {
    const processingTime = Date.now() - startTime;

    log("error", `Form submission failed`, {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      processingTimeMs: processingTime,
    });

    // Return error response
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: false,
        error: "Internal server error",
        message:
          "We encountered an error processing your request. Please try again or contact support.",
      }),
    };
  }
};
