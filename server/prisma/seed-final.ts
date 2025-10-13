import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Completing database seeding...');

  // Get country IDs
  const usa = await prisma.country.findFirst({ where: { code: 'US' } });
  const india = await prisma.country.findFirst({ where: { code: 'IN' } });

  // Seed Office Locations
  if (usa && india) {
    console.log('Seeding Office Locations...');
    await prisma.officeLocation.createMany({
      data: [
        { name: 'Bangalore Office', address: 'MG Road, Bangalore, Karnataka', countryId: india.id },
        { name: 'Mumbai Office', address: 'Andheri East, Mumbai, Maharashtra', countryId: india.id },
        { name: 'New York Office', address: 'Manhattan, New York, NY', countryId: usa.id },
        { name: 'San Francisco Office', address: 'Financial District, San Francisco, CA', countryId: usa.id },
      ],
      skipDuplicates: true,
    });
  }

  // Seed Work Shifts
  console.log('Seeding Work Shifts...');
  await prisma.workShift.createMany({
    data: [
      { name: 'Day Shift', startTime: '09:00', endTime: '18:00' },
      { name: 'Night Shift', startTime: '22:00', endTime: '07:00' },
      { name: 'Evening Shift', startTime: '14:00', endTime: '23:00' },
      { name: 'Flexible', startTime: '00:00', endTime: '00:00' },
      { name: 'US Hours', startTime: '18:00', endTime: '03:00' },
      { name: 'UK Hours', startTime: '13:30', endTime: '22:30' },
      { name: 'AU Hours', startTime: '05:00', endTime: '14:00' },
    ],
    skipDuplicates: true,
  });

  // Seed Work Timezones
  console.log('Seeding Work Timezones...');
  await prisma.workTimeZone.createMany({
    data: [
      { name: 'IST', description: 'Indian Standard Time', offset: '+05:30' },
      { name: 'EST', description: 'Eastern Standard Time', offset: '-05:00' },
      { name: 'PST', description: 'Pacific Standard Time', offset: '-08:00' },
      { name: 'GMT', description: 'Greenwich Mean Time', offset: '+00:00' },
      { name: 'CET', description: 'Central European Time', offset: '+01:00' },
      { name: 'JST', description: 'Japan Standard Time', offset: '+09:00' },
      { name: 'AEST', description: 'Australian Eastern Standard Time', offset: '+10:00' },
    ],
    skipDuplicates: true,
  });

  // Seed Visa Statuses
  console.log('Seeding Visa Statuses...');
  await prisma.visaStatus.createMany({
    data: [
      { status: 'US Citizen' },
      { status: 'Green Card Holder' },
      { status: 'H1B' },
      { status: 'L1' },
      { status: 'F1 (OPT)' },
      { status: 'F1 (CPT)' },
      { status: 'EAD' },
      { status: 'TN Visa' },
      { status: 'O1 Visa' },
      { status: 'Canadian Citizen' },
      { status: 'UK Citizen' },
      { status: 'EU Citizen' },
      { status: 'Requires Sponsorship' },
      { status: 'No Work Authorization' },
      { status: 'Other' },
    ],
    skipDuplicates: true,
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
