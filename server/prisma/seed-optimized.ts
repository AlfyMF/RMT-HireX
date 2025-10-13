import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting optimized database seeding...');

  // Skip countries for now, seed critical tables for UI
  
  // Seed Departments
  console.log('Seeding Departments...');
  await prisma.department.createMany({
    data: [
      { name: 'Engineering', code: 'ENG', description: 'Engineering Department' },
      { name: 'Product', code: 'PRD', description: 'Product Department' },
      { name: 'Design', code: 'DES', description: 'Design Department' },
      { name: 'Marketing', code: 'MKT', description: 'Marketing Department' },
      { name: 'Sales', code: 'SAL', description: 'Sales Department' },
      { name: 'HR', code: 'HR', description: 'Human Resources' },
      { name: 'Finance', code: 'FIN', description: 'Finance Department' },
      { name: 'Operations', code: 'OPS', description: 'Operations Department' },
      { name: 'Customer Success', code: 'CS', description: 'Customer Success' },
      { name: 'Data Science', code: 'DS', description: 'Data Science Department' },
      { name: 'DevOps', code: 'DEVOPS', description: 'DevOps Department' },
      { name: 'Quality Assurance', code: 'QA', description: 'QA Department' },
    ],
    skipDuplicates: true,
  });

  // Seed Skills
  console.log('Seeding Skills...');
  await prisma.skill.createMany({
    data: [
      { name: 'JavaScript', category: 'Programming', isTechnical: true, importance: 'primary' },
      { name: 'TypeScript', category: 'Programming', isTechnical: true, importance: 'primary' },
      { name: 'React', category: 'Frontend', isTechnical: true, importance: 'primary' },
      { name: 'Node.js', category: 'Backend', isTechnical: true, importance: 'primary' },
      { name: 'Python', category: 'Programming', isTechnical: true, importance: 'primary' },
      { name: 'Java', category: 'Programming', isTechnical: true, importance: 'primary' },
      { name: 'SQL', category: 'Database', isTechnical: true, importance: 'primary' },
      { name: 'AWS', category: 'Cloud', isTechnical: true, importance: 'primary' },
      { name: 'Docker', category: 'DevOps', isTechnical: true, importance: 'secondary' },
      { name: 'Kubernetes', category: 'DevOps', isTechnical: true, importance: 'secondary' },
      { name: 'Git', category: 'Tools', isTechnical: true, importance: 'primary' },
      { name: 'REST API', category: 'Backend', isTechnical: true, importance: 'primary' },
      { name: 'GraphQL', category: 'Backend', isTechnical: true, importance: 'secondary' },
      { name: 'MongoDB', category: 'Database', isTechnical: true, importance: 'secondary' },
      { name: 'PostgreSQL', category: 'Database', isTechnical: true, importance: 'primary' },
    ],
    skipDuplicates: true,
  });

  // Seed Job Titles
  console.log('Seeding Job Titles...');
  await prisma.jobTitle.createMany({
    data: [
      { title: 'Software Engineer', level: 2 },
      { title: 'Senior Software Engineer', level: 3 },
      { title: 'Staff Software Engineer', level: 4 },
      { title: 'Principal Software Engineer', level: 5 },
      { title: 'Frontend Developer', level: 2 },
      { title: 'Backend Developer', level: 2 },
      { title: 'Full Stack Developer', level: 2 },
      { title: 'DevOps Engineer', level: 2 },
      { title: 'QA Engineer', level: 2 },
      { title: 'Product Manager', level: 3 },
      { title: 'Engineering Manager', level: 4 },
      { title: 'Data Scientist', level: 3 },
      { title: 'UI/UX Designer', level: 2 },
      { title: 'Technical Lead', level: 4 },
      { title: 'Architect', level: 5 },
    ],
    skipDuplicates: true,
  });

  // Seed Qualifications
  console.log('Seeding Qualifications...');
  await prisma.qualification.createMany({
    data: [
      { name: 'Bachelor of Science in Computer Science', level: 'Bachelors' },
      { name: 'Bachelor of Engineering', level: 'Bachelors' },
      { name: 'Master of Science in Computer Science', level: 'Masters' },
      { name: 'Master of Business Administration', level: 'Masters' },
      { name: 'Ph.D. in Computer Science', level: 'Doctorate' },
      { name: 'Bachelor of Technology', level: 'Bachelors' },
      { name: 'Master of Technology', level: 'Masters' },
      { name: 'Bachelor of Arts', level: 'Bachelors' },
      { name: 'Master of Arts', level: 'Masters' },
      { name: 'Associate Degree', level: 'Associate' },
      { name: 'High School Diploma', level: 'High School' },
      { name: 'Bootcamp Certificate', level: 'Certificate' },
      { name: 'Professional Certificate', level: 'Certificate' },
      { name: 'Bachelor of Commerce', level: 'Bachelors' },
      { name: 'Master of Science in Data Science', level: 'Masters' },
    ],
    skipDuplicates: true,
  });

  // Seed Roles
  console.log('Seeding Roles...');
  await prisma.role.createMany({
    data: [
      { name: 'Admin', description: 'System Administrator' },
      { name: 'Hiring Manager', description: 'Hiring Manager' },
      { name: 'Recruiter', description: 'Recruiter' },
      { name: 'DU Head', description: 'Delivery Unit Head' },
      { name: 'Employee', description: 'Regular Employee' },
      { name: 'HR Manager', description: 'Human Resources Manager' },
      { name: 'Finance Manager', description: 'Finance Manager' },
      { name: 'Department Head', description: 'Department Head' },
      { name: 'Team Lead', description: 'Team Lead' },
      { name: 'Interviewer', description: 'Technical Interviewer' },
      { name: 'Approver', description: 'Requisition Approver' },
    ],
    skipDuplicates: true,
  });

  // Seed Users (need to get department and role IDs first)
  console.log('Seeding Users...');
  const engDept = await prisma.department.findFirst({ where: { code: 'ENG' } });
  const hiringManagerRole = await prisma.role.findFirst({ where: { name: 'Hiring Manager' } });
  const duHeadRole = await prisma.role.findFirst({ where: { name: 'DU Head' } });

  if (engDept && hiringManagerRole && duHeadRole) {
    await prisma.user.createMany({
      data: [
        { name: 'John Doe', email: 'john.doe@example.com', roleId: hiringManagerRole.id, departmentId: engDept.id },
        { name: 'Jane Smith', email: 'jane.smith@example.com', roleId: duHeadRole.id, departmentId: engDept.id },
        { name: 'Bob Johnson', email: 'bob.johnson@example.com', roleId: hiringManagerRole.id, departmentId: engDept.id },
      ],
      skipDuplicates: true,
    });
  }

  // Seed Office Locations (few essential ones)
  console.log('Seeding Office Locations...');
  const usa = await prisma.country.findFirst({ where: { code: 'US' } }) || 
              await prisma.country.create({ data: { name: 'United States', code: 'US', phoneCode: '+1' } });
  const india = await prisma.country.findFirst({ where: { code: 'IN' } }) || 
                await prisma.country.create({ data: { name: 'India', code: 'IN', phoneCode: '+91' } });

  await prisma.officeLocation.createMany({
    data: [
      { name: 'Bangalore Office', city: 'Bangalore', countryId: india.id },
      { name: 'Mumbai Office', city: 'Mumbai', countryId: india.id },
      { name: 'New York Office', city: 'New York', countryId: usa.id },
      { name: 'San Francisco Office', city: 'San Francisco', countryId: usa.id },
    ],
    skipDuplicates: true,
  });

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

  console.log('Optimized seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
