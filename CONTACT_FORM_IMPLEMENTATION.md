# Contact Form Implementation Plan

## Overview

Implementation of a Netlify Forms-integrated contact form that feeds leads into Pipedrive CRM through serverless functions.

## Architecture

### Phase 1: Basic Contact Form Integration

1. **ContactForm.astro Component**

   - Based on existing contact.astro page
   - Fields: firstName, lastName, email, message
   - Configured with `data-netlify="true"` for automatic form detection
   - Responsive design matching existing form styling

2. **Sanity Studio Integration**

   - Create `contactForm.ts` schema in `studio/schema-types/sections/`
   - Add optional header and subheading fields for customization
   - Register as available section type in page builder

3. **Frontend Rendering**
   - Add to section components mapping in `[...slug].astro`
   - Update GROQ queries to fetch contact form data
   - Add TypeScript types for type safety

### Phase 2: Netlify Functions & Pipedrive Integration

1. **Netlify Function Setup**

   - Create function triggered by form submissions
   - Handle form validation and spam filtering
   - Environment variables for Pipedrive API credentials

2. **Pipedrive API Integration**
   - Map form fields to Pipedrive lead fields
   - Create leads in appropriate pipeline
   - Handle API errors gracefully
   - Log submissions for debugging

## File Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── forms/
│   │       └── ContactForm.astro          # New component
│   ├── data/sanity/
│   │   ├── groq.ts                        # Add CONTACT_FORM_FIELDS
│   │   └── index.ts                       # Add ContactForm type
│   └── pages/
│       └── [...slug].astro                # Add contactForm mapping

studio/
└── schema-types/
    ├── sections/
    │   └── contactForm.ts                  # New schema
    └── index.ts                           # Register new schema

netlify/
└── functions/
    └── form-submission.js                 # New serverless function
```

## Implementation Details

### ContactForm.astro Component

- Copy base styling from `contact.astro`
- Implement proper Netlify Forms attributes
- Include hidden `form-name` input for JavaScript frameworks
- Responsive design with proper accessibility

### Sanity Schema

- Optional header/subheading for content flexibility
- Preview functionality for studio interface
- Validation rules for required fields

### GROQ Queries

- Fetch header and subheading content
- Include in page section queries
- Type-safe field definitions

### Netlify Function

- Triggered on form submission
- Parse form data
- Create Pipedrive lead via API
- Return appropriate success/error responses

## Future Extensibility

- Additional form fields for lead qualification
- Conditional logic based on form responses
- Multiple Pipedrive pipelines based on lead type
- Integration with email marketing platforms
- A/B testing capabilities

## Environment Variables Required

```
PIPEDRIVE_API_TOKEN=your_pipedrive_api_token
PIPEDRIVE_COMPANY_DOMAIN=your_company_domain
```

## Testing Strategy

1. Test basic form rendering in Sanity Studio
2. Verify Netlify Forms detection and submission
3. Test serverless function locally
4. Validate Pipedrive API integration
5. End-to-end testing with real submissions
