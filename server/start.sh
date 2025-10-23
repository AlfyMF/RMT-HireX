#!/bin/bash
set -e

# Verify Azure AD credentials are available
if [ -z "${AZURE_AD_CLIENT_ID}" ] || [ -z "${AZURE_AD_TENANT_ID}" ]; then
  echo "ERROR: Azure AD credentials not configured"
  echo "Please set AZURE_AD_CLIENT_ID and AZURE_AD_TENANT_ID in Replit Secrets"
  exit 1
fi

# Export the environment variables explicitly
export AZURE_AD_CLIENT_ID="${AZURE_AD_CLIENT_ID}"
export AZURE_AD_TENANT_ID="${AZURE_AD_TENANT_ID}"

# Start the dev server
exec npm run dev
