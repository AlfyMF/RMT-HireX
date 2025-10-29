import { initializeAppConfig } from '../config/appConfig';

async function main() {
  try {
    console.log('Initializing application configuration...');
    await initializeAppConfig();
    console.log('✓ Application configuration initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('✗ Failed to initialize configuration:', error);
    process.exit(1);
  }
}

main();
