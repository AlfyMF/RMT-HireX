import app from "./app";
import { config } from "./config";

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.env}`);
  console.log(`Azure AD authentication: ${process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_TENANT_ID ? 'configured' : 'not configured'}`);
});
