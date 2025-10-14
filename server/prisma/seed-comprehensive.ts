import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting comprehensive database seeding...');

  // 1. Seed JobTypes
  console.log('Seeding JobTypes...');
  const jobTypes = await prisma.jobType.createMany({
    data: [
      { name: 'Permanent', description: 'Permanent employment type', isActive: true },
      { name: 'Consultant', description: 'Consultant job type', isActive: true },
      { name: 'Contract', description: 'Contract-based employment', isActive: true },
    ],
    skipDuplicates: true,
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
    skipDuplicates: true,
  });

  // 3. Seed Countries (194 countries)
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
      { name: 'North Korea', code: 'KP', phoneCode: '+850', isActive: true },
      { name: 'North Macedonia', code: 'MK', phoneCode: '+389', isActive: true },
      { name: 'Norway', code: 'NO', phoneCode: '+47', isActive: true },
      { name: 'Oman', code: 'OM', phoneCode: '+968', isActive: true },
      { name: 'Pakistan', code: 'PK', phoneCode: '+92', isActive: true },
      { name: 'Palau', code: 'PW', phoneCode: '+680', isActive: true },
      { name: 'Palestine', code: 'PS', phoneCode: '+970', isActive: true },
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
      { name: 'South Korea', code: 'KR', phoneCode: '+82', isActive: true },
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
      { name: 'Vatican City', code: 'VA', phoneCode: '+39', isActive: true },
      { name: 'Venezuela', code: 'VE', phoneCode: '+58', isActive: true },
      { name: 'Vietnam', code: 'VN', phoneCode: '+84', isActive: true },
      { name: 'Yemen', code: 'YE', phoneCode: '+967', isActive: true },
      { name: 'Zambia', code: 'ZM', phoneCode: '+260', isActive: true },
      { name: 'Zimbabwe', code: 'ZW', phoneCode: '+263', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 4. Seed Qualifications
  console.log('Seeding Qualifications...');
  await prisma.qualification.createMany({
    data: [
      { name: 'High School Diploma', level: 'High School', isActive: true },
      { name: 'Associate Degree', level: 'Associate', isActive: true },
      { name: 'Bachelor of Technology (B.Tech)', level: 'Bachelor', isActive: true },
      { name: 'Bachelor of Engineering (B.E)', level: 'Bachelor', isActive: true },
      { name: 'Bachelor of Science (B.Sc)', level: 'Bachelor', isActive: true },
      { name: 'Bachelor of Commerce (B.Com)', level: 'Bachelor', isActive: true },
      { name: 'Master of Technology (M.Tech)', level: 'Master', isActive: true },
      { name: 'Master of Engineering (M.E)', level: 'Master', isActive: true },
      { name: 'Master of Science (M.Sc)', level: 'Master', isActive: true },
      { name: 'Master of Business Administration (MBA)', level: 'Master', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 5. Seed Roles
  console.log('Seeding Roles...');
  const roles = await prisma.role.createMany({
    data: [
      { name: 'Admin', description: 'System Administrator', isActive: true },
      { name: 'Hiring Manager', description: 'Department Hiring Manager', isActive: true },
      { name: 'Recruiter', description: 'Talent Acquisition Recruiter', isActive: true },
      { name: 'Recruiter Lead', description: 'Lead Recruiter', isActive: true },
      { name: 'DU Head', description: 'Delivery Unit Head', isActive: true },
      { name: 'CDO', description: 'Chief Delivery Officer', isActive: true },
      { name: 'Employee', description: 'Regular Employee', isActive: true },
      { name: 'HR Manager', description: 'Human Resources Manager', isActive: true },
      { name: 'Finance Manager', description: 'Finance Manager', isActive: true },
      { name: 'Department Head', description: 'Department Head', isActive: true },
      { name: 'Interviewer', description: 'Technical Interviewer', isActive: true },
    ],
    skipDuplicates: true,
  });

  // Get role IDs for later use
  const hiringManagerRole = await prisma.role.findFirst({ where: { name: 'Hiring Manager' } });
  const recruiterRole = await prisma.role.findFirst({ where: { name: 'Recruiter' } });
  const recruiterLeadRole = await prisma.role.findFirst({ where: { name: 'Recruiter Lead' } });
  const adminRole = await prisma.role.findFirst({ where: { name: 'Admin' } });

  // 6. Seed Skills
  console.log('Seeding Skills...');
  await prisma.skill.createMany({
    data: [
      // Programming Languages
      { name: 'JavaScript', category: 'Programming Languages', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'TypeScript', category: 'Programming Languages', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Python', category: 'Programming Languages', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Java', category: 'Programming Languages', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'C#', category: 'Programming Languages', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'C++', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Go', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Ruby', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'PHP', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Swift', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Kotlin', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Scala', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Rust', category: 'Programming Languages', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Frontend Frameworks
      { name: 'React', category: 'Frontend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Angular', category: 'Frontend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Vue.js', category: 'Frontend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Next.js', category: 'Frontend Frameworks', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Svelte', category: 'Frontend Frameworks', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Backend Frameworks
      { name: 'Node.js', category: 'Backend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Express.js', category: 'Backend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Django', category: 'Backend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Flask', category: 'Backend Frameworks', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Spring Boot', category: 'Backend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'ASP.NET Core', category: 'Backend Frameworks', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Ruby on Rails', category: 'Backend Frameworks', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Laravel', category: 'Backend Frameworks', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Databases
      { name: 'MySQL', category: 'Databases', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'PostgreSQL', category: 'Databases', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'MongoDB', category: 'Databases', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Oracle Database', category: 'Databases', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'SQL Server', category: 'Databases', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Redis', category: 'Databases', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Elasticsearch', category: 'Databases', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'DynamoDB', category: 'Databases', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Cloud Platforms
      { name: 'AWS', category: 'Cloud Platforms', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Azure', category: 'Cloud Platforms', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Google Cloud Platform', category: 'Cloud Platforms', isTechnical: true, importance: 'primary', isActive: true },
      
      // DevOps & Tools
      { name: 'Docker', category: 'DevOps & Tools', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Kubernetes', category: 'DevOps & Tools', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Jenkins', category: 'DevOps & Tools', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Git', category: 'DevOps & Tools', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'CI/CD', category: 'DevOps & Tools', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Terraform', category: 'DevOps & Tools', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Ansible', category: 'DevOps & Tools', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Mobile Development
      { name: 'React Native', category: 'Mobile Development', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Flutter', category: 'Mobile Development', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'iOS Development', category: 'Mobile Development', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Android Development', category: 'Mobile Development', isTechnical: true, importance: 'primary', isActive: true },
      
      // Data & AI
      { name: 'Machine Learning', category: 'Data & AI', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Deep Learning', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Natural Language Processing', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Data Analysis', category: 'Data & AI', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Big Data', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Apache Spark', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'TensorFlow', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'PyTorch', category: 'Data & AI', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Testing
      { name: 'Unit Testing', category: 'Testing', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Integration Testing', category: 'Testing', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Test Automation', category: 'Testing', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Selenium', category: 'Testing', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Jest', category: 'Testing', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Cypress', category: 'Testing', isTechnical: true, importance: 'secondary', isActive: true },
      
      // Soft Skills
      { name: 'Communication', category: 'Soft Skills', isTechnical: false, importance: 'primary', isActive: true },
      { name: 'Problem Solving', category: 'Soft Skills', isTechnical: false, importance: 'primary', isActive: true },
      { name: 'Teamwork', category: 'Soft Skills', isTechnical: false, importance: 'primary', isActive: true },
      { name: 'Leadership', category: 'Soft Skills', isTechnical: false, importance: 'primary', isActive: true },
      { name: 'Agile Methodologies', category: 'Soft Skills', isTechnical: false, importance: 'primary', isActive: true },
      { name: 'Scrum', category: 'Soft Skills', isTechnical: false, importance: 'secondary', isActive: true },
      { name: 'Project Management', category: 'Soft Skills', isTechnical: false, importance: 'secondary', isActive: true },
      
      // Security
      { name: 'Cybersecurity', category: 'Security', isTechnical: true, importance: 'primary', isActive: true },
      { name: 'Penetration Testing', category: 'Security', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'Security Architecture', category: 'Security', isTechnical: true, importance: 'secondary', isActive: true },
      { name: 'OAuth/OIDC', category: 'Security', isTechnical: true, importance: 'secondary', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 7. Seed Departments (without foreign keys initially)
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
    skipDuplicates: true,
  });

  // Get department IDs
  const dtsDept = await prisma.department.findFirst({ where: { code: 'DTS' } });
  const daiDept = await prisma.department.findFirst({ where: { code: 'DAI' } });
  const tacDept = await prisma.department.findFirst({ where: { code: 'TAC' } });
  const insDept = await prisma.department.findFirst({ where: { code: 'INS' } });

  // 8. Seed Users
  console.log('Seeding Users...');
  if (hiringManagerRole && recruiterLeadRole && adminRole && dtsDept && daiDept && tacDept && insDept) {
    await prisma.user.createMany({
      data: [
        {
          email: 'david.brown@company.com',
          name: 'David Brown',
          role: 'Hiring Manager',
          roleId: hiringManagerRole.id,
          departmentId: dtsDept.id,
          isActive: true,
        },
        {
          email: 'catherine.lee@company.com',
          name: 'Catherine Lee',
          role: 'Hiring Manager',
          roleId: hiringManagerRole.id,
          departmentId: daiDept.id,
          isActive: true,
        },
        {
          email: 'michael.wilson@company.com',
          name: 'Michael Wilson',
          role: 'Hiring Manager',
          roleId: hiringManagerRole.id,
          departmentId: tacDept.id,
          isActive: true,
        },
        {
          email: 'admin.user@company.com',
          name: 'Admin User',
          role: 'Admin',
          roleId: adminRole.id,
          departmentId: insDept.id,
          isActive: true,
        },
        {
          email: 'sarah.johnson@company.com',
          name: 'Sarah Johnson',
          role: 'Recruiter Lead',
          roleId: recruiterLeadRole.id,
          departmentId: tacDept.id,
          isActive: true,
        },
        {
          email: 'robert.garcia@company.com',
          name: 'Robert Garcia',
          role: 'Recruiter Lead',
          roleId: recruiterLeadRole.id,
          departmentId: tacDept.id,
          isActive: true,
        },
      ],
      skipDuplicates: true,
    });
  }

  // 9. Seed Job Titles
  console.log('Seeding Job Titles...');
  await prisma.jobTitle.createMany({
    data: [
      { title: 'Associate Software Engineer', description: 'Associate Software Engineer', isActive: true },
      { title: 'Software Engineer', description: 'Software Engineer', isActive: true },
      { title: 'Senior Software Engineer', description: 'Senior Software Engineer', isActive: true },
      { title: 'Lead Software Engineer', description: 'Lead Software Engineer', isActive: true },
      { title: 'Architect', description: 'Software Architect', isActive: true },
      { title: 'Principal Engineer', description: 'Principal Engineer', isActive: true },
      { title: 'Frontend Developer', description: 'Frontend Developer', isActive: true },
      { title: 'Backend Developer', description: 'Backend Developer', isActive: true },
      { title: 'Full Stack Developer', description: 'Full Stack Developer', isActive: true },
      { title: 'DevOps Engineer', description: 'DevOps Engineer', isActive: true },
      { title: 'QA Engineer', description: 'Quality Assurance Engineer', isActive: true },
      { title: 'Data Scientist', description: 'Data Scientist', isActive: true },
      { title: 'Machine Learning Engineer', description: 'Machine Learning Engineer', isActive: true },
      { title: 'Product Manager', description: 'Product Manager', isActive: true },
      { title: 'UI/UX Designer', description: 'UI/UX Designer', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 10. Seed Office Locations
  console.log('Seeding Office Locations...');
  const india = await prisma.country.findFirst({ where: { code: 'IN' } });
  
  if (india) {
    await prisma.officeLocation.createMany({
      data: [
        { name: 'Trivandrum', address: 'Technopark, Thiruvananthapuram, Kerala, India', countryId: india.id, isActive: true },
        { name: 'Bangalore', address: 'Manyata Tech Park, Bangalore, Karnataka, India', countryId: india.id, isActive: true },
        { name: 'Remote', address: 'Work from Home/Remote Location', countryId: india.id, isActive: true },
      ],
      skipDuplicates: true,
    });
  }

  // 11. Seed Work Shifts
  console.log('Seeding Work Shifts...');
  await prisma.workShift.createMany({
    data: [
      { name: 'General Shift (09:00 AM - 06:00 PM)', startTime: '09:00', endTime: '18:00', isActive: true },
      { name: 'US Shift (06:00 PM - 03:00 AM)', startTime: '18:00', endTime: '03:00', isActive: true },
      { name: 'UK Shift (01:30 PM - 10:30 PM)', startTime: '13:30', endTime: '22:30', isActive: true },
      { name: 'Flexible', startTime: '00:00', endTime: '00:00', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 12. Seed Work Time Zones
  console.log('Seeding Work Time Zones...');
  await prisma.workTimeZone.createMany({
    data: [
      { name: 'IST', description: 'Indian Standard Time', timezoneValue: 'Asia/Kolkata', isActive: true },
      { name: 'EST', description: 'Eastern Standard Time', timezoneValue: 'America/New_York', isActive: true },
      { name: 'PST', description: 'Pacific Standard Time', timezoneValue: 'America/Los_Angeles', isActive: true },
      { name: 'GMT', description: 'Greenwich Mean Time', timezoneValue: 'Europe/London', isActive: true },
      { name: 'CET', description: 'Central European Time', timezoneValue: 'Europe/Paris', isActive: true },
    ],
    skipDuplicates: true,
  });

  // 13. Seed Visa Statuses
  console.log('Seeding Visa Statuses...');
  await prisma.visaStatus.createMany({
    data: [
      { status: 'US Citizen', isActive: true },
      { status: 'Green Card Holder', isWorkPermit: true, isActive: true },
      { status: 'H1B', isWorkPermit: true, isActive: true },
      { status: 'L1', isWorkPermit: true, isActive: true },
      { status: 'F1 (OPT)', isWorkPermit: true, isActive: true },
      { status: 'F1 (CPT)', isWorkPermit: true, isActive: true },
      { status: 'EAD', isWorkPermit: true, isActive: true },
      { status: 'TN Visa', isWorkPermit: true, isActive: true },
      { status: 'O1 Visa', isWorkPermit: true, isActive: true },
      { status: 'Canadian Citizen', isActive: true },
      { status: 'UK Citizen', isActive: true },
      { status: 'EU Citizen', isActive: true },
      { status: 'Requires Sponsorship', isActive: true },
      { status: 'No Work Authorization', isActive: true },
      { status: 'Other', isActive: true },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Comprehensive seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
