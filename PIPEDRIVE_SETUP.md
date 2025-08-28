# Pipedrive Integration Setup Guide

## Overview

This guide covers the complete setup for the Netlify Forms → Pipedrive CRM integration with comprehensive debugging capabilities.

## Prerequisites

- ✅ Pipedrive account with API access
- ✅ Netlify hosting
- ✅ PIPEDRIVE_API_KEY in your environment variables

## Environment Variables

### Required

```bash
PIPEDRIVE_API_KEY=your_pipedrive_api_token_here
```

### Note on Pipedrive Domain

The function is pre-configured to use `prosodydigital.pipedrive.com` - no environment variable needed for the domain.

### How to Find Your Pipedrive API Key

1. Log into your Pipedrive account
2. Go to Settings → Personal Preferences → API
3. Copy your API token
4. Add it to your Netlify environment variables:
   - Netlify Dashboard → Site Settings → Environment Variables
   - Add `PIPEDRIVE_API_KEY` with your token value

## Architecture Overview

### Data Flow

```
Contact Form Submission
    ↓
Netlify Forms (spam filtering + backup)
    ↓
Custom Netlify Function (form-submission.ts)
    ↓
Pipedrive API Integration
    ↓
Lead Created in Pipedrive
```

### Pipedrive Lead Structure

Based on your Pipedrive schema:

- **Lead Title**: "Website Contact: [Full Name]"
- **Person**: Found by email or created new
- **Source**: Automatically set to "API" by Pipedrive
- **Note**: Contains the contact form message
- **Fields**: firstName, lastName, email, message

## Testing & Debugging

### Frontend Console Logs

The contact form provides detailed console logging with `[CONTACT-FORM]` prefix:

- Form submission start
- Netlify Forms response status
- Pipedrive integration success/failure
- Completion status

### Backend Function Logs

The Netlify function provides comprehensive logging with `[FORM-SUBMISSION]` prefix:

- Request processing details
- Pipedrive API calls (with API key masking)
- Person creation/finding
- Lead creation
- Processing times
- Error details with stack traces

### How to View Logs

#### Netlify Function Logs

1. Netlify Dashboard → Functions tab
2. Click on `form-submission` function
3. View real-time logs

#### Browser Console

1. Open Developer Tools (F12)
2. Go to Console tab
3. Submit a form to see detailed logs

### Common Debug Scenarios

#### 1. API Key Issues

**Symptoms**: Function fails with "PIPEDRIVE_API_KEY environment variable is required"
**Debug**: Check Netlify environment variables are set correctly

#### 2. Person Creation Failures

**Symptoms**: Logs show "Error in findOrCreatePerson"
**Debug**: Check Pipedrive API permissions and email format validation

#### 3. Lead Creation Failures

**Symptoms**: Person created but lead creation fails
**Debug**: Check Pipedrive pipeline permissions and custom field configurations

#### 4. Network Issues

**Symptoms**: "Pipedrive API request failed" errors
**Debug**: Check Pipedrive service status and API rate limits

## Integration Features

### Spam Protection

- Honeypot field (`bot-field`) for basic spam filtering
- Netlify Forms spam detection as first layer
- Function only processes valid submissions

### Error Handling

- Graceful degradation: Form still works if Pipedrive is down
- User always sees success message if Netlify Forms succeeds
- Detailed error logging for debugging
- Button state management (loading/disabled states)

### Performance

- Parallel processing of Netlify Forms and Pipedrive integration
- Processing time logging for performance monitoring
- Timeout handling for long-running requests

## Customization Options

### Form Fields

Current fields: `firstName`, `lastName`, `email`, `message`

To add more fields:

1. Update `ContactForm.astro` HTML
2. Update Sanity schema if needed
3. Modify `form-submission.ts` to handle new fields
4. Map new fields to Pipedrive custom fields

### Pipedrive Customization

Edit `form-submission.ts` `createLead()` function:

```javascript
const leadData = {
  title: `Website Contact: ${person.name}`,
  person_id: person.id,
  source_name: "Website Contact Form",
  // Add your custom fields here:
  // 'custom_field_id': value,
  // visible_to: 1,
  // pipeline_id: your_pipeline_id,
  // stage_id: your_stage_id,
};
```

### Success Messages

Customize success messages in Sanity Studio:

- Each contact form section can have a unique success message
- Fallback: "Thank you for your message! We'll get back to you soon."

## Monitoring & Maintenance

### Health Checks

- Monitor Netlify function logs for errors
- Check Pipedrive for new leads appearing
- Verify email notifications are working

### Regular Maintenance

- Review and clear old Netlify Forms submissions
- Monitor Pipedrive API usage/limits
- Update API tokens as needed

## Troubleshooting Commands

### Test Pipedrive API Connection

```bash
curl -X GET "https://api.pipedrive.com/v1/users/me?api_token=YOUR_API_KEY"
```

### View Netlify Function Logs

```bash
netlify functions:invoke form-submission --log
```

### Test Form Locally

1. Start Netlify Dev: `netlify dev`
2. Submit form on localhost
3. Check function logs in terminal

## Security Notes

- API keys are masked in logs
- Email addresses are partially hidden in logs
- Environment variables are not exposed to frontend
- Honeypot spam protection included
- HTTPS-only communication with Pipedrive

## Support

If you encounter issues:

1. Check the console logs first
2. Review Netlify function logs
3. Verify environment variables
4. Test Pipedrive API connection directly
5. Check this documentation for common issues
