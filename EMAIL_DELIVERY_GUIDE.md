# Email Delivery Troubleshooting Guide

## Current Status
✅ **Email triggering logic is working** - Emails are being sent from the application  
✅ **Database logging is working** - Entries are successfully created in the `EmailNotification` table  
❌ **Email delivery is failing** - Emails are not reaching `campusportal.automation@experionglobal.com` or `internalsystems@experionglobal.com`

## Root Cause
The Resend API is accepting the email send requests (marking them as "sent" in our database), but emails are **not being delivered** because of one of these issues:

### Most Likely: Domain Not Verified
- Your Resend `from_email` uses a domain that **hasn't been verified** in your Resend account
- Resend requires domain verification (DNS records: SPF, DKIM, DMARC) before delivering emails
- Without verification, Resend accepts the API call but **silently drops the emails**

### Alternative Issues:
- Sandbox/test mode restrictions
- Recipient email addresses blocked or bounced
- Resend account limits (free tier: 100 emails/day, 10,000/month)

---

## Solution Options

### ✅ **Option 1: Use Resend's Test Domain (Recommended for Development)**

**Best for**: Testing and development environments

**Steps**:
1. Go to your Resend connection settings in Replit
2. Change the `from_email` to: `onboarding@resend.dev`
3. This is Resend's pre-verified domain - no setup needed!
4. Test by creating a new Job Requisition

**Pros**: 
- Instant setup, no DNS configuration needed
- Works immediately for testing
- No domain verification required

**Cons**: 
- Uses generic "onboarding@resend.dev" as sender
- Not suitable for production

---

### ✅ **Option 2: Verify Your Custom Domain (Recommended for Production)**

**Best for**: Production deployment with branded emails

**Steps**:

#### 1. Access Your Resend Dashboard
- Go to: https://resend.com/domains
- Sign in with the account that owns your API key

#### 2. Add Your Domain
- Click "Add Domain"
- Enter your domain (e.g., `experionglobal.com`)
- Resend will provide DNS records

#### 3. Configure DNS Records
Add these records in your domain's DNS settings (e.g., GoDaddy, Cloudflare, Route53):

**SPF Record** (TXT):
```
Type: TXT
Name: @ (or your domain)
Value: v=spf1 include:_spf.resend.com ~all
```

**DKIM Record** (CNAME):
```
Type: CNAME  
Name: resend._domainkey
Value: resend._domainkey.experionglobal.com.resend.com
```

**DMARC Record** (TXT):
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none;
```

#### 4. Wait for Verification
- DNS propagation takes 5-15 minutes (max 48 hours)
- Check status in Resend Dashboard
- Click "Verify" once records are added

#### 5. Update Resend Connection
- Update `from_email` to use your verified domain: `noreply@experionglobal.com`
- Restart the application

---

### ✅ **Option 3: Check Email Delivery Logs in Resend**

**Steps**:
1. Go to: https://resend.com/emails
2. Sign in to your Resend account
3. Check the "Emails" tab for delivery status
4. Look for error messages:
   - "Domain not verified"
   - "Bounced"
   - "Blocked"

---

## Testing the Fix

### After Implementing a Solution:

1. **Create a Test Job Requisition**:
   - Log in as a Hiring Manager (e.g., `internalsystems@experionglobal.com`)
   - Create and submit a new Job Requisition
   - This should trigger an email to the DU Head

2. **Check the Backend Logs**:
   ```bash
   # Look for these log entries:
   📧 Attempting to send email to: campusportal.automation@experionglobal.com
   📧 From: <your-from-email>
   ✅ Email sent successfully via Resend API
   📧 Resend Response: { ... }
   ```

3. **Check the Database**:
   ```sql
   SELECT recipient_email, subject, status, error, created_at 
   FROM "EmailNotification" 
   ORDER BY created_at DESC 
   LIMIT 5;
   ```

4. **Check Your Inbox**:
   - Wait 1-2 minutes for delivery
   - Check spam/junk folders
   - Verify email from correct sender address

---

## Quick Diagnostic Checklist

- [ ] Resend API key is valid and active
- [ ] Domain is verified in Resend dashboard (if using custom domain)
- [ ] DNS records (SPF, DKIM, DMARC) are configured correctly
- [ ] `from_email` matches verified domain OR uses `onboarding@resend.dev`
- [ ] Recipient emails are valid and not blocked
- [ ] Not hitting Resend rate limits (check dashboard)
- [ ] Backend logs show successful API calls
- [ ] Database shows "sent" status (not "failed")

---

## Enhanced Logging

I've added detailed logging to help diagnose issues. After sending an email, check the backend logs for:

```
📧 Attempting to send email to: <recipient>
📧 From: <sender>
📧 Subject: <subject>
✅ Email sent successfully via Resend API
📧 Resend Response: {
  "id": "xxx-xxx-xxx",
  ...
}
```

If there's an error:
```
❌ Failed to send email: <error details>
```

---

## Recommended Next Steps

1. **Immediate Fix** (for testing):
   - Change `from_email` to `onboarding@resend.dev` in Resend connection settings

2. **Long-term Fix** (for production):
   - Verify your domain at https://resend.com/domains
   - Configure DNS records
   - Update `from_email` to use your verified domain

3. **Verify Fix**:
   - Create a test Job Requisition
   - Check backend logs for email send confirmation
   - Confirm email arrives in recipient inbox

---

## Need Help?

If emails still don't arrive after trying these solutions:

1. **Check Resend Dashboard**: https://resend.com/emails
2. **Review Resend Error Docs**: https://resend.com/docs/api-reference/errors
3. **Check DNS Propagation**: https://whatsmydns.net/
4. **Contact Resend Support**: help@resend.com

---

## Current Configuration

- **Integration**: Resend (connection: `conn_resend_01K8R4DNYY5R5QJSYAHBB2FD0Z`)
- **Package**: `resend@6.4.0` (installed in root package.json)
- **Status**: API calls succeed, but emails not delivered (likely domain verification issue)
