#!/bin/bash
set -e

# Verify Azure AD credentials are available
if [ -z "${AZURE_AD_CLIENT_ID}" ] || [ -z "${AZURE_AD_TENANT_ID}" ]; then
  echo "ERROR: Azure AD credentials not configured"
  echo "Please set AZURE_AD_CLIENT_ID and AZURE_AD_TENANT_ID in Replit Secrets"
  exit 1
fi

# Verify SMTP credentials are available
if [ -z "${SMTP_SERVER}" ] || [ -z "${SMTP_USERNAME}" ] || [ -z "${SMTP_PASSWORD}" ]; then
  echo "WARNING: SMTP credentials not fully configured"
  echo "Email notifications may not work. Please set SMTP_SERVER, SMTP_USERNAME, and SMTP_PASSWORD in Replit Secrets"
fi

# CRITICAL: Unset PORT first, then set to correct value to override Replit environment
# This fixes the issue where Replit has PORT=587 (SMTP port) instead of 3001 (web server port)
unset PORT
export PORT=3001

# Export the environment variables explicitly
export AZURE_AD_CLIENT_ID="${AZURE_AD_CLIENT_ID}"
export AZURE_AD_TENANT_ID="${AZURE_AD_TENANT_ID}"
export SMTP_SERVER="${SMTP_SERVER}"
export SMTP_PORT="${SMTP_PORT}"
export SMTP_USERNAME="${SMTP_USERNAME}"
export SMTP_PASSWORD="${SMTP_PASSWORD}"

# Start the dev server
exec npm run dev
