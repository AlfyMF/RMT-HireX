import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting exact database seeding from provided seed data...');

  // Clear existing data in reverse order of dependencies
  console.log('Clearing existing data...');
  await prisma.user.deleteMany({});
  await prisma.officeLocation.deleteMany({});
  await prisma.workShift.deleteMany({});
  await prisma.workTimeZone.deleteMany({});
  await prisma.visaStatus.deleteMany({});
  await prisma.jobTitle.deleteMany({});
  await prisma.qualification.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.role.deleteMany({});
  await prisma.department.deleteMany({});
  await prisma.country.deleteMany({});
  await prisma.certification.deleteMany({});
  await prisma.jobType.deleteMany({});

  // 1. Seed JobTypes
  console.log('Seeding JobTypes...');
  await prisma.jobType.createMany({
    data: [
      { name: 'Permanent', description: 'Permanent employment type', isActive: true },
      { name: 'Consultant', description: 'Consultant job type', isActive: true },
      { name: 'Contract', description: 'Contract-based employment', isActive: true },
    ],
  });

  // 2. Seed Certifications
  console.log('Seeding Certifications...');
  await prisma.certification.createMany({
    data: [
      { name: 'CISSP', issuingOrganization: '(ISC)²', description: 'Certified Information Systems Security Professional - Advanced cybersecurity certification', isActive: true },
      { name: 'CCNP', issuingOrganization: 'Cisco', description: 'Cisco Certified Network Professional - Advanced networking certification', isActive: true },
      { name: 'AWS Certified Solutions Architect - Professional', issuingOrganization: 'Amazon Web Services', description: 'Expert-level AWS cloud architecture certification', isActive: true },
      { name: 'PMP', issuingOrganization: 'PMI', description: 'Project Management Professional - Global standard for project managers', isActive: true },
      { name: 'ISTQB Advanced', issuingOrganization: 'ISTQB', description: 'International Software Testing Qualifications Board - Advanced software testing certification', isActive: true },
      { name: 'Microsoft Certified: Azure Solutions Architect Expert', issuingOrganization: 'Microsoft', description: 'Expert-level Microsoft Azure cloud solutions certification', isActive: true },
      { name: 'Google Professional Cloud Architect', issuingOrganization: 'Google', description: 'Google Cloud Platform architecture certification', isActive: true },
      { name: 'CEH', issuingOrganization: 'EC-Council', description: 'Certified Ethical Hacker - Cybersecurity penetration testing certification', isActive: true },
      { name: 'ITIL 4 Managing Professional', issuingOrganization: 'AXELOS', description: 'IT service management best practices certification', isActive: true },
      { name: 'CompTIA Security+', issuingOrganization: 'CompTIA', description: 'Foundational cybersecurity certification', isActive: true },
      { name: 'Red Hat Certified Engineer (RHCE)', issuingOrganization: 'Red Hat', description: 'Enterprise Linux system administration certification', isActive: true },
      { name: 'Certified Kubernetes Administrator (CKA)', issuingOrganization: 'Cloud Native Computing Foundation', description: 'Kubernetes cluster administration certification', isActive: true },
      { name: 'Oracle Certified Professional: Java SE Developer', issuingOrganization: 'Oracle', description: 'Advanced Java programming certification', isActive: true },
      { name: 'SAP Certified Application Associate', issuingOrganization: 'SAP', description: 'SAP product implementation certification', isActive: true },
      { name: 'ServiceNow Certified System Administrator', issuingOrganization: 'ServiceNow', description: 'ServiceNow platform administration certification', isActive: true },
    ],
  });

  // 3. Seed Countries (195 countries including Vatican City)
  console.log('Seeding Countries...');
  await prisma.country.createMany({
    data: [
      { name: 'Afghanistan', code: 'AF', phoneCode: '+93', isActive: true },
      { name: 'Albania', code: 'AL', phoneCode: '+355', isActive: true },
      { name: 'Algeria', code: 'DZ', phoneCode: '+213', isActive: true },
      { name: 'Andorra', code: 'AD', phoneCode: '+376', isActive: true },
      { name: 'Angola', code: 'AO', phoneCode: '+244', isActive: true },
      { name: 'Antigua and Barbuda', code: 'AG', phoneCode: '+1268', isActive: true },
      { name: 'Argentina', code: 'AR', phoneCode: '+54', isActive: true },
      { name: 'Armenia', code: 'AM', phoneCode: '+374', isActive: true },
      { name: 'Australia', code: 'AU', phoneCode: '+61', isActive: true },
      { name: 'Austria', code: 'AT', phoneCode: '+43', isActive: true },
      { name: 'Azerbaijan', code: 'AZ', phoneCode: '+994', isActive: true },
      { name: 'Bahamas', code: 'BS', phoneCode: '+1242', isActive: true },
      { name: 'Bahrain', code: 'BH', phoneCode: '+973', isActive: true },
      { name: 'Bangladesh', code: 'BD', phoneCode: '+880', isActive: true },
      { name: 'Barbados', code: 'BB', phoneCode: '+1246', isActive: true },
      { name: 'Belarus', code: 'BY', phoneCode: '+375', isActive: true },
      { name: 'Belgium', code: 'BE', phoneCode: '+32', isActive: true },
      { name: 'Belize', code: 'BZ', phoneCode: '+501', isActive: true },
      { name: 'Benin', code: 'BJ', phoneCode: '+229', isActive: true },
      { name: 'Bhutan', code: 'BT', phoneCode: '+975', isActive: true },
      { name: 'Bolivia', code: 'BO', phoneCode: '+591', isActive: true },
      { name: 'Bosnia and Herzegovina', code: 'BA', phoneCode: '+387', isActive: true },
      { name: 'Botswana', code: 'BW', phoneCode: '+267', isActive: true },
      { name: 'Brazil', code: 'BR', phoneCode: '+55', isActive: true },
      { name: 'Brunei Darussalam', code: 'BN', phoneCode: '+673', isActive: true },
      { name: 'Bulgaria', code: 'BG', phoneCode: '+359', isActive: true },
      { name: 'Burkina Faso', code: 'BF', phoneCode: '+226', isActive: true },
      { name: 'Burundi', code: 'BI', phoneCode: '+257', isActive: true },
      { name: 'Cabo Verde', code: 'CV', phoneCode: '+238', isActive: true },
      { name: 'Cambodia', code: 'KH', phoneCode: '+855', isActive: true },
      { name: 'Cameroon', code: 'CM', phoneCode: '+237', isActive: true },
      { name: 'Canada', code: 'CA', phoneCode: '+1', isActive: true },
      { name: 'Central African Republic', code: 'CF', phoneCode: '+236', isActive: true },
      { name: 'Chad', code: 'TD', phoneCode: '+235', isActive: true },
      { name: 'Chile', code: 'CL', phoneCode: '+56', isActive: true },
      { name: 'China', code: 'CN', phoneCode: '+86', isActive: true },
      { name: 'Colombia', code: 'CO', phoneCode: '+57', isActive: true },
      { name: 'Comoros', code: 'KM', phoneCode: '+269', isActive: true },
      { name: 'Congo', code: 'CG', phoneCode: '+242', isActive: true },
      { name: 'Costa Rica', code: 'CR', phoneCode: '+506', isActive: true },
      { name: 'Croatia', code: 'HR', phoneCode: '+385', isActive: true },
      { name: 'Cuba', code: 'CU', phoneCode: '+53', isActive: true },
      { name: 'Cyprus', code: 'CY', phoneCode: '+357', isActive: true },
      { name: 'Czech Republic', code: 'CZ', phoneCode: '+420', isActive: true },
      { name: 'Denmark', code: 'DK', phoneCode: '+45', isActive: true },
      { name: 'Djibouti', code: 'DJ', phoneCode: '+253', isActive: true },
      { name: 'Dominica', code: 'DM', phoneCode: '+1767', isActive: true },
      { name: 'Dominican Republic', code: 'DO', phoneCode: '+1809', isActive: true },
      { name: 'Ecuador', code: 'EC', phoneCode: '+593', isActive: true },
      { name: 'Egypt', code: 'EG', phoneCode: '+20', isActive: true },
      { name: 'El Salvador', code: 'SV', phoneCode: '+503', isActive: true },
      { name: 'Equatorial Guinea', code: 'GQ', phoneCode: '+240', isActive: true },
      { name: 'Eritrea', code: 'ER', phoneCode: '+291', isActive: true },
      { name: 'Estonia', code: 'EE', phoneCode: '+372', isActive: true },
      { name: 'Eswatini', code: 'SZ', phoneCode: '+268', isActive: true },
      { name: 'Ethiopia', code: 'ET', phoneCode: '+251', isActive: true },
      { name: 'Fiji', code: 'FJ', phoneCode: '+679', isActive: true },
      { name: 'Finland', code: 'FI', phoneCode: '+358', isActive: true },
      { name: 'France', code: 'FR', phoneCode: '+33', isActive: true },
      { name: 'Gabon', code: 'GA', phoneCode: '+241', isActive: true },
      { name: 'Gambia', code: 'GM', phoneCode: '+220', isActive: true },
      { name: 'Georgia', code: 'GE', phoneCode: '+995', isActive: true },
      { name: 'Germany', code: 'DE', phoneCode: '+49', isActive: true },
      { name: 'Ghana', code: 'GH', phoneCode: '+233', isActive: true },
      { name: 'Greece', code: 'GR', phoneCode: '+30', isActive: true },
      { name: 'Grenada', code: 'GD', phoneCode: '+1473', isActive: true },
      { name: 'Guatemala', code: 'GT', phoneCode: '+502', isActive: true },
      { name: 'Guinea', code: 'GN', phoneCode: '+224', isActive: true },
      { name: 'Guinea-Bissau', code: 'GW', phoneCode: '+245', isActive: true },
      { name: 'Guyana', code: 'GY', phoneCode: '+592', isActive: true },
      { name: 'Haiti', code: 'HT', phoneCode: '+509', isActive: true },
      { name: 'Honduras', code: 'HN', phoneCode: '+504', isActive: true },
      { name: 'Hungary', code: 'HU', phoneCode: '+36', isActive: true },
      { name: 'Iceland', code: 'IS', phoneCode: '+354', isActive: true },
      { name: 'India', code: 'IN', phoneCode: '+91', isActive: true },
      { name: 'Indonesia', code: 'ID', phoneCode: '+62', isActive: true },
      { name: 'Iran', code: 'IR', phoneCode: '+98', isActive: true },
      { name: 'Iraq', code: 'IQ', phoneCode: '+964', isActive: true },
      { name: 'Ireland', code: 'IE', phoneCode: '+353', isActive: true },
      { name: 'Israel', code: 'IL', phoneCode: '+972', isActive: true },
      { name: 'Italy', code: 'IT', phoneCode: '+39', isActive: true },
      { name: 'Jamaica', code: 'JM', phoneCode: '+1876', isActive: true },
      { name: 'Japan', code: 'JP', phoneCode: '+81', isActive: true },
      { name: 'Jordan', code: 'JO', phoneCode: '+962', isActive: true },
      { name: 'Kazakhstan', code: 'KZ', phoneCode: '+7', isActive: true },
      { name: 'Kenya', code: 'KE', phoneCode: '+254', isActive: true },
      { name: 'Kiribati', code: 'KI', phoneCode: '+686', isActive: true },
      { name: 'Korea (North)', code: 'KP', phoneCode: '+850', isActive: true },
      { name: 'Korea (South)', code: 'KR', phoneCode: '+82', isActive: true },
      { name: 'Kuwait', code: 'KW', phoneCode: '+965', isActive: true },
      { name: 'Kyrgyzstan', code: 'KG', phoneCode: '+996', isActive: true },
      { name: 'Laos', code: 'LA', phoneCode: '+856', isActive: true },
      { name: 'Latvia', code: 'LV', phoneCode: '+371', isActive: true },
      { name: 'Lebanon', code: 'LB', phoneCode: '+961', isActive: true },
      { name: 'Lesotho', code: 'LS', phoneCode: '+266', isActive: true },
      { name: 'Liberia', code: 'LR', phoneCode: '+231', isActive: true },
      { name: 'Libya', code: 'LY', phoneCode: '+218', isActive: true },
      { name: 'Liechtenstein', code: 'LI', phoneCode: '+423', isActive: true },
      { name: 'Lithuania', code: 'LT', phoneCode: '+370', isActive: true },
      { name: 'Luxembourg', code: 'LU', phoneCode: '+352', isActive: true },
      { name: 'Madagascar', code: 'MG', phoneCode: '+261', isActive: true },
      { name: 'Malawi', code: 'MW', phoneCode: '+265', isActive: true },
      { name: 'Malaysia', code: 'MY', phoneCode: '+60', isActive: true },
      { name: 'Maldives', code: 'MV', phoneCode: '+960', isActive: true },
      { name: 'Mali', code: 'ML', phoneCode: '+223', isActive: true },
      { name: 'Malta', code: 'MT', phoneCode: '+356', isActive: true },
      { name: 'Marshall Islands', code: 'MH', phoneCode: '+692', isActive: true },
      { name: 'Mauritania', code: 'MR', phoneCode: '+222', isActive: true },
      { name: 'Mauritius', code: 'MU', phoneCode: '+230', isActive: true },
      { name: 'Mexico', code: 'MX', phoneCode: '+52', isActive: true },
      { name: 'Micronesia', code: 'FM', phoneCode: '+691', isActive: true },
      { name: 'Moldova', code: 'MD', phoneCode: '+373', isActive: true },
      { name: 'Monaco', code: 'MC', phoneCode: '+377', isActive: true },
      { name: 'Mongolia', code: 'MN', phoneCode: '+976', isActive: true },
      { name: 'Montenegro', code: 'ME', phoneCode: '+382', isActive: true },
      { name: 'Morocco', code: 'MA', phoneCode: '+212', isActive: true },
      { name: 'Mozambique', code: 'MZ', phoneCode: '+258', isActive: true },
      { name: 'Myanmar', code: 'MM', phoneCode: '+95', isActive: true },
      { name: 'Namibia', code: 'NA', phoneCode: '+264', isActive: true },
      { name: 'Nauru', code: 'NR', phoneCode: '+674', isActive: true },
      { name: 'Nepal', code: 'NP', phoneCode: '+977', isActive: true },
      { name: 'Netherlands', code: 'NL', phoneCode: '+31', isActive: true },
      { name: 'New Zealand', code: 'NZ', phoneCode: '+64', isActive: true },
      { name: 'Nicaragua', code: 'NI', phoneCode: '+505', isActive: true },
      { name: 'Niger', code: 'NE', phoneCode: '+227', isActive: true },
      { name: 'Nigeria', code: 'NG', phoneCode: '+234', isActive: true },
      { name: 'North Macedonia', code: 'MK', phoneCode: '+389', isActive: true },
      { name: 'Norway', code: 'NO', phoneCode: '+47', isActive: true },
      { name: 'Oman', code: 'OM', phoneCode: '+968', isActive: true },
      { name: 'Pakistan', code: 'PK', phoneCode: '+92', isActive: true },
      { name: 'Palau', code: 'PW', phoneCode: '+680', isActive: true },
      { name: 'Panama', code: 'PA', phoneCode: '+507', isActive: true },
      { name: 'Papua New Guinea', code: 'PG', phoneCode: '+675', isActive: true },
      { name: 'Paraguay', code: 'PY', phoneCode: '+595', isActive: true },
      { name: 'Peru', code: 'PE', phoneCode: '+51', isActive: true },
      { name: 'Philippines', code: 'PH', phoneCode: '+63', isActive: true },
      { name: 'Poland', code: 'PL', phoneCode: '+48', isActive: true },
      { name: 'Portugal', code: 'PT', phoneCode: '+351', isActive: true },
      { name: 'Qatar', code: 'QA', phoneCode: '+974', isActive: true },
      { name: 'Romania', code: 'RO', phoneCode: '+40', isActive: true },
      { name: 'Russia', code: 'RU', phoneCode: '+7', isActive: true },
      { name: 'Rwanda', code: 'RW', phoneCode: '+250', isActive: true },
      { name: 'Saint Kitts and Nevis', code: 'KN', phoneCode: '+1869', isActive: true },
      { name: 'Saint Lucia', code: 'LC', phoneCode: '+1758', isActive: true },
      { name: 'Saint Vincent and the Grenadines', code: 'VC', phoneCode: '+1784', isActive: true },
      { name: 'Samoa', code: 'WS', phoneCode: '+685', isActive: true },
      { name: 'San Marino', code: 'SM', phoneCode: '+378', isActive: true },
      { name: 'Sao Tome and Principe', code: 'ST', phoneCode: '+239', isActive: true },
      { name: 'Saudi Arabia', code: 'SA', phoneCode: '+966', isActive: true },
      { name: 'Senegal', code: 'SN', phoneCode: '+221', isActive: true },
      { name: 'Serbia', code: 'RS', phoneCode: '+381', isActive: true },
      { name: 'Seychelles', code: 'SC', phoneCode: '+248', isActive: true },
      { name: 'Sierra Leone', code: 'SL', phoneCode: '+232', isActive: true },
      { name: 'Singapore', code: 'SG', phoneCode: '+65', isActive: true },
      { name: 'Slovakia', code: 'SK', phoneCode: '+421', isActive: true },
      { name: 'Slovenia', code: 'SI', phoneCode: '+386', isActive: true },
      { name: 'Solomon Islands', code: 'SB', phoneCode: '+677', isActive: true },
      { name: 'Somalia', code: 'SO', phoneCode: '+252', isActive: true },
      { name: 'South Africa', code: 'ZA', phoneCode: '+27', isActive: true },
      { name: 'South Sudan', code: 'SS', phoneCode: '+211', isActive: true },
      { name: 'Spain', code: 'ES', phoneCode: '+34', isActive: true },
      { name: 'Sri Lanka', code: 'LK', phoneCode: '+94', isActive: true },
      { name: 'Sudan', code: 'SD', phoneCode: '+249', isActive: true },
      { name: 'Suriname', code: 'SR', phoneCode: '+597', isActive: true },
      { name: 'Sweden', code: 'SE', phoneCode: '+46', isActive: true },
      { name: 'Switzerland', code: 'CH', phoneCode: '+41', isActive: true },
      { name: 'Syria', code: 'SY', phoneCode: '+963', isActive: true },
      { name: 'Taiwan', code: 'TW', phoneCode: '+886', isActive: true },
      { name: 'Tajikistan', code: 'TJ', phoneCode: '+992', isActive: true },
      { name: 'Tanzania', code: 'TZ', phoneCode: '+255', isActive: true },
      { name: 'Thailand', code: 'TH', phoneCode: '+66', isActive: true },
      { name: 'Timor-Leste', code: 'TL', phoneCode: '+670', isActive: true },
      { name: 'Togo', code: 'TG', phoneCode: '+228', isActive: true },
      { name: 'Tonga', code: 'TO', phoneCode: '+676', isActive: true },
      { name: 'Trinidad and Tobago', code: 'TT', phoneCode: '+1868', isActive: true },
      { name: 'Tunisia', code: 'TN', phoneCode: '+216', isActive: true },
      { name: 'Turkey', code: 'TR', phoneCode: '+90', isActive: true },
      { name: 'Turkmenistan', code: 'TM', phoneCode: '+993', isActive: true },
      { name: 'Tuvalu', code: 'TV', phoneCode: '+688', isActive: true },
      { name: 'Uganda', code: 'UG', phoneCode: '+256', isActive: true },
      { name: 'Ukraine', code: 'UA', phoneCode: '+380', isActive: true },
      { name: 'United Arab Emirates', code: 'AE', phoneCode: '+971', isActive: true },
      { name: 'United Kingdom', code: 'GB', phoneCode: '+44', isActive: true },
      { name: 'United States', code: 'US', phoneCode: '+1', isActive: true },
      { name: 'Uruguay', code: 'UY', phoneCode: '+598', isActive: true },
      { name: 'Uzbekistan', code: 'UZ', phoneCode: '+998', isActive: true },
      { name: 'Vanuatu', code: 'VU', phoneCode: '+678', isActive: true },
      { name: 'Vatican City', code: 'VA', phoneCode: '+379', isActive: true },
      { name: 'Venezuela', code: 'VE', phoneCode: '+58', isActive: true },
      { name: 'Vietnam', code: 'VN', phoneCode: '+84', isActive: true },
      { name: 'Yemen', code: 'YE', phoneCode: '+967', isActive: true },
      { name: 'Zambia', code: 'ZM', phoneCode: '+260', isActive: true },
      { name: 'Zimbabwe', code: 'ZW', phoneCode: '+263', isActive: true },
    ],
  });

  // 4. Seed Departments
  console.log('Seeding Departments...');
  await prisma.department.createMany({
    data: [
      { name: 'Automotive. Travel & Transportation, Construction Solutions', code: 'ATC', description: 'Automotive, Travel, Transportation & Hospitality, Construction & Infrastructure', isActive: true },
      { name: 'Digital & Commerce Solutions', code: 'DES', description: 'Digital Experiences & E-commerce (across all verticals); Insurance', isActive: true },
      { name: 'Retail & Warehouse Automation Solutions', code: 'RWA', description: 'Retail, Warehouse Automation, Dealer Management', isActive: true },
      { name: 'Data & AI Solutions', code: 'DAI', description: 'Data & AI Solutions, DevOps/ Cloud Engineering (across all verticals)', isActive: true },
      { name: 'Experience Design Studio', code: 'EDS', description: 'Digital Experience Services (across all verticals)', isActive: true },
      { name: 'Digital Technology Services', code: 'DTS', description: 'Healthcare, Edutech, Banking; Automation, Cybersecurity (across all verticals)', isActive: true },
      { name: 'IOT & Embedded Solutions', code: 'IES', description: 'IOT and Embedded (across all verticals)', isActive: true },
      { name: 'VantX Financial Solutions', code: 'VTX', description: 'VantX products (VantX is the new name for Vantage)', isActive: true },
      { name: 'Facilities & Support Services', code: 'FSS', description: 'Facilities & Support Services', isActive: true },
      { name: 'Talent Acquisition', code: 'TAC', description: 'Talent Acquisition', isActive: true },
      { name: 'Contracts & Legal Services', code: 'CLS', description: 'Contracts & Legal Services', isActive: true },
      { name: 'Information Systems', code: 'INS', description: 'Information Systems', isActive: true },
    ],
  });

  // 5. Seed JobTitles (17 specific titles from the provided data)
  console.log('Seeding JobTitles...');
  await prisma.jobTitle.createMany({
    data: [
      { title: 'Associate Software Engineer', description: 'Associate Software Engineer', isActive: true },
      { title: 'Software Engineer', description: 'Software Engineer', isActive: true },
      { title: 'Senior Software Engineer', description: 'Senior Software Engineer', isActive: true },
      { title: 'Technical Specialist', description: 'Technical Specialist', isActive: true },
      { title: 'Senior Technical Specialist', description: 'Senior Technical Specialist', isActive: true },
      { title: 'Associate Consultant - Software Engineering', description: 'Associate Consultant - Software Engineering', isActive: true },
      { title: 'Consultant - Software Engineering', description: 'Consultant - Software Engineering', isActive: true },
      { title: 'Senior Consultant - Software Engineering', description: 'Senior Consultant - Software Engineering', isActive: true },
      { title: 'Principal Consultant - Software Engineering (Grade 1)', description: 'Principal Consultant - Software Engineering (Grade 1)', isActive: true },
      { title: 'Associate Data & AI Engineer', description: 'Associate Data & AI Engineer', isActive: true },
      { title: 'Data & AI Engineer', description: 'Data & AI Engineer', isActive: true },
      { title: 'Data & AI Specialist', description: 'Data & AI Specialist', isActive: true },
      { title: 'Consultant - Data & AI', description: 'Consultant - Data & AI', isActive: true },
      { title: 'Principal Consultant - Data & AI (Grade 1)', description: 'Principal Consultant - Data & AI (Grade 1)', isActive: true },
      { title: 'Test Automation Engineer', description: 'Test Automation Engineer', isActive: true },
      { title: 'Consultant - Test Automation', description: 'Consultant - Test Automation', isActive: true },
      { title: 'UI Engineer', description: 'UI Engineer', isActive: true },
    ],
  });

  // 6. Seed Qualifications (15 qualifications from the provided data)
  console.log('Seeding Qualifications...');
  await prisma.qualification.createMany({
    data: [
      { name: 'High School Diploma', level: 'Secondary', description: 'Completion of secondary education (12th grade or equivalent)', isActive: true },
      { name: 'Undergraduate Degree', level: 'Bachelor', description: "Bachelor's degree in any field (typically 3-4 year program)", isActive: true },
      { name: 'Bachelor of Technology (B.Tech)', level: 'Bachelor', description: '4-year undergraduate degree in engineering/technology', isActive: true },
      { name: 'Bachelor of Computer Applications (BCA)', level: 'Bachelor', description: '3-year undergraduate degree in computer applications', isActive: true },
      { name: 'Graduate Degree', level: 'Master', description: "Master's degree in any field (typically 2 year program)", isActive: true },
      { name: 'Master of Technology (M.Tech)', level: 'Master', description: 'Postgraduate degree in engineering/technology specialization', isActive: true },
      { name: 'Master of Computer Applications (MCA)', level: 'Master', description: 'Postgraduate degree in computer applications', isActive: true },
      { name: 'Post Graduate Diploma', level: 'Postgraduate', description: "1-2 year specialized diploma after bachelor's degree", isActive: true },
      { name: 'Doctorate (PhD)', level: 'Doctorate', description: 'Highest academic degree involving original research', isActive: true },
      { name: 'Diploma in Engineering', level: 'Diploma', description: '3-year technical diploma after 10th grade', isActive: true },
      { name: 'IT Certification Program', level: 'Certificate', description: 'Industry-recognized IT certification (e.g., Microsoft, Cisco)', isActive: true },
      { name: 'Vocational Training Certificate', level: 'Certificate', description: 'Job-specific skills training program', isActive: true },
      { name: 'Associate Degree', level: 'Associate', description: '2-year undergraduate degree (common in some countries)', isActive: true },
      { name: 'Integrated Dual Degree', level: 'Bachelor+Master', description: "5-year combined bachelor's and master's program", isActive: true },
      { name: 'Post Doctoral Research', level: 'Post-Doctorate', description: 'Advanced research following PhD completion', isActive: true },
    ],
  });

  // 7. Seed Roles
  console.log('Seeding Roles...');
  await prisma.role.createMany({
    data: [
      { name: 'Admin', description: 'Full Privilege', isActive: true },
      { name: 'Hiring Manager', description: 'Responsible for initiating and overseeing hiring processes', isActive: true },
      { name: 'DU Head', description: 'Delivery Unit Head with overall responsibility for the DU', isActive: true },
      { name: 'CDO', description: 'Chief Delivery Officer with organization-wide delivery oversight', isActive: true },
      { name: 'COO', description: 'Chief Operating Officer with executive leadership responsibilities', isActive: true },
      { name: 'Recruiter Lead', description: 'Leads the recruitment team and processes', isActive: true },
      { name: 'Recruiter POC', description: 'Recruiter Point of Contact for specific hiring needs', isActive: true },
      { name: 'Interview Panel Member', description: 'Participates in candidate interviews and evaluations', isActive: true },
      { name: 'Candidate', description: 'Individual applying for a position', isActive: true },
      { name: 'Vendor', description: 'Representative from vendor or partner organizations', isActive: true },
      { name: 'Employee', description: 'Regular employee within the organization', isActive: true },
    ],
  });

  // 8. Seed Skills (73 skills from the provided data)
  console.log('Seeding Skills...');
  await prisma.skill.createMany({
    data: [
      { name: 'C#', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Java', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Python', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'JavaScript', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'TypeScript', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Go', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Ruby', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'PHP', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Swift', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: 'Kotlin', category: 'Programming Language', isTechnical: true, isActive: true },
      { name: '.NET', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Node.js', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Spring', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Django', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Flask', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'React', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Angular', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Vue.js', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Express', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'Laravel', category: 'Framework', isTechnical: true, isActive: true },
      { name: 'MS SQL', category: 'Database', isTechnical: true, isActive: true },
      { name: 'MySQL', category: 'Database', isTechnical: true, isActive: true },
      { name: 'PostgreSQL', category: 'Database', isTechnical: true, isActive: true },
      { name: 'MongoDB', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Redis', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Oracle', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Cassandra', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Elasticsearch', category: 'Database', isTechnical: true, isActive: true },
      { name: 'DynamoDB', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Firebase', category: 'Database', isTechnical: true, isActive: true },
      { name: 'Docker', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'Kubernetes', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'AWS', category: 'Cloud', isTechnical: true, isActive: true },
      { name: 'Azure', category: 'Cloud', isTechnical: true, isActive: true },
      { name: 'GCP', category: 'Cloud', isTechnical: true, isActive: true },
      { name: 'Terraform', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'Ansible', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'Jenkins', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'GitLab CI/CD', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'GitHub Actions', category: 'DevOps', isTechnical: true, isActive: true },
      { name: 'Selenium', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Jest', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Mocha', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Cypress', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'JUnit', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'TestNG', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Postman', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'JMeter', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Cucumber', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Playwright', category: 'Testing', isTechnical: true, isActive: true },
      { name: 'Tableau', category: 'Data Visualization', isTechnical: true, isActive: true },
      { name: 'Power BI', category: 'Data Visualization', isTechnical: true, isActive: true },
      { name: 'Pandas', category: 'Data Analysis', isTechnical: true, isActive: true },
      { name: 'NumPy', category: 'Data Analysis', isTechnical: true, isActive: true },
      { name: 'Spark', category: 'Big Data', isTechnical: true, isActive: true },
      { name: 'Hadoop', category: 'Big Data', isTechnical: true, isActive: true },
      { name: 'TensorFlow', category: 'Machine Learning', isTechnical: true, isActive: true },
      { name: 'PyTorch', category: 'Machine Learning', isTechnical: true, isActive: true },
      { name: 'Scikit-learn', category: 'Machine Learning', isTechnical: true, isActive: true },
      { name: 'R', category: 'Data Analysis', isTechnical: true, isActive: true },
      { name: 'React Native', category: 'Mobile Development', isTechnical: true, isActive: true },
      { name: 'Flutter', category: 'Mobile Development', isTechnical: true, isActive: true },
      { name: 'Android SDK', category: 'Mobile Development', isTechnical: true, isActive: true },
      { name: 'iOS SDK', category: 'Mobile Development', isTechnical: true, isActive: true },
      { name: 'Xamarin', category: 'Mobile Development', isTechnical: true, isActive: true },
      { name: 'GraphQL', category: 'API', isTechnical: true, isActive: true },
      { name: 'REST API', category: 'API', isTechnical: true, isActive: true },
      { name: 'SOAP', category: 'API', isTechnical: true, isActive: true },
      { name: 'Kafka', category: 'Messaging', isTechnical: true, isActive: true },
      { name: 'RabbitMQ', category: 'Messaging', isTechnical: true, isActive: true },
      { name: 'Nginx', category: 'Web Server', isTechnical: true, isActive: true },
      { name: 'Apache', category: 'Web Server', isTechnical: true, isActive: true },
      { name: 'Linux', category: 'Operating System', isTechnical: true, isActive: true },
      { name: 'Windows Server', category: 'Operating System', isTechnical: true, isActive: true },
      { name: 'Bash', category: 'Scripting', isTechnical: true, isActive: true },
      { name: 'PowerShell', category: 'Scripting', isTechnical: true, isActive: true },
    ],
  });

  // Get India country ID for office locations
  const india = await prisma.country.findFirst({ where: { name: 'India' } });

  // 9. Seed Office Locations (4 locations including Remote)
  console.log('Seeding Office Locations...');
  if (india) {
    await prisma.officeLocation.createMany({
      data: [
        { name: 'Cochin', address: 'Infopark, Kochi, Kerala, India', countryId: india.id, isActive: true },
        { name: 'Trivandrum', address: 'Technopark, Thiruvananthapuram, Kerala, India', countryId: india.id, isActive: true },
        { name: 'Bangalore', address: 'Manyata Tech Park, Bangalore, Karnataka, India', countryId: india.id, isActive: true },
        { name: 'Remote', address: 'Work from Home/Remote Location', countryId: india.id, isActive: true },
      ],
    });
  }

  // Get role and department IDs for users
  const hiringManagerRole = await prisma.role.findFirst({ where: { name: 'Hiring Manager' } });
  const adminRole = await prisma.role.findFirst({ where: { name: 'Admin' } });
  const recruiterLeadRole = await prisma.role.findFirst({ where: { name: 'Recruiter Lead' } });
  const employeeRole = await prisma.role.findFirst({ where: { name: 'Employee' } });
  
  const dtsDept = await prisma.department.findFirst({ where: { code: 'DTS' } });
  const daiDept = await prisma.department.findFirst({ where: { code: 'DAI' } });
  const tacDept = await prisma.department.findFirst({ where: { code: 'TAC' } });
  const insDept = await prisma.department.findFirst({ where: { code: 'INS' } });
  const edsDept = await prisma.department.findFirst({ where: { code: 'EDS' } });
  const fssDept = await prisma.department.findFirst({ where: { code: 'FSS' } });

  // 10. Seed Users (9 users from the provided data)
  console.log('Seeding Users...');
  if (hiringManagerRole && adminRole && recruiterLeadRole && employeeRole && 
      dtsDept && daiDept && tacDept && insDept && edsDept && fssDept) {
    await prisma.user.createMany({
      data: [
        { email: 'david.brown@company.com', name: 'David Brown', role: 'Hiring Manager', roleId: hiringManagerRole.id, departmentId: dtsDept.id, isActive: true },
        { email: 'catherine.lee@company.com', name: 'Catherine Lee', role: 'Hiring Manager', roleId: hiringManagerRole.id, departmentId: daiDept.id, isActive: true },
        { email: 'michael.wilson@company.com', name: 'Michael Wilson', role: 'Hiring Manager', roleId: hiringManagerRole.id, departmentId: tacDept.id, isActive: true },
        { email: 'admin.user@company.com', name: 'Admin User', role: 'Admin', roleId: adminRole.id, departmentId: insDept.id, isActive: true },
        { email: 'sarah.johnson@company.com', name: 'Sarah Johnson', role: 'Recruiter Lead', roleId: recruiterLeadRole.id, departmentId: tacDept.id, isActive: true },
        { email: 'robert.garcia@company.com', name: 'Robert Garcia', role: 'Recruiter Lead', roleId: recruiterLeadRole.id, departmentId: tacDept.id, isActive: true },
        { email: 'emily.chen@company.com', name: 'Emily Chen', role: 'Employee', roleId: employeeRole.id, departmentId: dtsDept.id, isActive: true },
        { email: 'james.smith@company.com', name: 'James Smith', role: 'Employee', roleId: employeeRole.id, departmentId: edsDept.id, isActive: true },
        { email: 'inactive.user@company.com', name: 'Inactive User', role: 'Employee', roleId: employeeRole.id, departmentId: fssDept.id, isActive: false },
      ],
    });
  }

  // 11. Seed Visa Statuses (15 statuses from the provided data)
  console.log('Seeding Visa Statuses...');
  await prisma.visaStatus.createMany({
    data: [
      { status: 'US Citizen', description: 'United States citizen with unrestricted work authorization', isWorkPermit: true },
      { status: 'Green Card Holder', description: 'Permanent resident of the United States', isWorkPermit: true },
      { status: 'H1B Visa', description: 'Specialty occupation worker visa (USA)', isWorkPermit: true },
      { status: 'L1 Visa', description: 'Intracompany transferee visa (USA)', isWorkPermit: true },
      { status: 'TN Visa', description: 'NAFTA professional visa (USA-Canada-Mexico)', isWorkPermit: true },
      { status: 'F1 OPT/CPT', description: 'Student visa with work authorization (USA)', isWorkPermit: true },
      { status: 'Canadian Citizen/PR', description: 'Canadian citizen or permanent resident', isWorkPermit: true },
      { status: 'UK Work Visa', description: 'United Kingdom work authorization', isWorkPermit: true },
      { status: 'EU Blue Card', description: 'European Union work permit for highly skilled workers', isWorkPermit: true },
      { status: 'Australian Work Visa', description: 'Australia work authorization', isWorkPermit: true },
      { status: 'Indian Citizen', description: 'Citizen of India with local work rights', isWorkPermit: true },
      { status: 'Dependent Visa', description: 'Work authorization dependent on primary visa holder', isWorkPermit: true },
      { status: 'B1/B2 Visa', description: 'Visitor visa with no work authorization (USA)', isWorkPermit: false },
      { status: 'J1 Visa', description: 'Exchange visitor visa (USA)', isWorkPermit: false },
      { status: 'No Work Authorization', description: 'Requires visa sponsorship for employment', isWorkPermit: false },
    ],
  });

  // 12. Seed Work Shifts (6 shifts from the provided data)
  console.log('Seeding Work Shifts...');
  await prisma.workShift.createMany({
    data: [
      { name: 'Standard Day Shift', startTime: '09:00:00', endTime: '18:00:00', description: 'Regular 9am-6pm shift with 1 hour lunch break' },
      { name: 'UK Shift', startTime: '12:00:00', endTime: '21:00:00', description: 'Shift aligned with UK business hours (GMT/BST)' },
      { name: 'US East Coast Shift', startTime: '14:00:00', endTime: '23:00:00', description: 'Shift aligned with US Eastern Time (ET)' },
      { name: 'US West Coast Shift', startTime: '17:00:00', endTime: '02:00:00', description: 'Shift aligned with US Pacific Time (PT)' },
      { name: 'Australia Shift', startTime: '04:00:00', endTime: '13:00:00', description: 'Shift aligned with Australian Eastern Time (AET)' },
      { name: 'Other', startTime: '', endTime: '', description: '' },
    ],
  });

  // 13. Seed Work Time Zones (7 time zones from the provided data)
  console.log('Seeding Work Time Zones...');
  await prisma.workTimeZone.createMany({
    data: [
      { name: 'IST', description: 'Indian Standard Time', timezoneValue: 'Asia/Kolkata', isActive: true },
      { name: 'EST', description: 'Eastern Standard Time', timezoneValue: 'America/New_York', isActive: true },
      { name: 'PST', description: 'Pacific Standard Time', timezoneValue: 'America/Los_Angeles', isActive: true },
      { name: 'GMT', description: 'Greenwich Mean Time', timezoneValue: 'Europe/London', isActive: true },
      { name: 'CET', description: 'Central European Time', timezoneValue: 'Europe/Paris', isActive: true },
      { name: 'JST', description: 'Japan Standard Time', timezoneValue: 'Asia/Tokyo', isActive: true },
      { name: 'AEST', description: 'Australian Eastern Standard Time', timezoneValue: 'Australia/Sydney', isActive: true },
    ],
  });

  console.log('✅ Exact seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
