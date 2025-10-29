import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface AppConfig {
  COO_EMAIL: string;
  APPROVAL_WAITING_PERIOD_DAYS: number;
  REMINDER_EMAIL_ENABLED: boolean;
}

export async function getAppConfig(): Promise<AppConfig> {
  const configs = await prisma.appConfiguration.findMany({
    where: {
      key: {
        in: ['COO_EMAIL', 'APPROVAL_WAITING_PERIOD_DAYS', 'REMINDER_EMAIL_ENABLED']
      }
    }
  });

  const configMap: Record<string, string> = {};
  configs.forEach(config => {
    configMap[config.key] = config.value;
  });

  return {
    COO_EMAIL: configMap['COO_EMAIL'] || 'coo@experion.com',
    APPROVAL_WAITING_PERIOD_DAYS: parseInt(configMap['APPROVAL_WAITING_PERIOD_DAYS'] || '2'),
    REMINDER_EMAIL_ENABLED: configMap['REMINDER_EMAIL_ENABLED'] === 'true'
  };
}

export async function initializeAppConfig() {
  const defaultConfigs = [
    { key: 'COO_EMAIL', value: 'coo@experion.com', dataType: 'string' },
    { key: 'APPROVAL_WAITING_PERIOD_DAYS', value: '2', dataType: 'number' },
    { key: 'REMINDER_EMAIL_ENABLED', value: 'true', dataType: 'boolean' }
  ];

  for (const config of defaultConfigs) {
    await prisma.appConfiguration.upsert({
      where: { key: config.key },
      update: {},
      create: config
    });
  }
}
