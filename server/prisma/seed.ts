import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed JobTypes
  console.log('Seeding JobTypes...');
  const jobTypes = [
    { name: 'Permanent', description: 'Permanent employment type' },
    { name: 'Consultant', description: 'Consultant job type' },
    { name: 'Contract', description: 'Contract-based employment' },
  ];
  
  for (const jobType of jobTypes) {
    await prisma.jobType.upsert({
      where: { name: jobType.name },
      update: {},
      create: jobType,
    });
  }

  // Seed Certifications
  console.log('Seeding Certifications...');
  const certifications = [
    { name: 'CISSP', issuingOrganization: '(ISC)²', description: 'Certified Information Systems Security Professional - Advanced cybersecurity certification' },
    { name: 'CCNP', issuingOrganization: 'Cisco', description: 'Cisco Certified Network Professional - Advanced networking certification' },
    { name: 'AWS Certified Solutions Architect - Professional', issuingOrganization: 'Amazon Web Services', description: 'Expert-level AWS cloud architecture certification' },
    { name: 'PMP', issuingOrganization: 'PMI', description: 'Project Management Professional - Global standard for project managers' },
    { name: 'ISTQB Advanced', issuingOrganization: 'ISTQB', description: 'International Software Testing Qualifications Board - Advanced software testing certification' },
    { name: 'Microsoft Certified: Azure Solutions Architect Expert', issuingOrganization: 'Microsoft', description: 'Expert-level Microsoft Azure cloud solutions certification' },
    { name: 'Google Professional Cloud Architect', issuingOrganization: 'Google', description: 'Google Cloud Platform architecture certification' },
    { name: 'CEH', issuingOrganization: 'EC-Council', description: 'Certified Ethical Hacker - Cybersecurity penetration testing certification' },
    { name: 'ITIL 4 Managing Professional', issuingOrganization: 'AXELOS', description: 'IT service management best practices certification' },
    { name: 'CompTIA Security+', issuingOrganization: 'CompTIA', description: 'Foundational cybersecurity certification' },
    { name: 'Red Hat Certified Engineer (RHCE)', issuingOrganization: 'Red Hat', description: 'Enterprise Linux system administration certification' },
    { name: 'Certified Kubernetes Administrator (CKA)', issuingOrganization: 'Cloud Native Computing Foundation', description: 'Kubernetes cluster administration certification' },
    { name: 'Oracle Certified Professional: Java SE Developer', issuingOrganization: 'Oracle', description: 'Advanced Java programming certification' },
    { name: 'SAP Certified Application Associate', issuingOrganization: 'SAP', description: 'SAP product implementation certification' },
    { name: 'ServiceNow Certified System Administrator', issuingOrganization: 'ServiceNow', description: 'ServiceNow platform administration certification' },
  ];

  for (const cert of certifications) {
    await prisma.certification.upsert({
      where: { name: cert.name },
      update: {},
      create: cert,
    });
  }

  // Seed Countries
  console.log('Seeding Countries...');
  const countries = [
    { name: 'Afghanistan', code: 'AF', phoneCode: '+93' },
    { name: 'Albania', code: 'AL', phoneCode: '+355' },
    { name: 'Algeria', code: 'DZ', phoneCode: '+213' },
    { name: 'Andorra', code: 'AD', phoneCode: '+376' },
    { name: 'Angola', code: 'AO', phoneCode: '+244' },
    { name: 'Antigua and Barbuda', code: 'AG', phoneCode: '+1268' },
    { name: 'Argentina', code: 'AR', phoneCode: '+54' },
    { name: 'Armenia', code: 'AM', phoneCode: '+374' },
    { name: 'Australia', code: 'AU', phoneCode: '+61' },
    { name: 'Austria', code: 'AT', phoneCode: '+43' },
    { name: 'Azerbaijan', code: 'AZ', phoneCode: '+994' },
    { name: 'Bahamas', code: 'BS', phoneCode: '+1242' },
    { name: 'Bahrain', code: 'BH', phoneCode: '+973' },
    { name: 'Bangladesh', code: 'BD', phoneCode: '+880' },
    { name: 'Barbados', code: 'BB', phoneCode: '+1246' },
    { name: 'Belarus', code: 'BY', phoneCode: '+375' },
    { name: 'Belgium', code: 'BE', phoneCode: '+32' },
    { name: 'Belize', code: 'BZ', phoneCode: '+501' },
    { name: 'Benin', code: 'BJ', phoneCode: '+229' },
    { name: 'Bhutan', code: 'BT', phoneCode: '+975' },
    { name: 'Bolivia', code: 'BO', phoneCode: '+591' },
    { name: 'Bosnia and Herzegovina', code: 'BA', phoneCode: '+387' },
    { name: 'Botswana', code: 'BW', phoneCode: '+267' },
    { name: 'Brazil', code: 'BR', phoneCode: '+55' },
    { name: 'Brunei Darussalam', code: 'BN', phoneCode: '+673' },
    { name: 'Bulgaria', code: 'BG', phoneCode: '+359' },
    { name: 'Burkina Faso', code: 'BF', phoneCode: '+226' },
    { name: 'Burundi', code: 'BI', phoneCode: '+257' },
    { name: 'Cabo Verde', code: 'CV', phoneCode: '+238' },
    { name: 'Cambodia', code: 'KH', phoneCode: '+855' },
    { name: 'Cameroon', code: 'CM', phoneCode: '+237' },
    { name: 'Canada', code: 'CA', phoneCode: '+1' },
    { name: 'Central African Republic', code: 'CF', phoneCode: '+236' },
    { name: 'Chad', code: 'TD', phoneCode: '+235' },
    { name: 'Chile', code: 'CL', phoneCode: '+56' },
    { name: 'China', code: 'CN', phoneCode: '+86' },
    { name: 'Colombia', code: 'CO', phoneCode: '+57' },
    { name: 'Comoros', code: 'KM', phoneCode: '+269' },
    { name: 'Congo', code: 'CG', phoneCode: '+242' },
    { name: 'Costa Rica', code: 'CR', phoneCode: '+506' },
    { name: 'Croatia', code: 'HR', phoneCode: '+385' },
    { name: 'Cuba', code: 'CU', phoneCode: '+53' },
    { name: 'Cyprus', code: 'CY', phoneCode: '+357' },
    { name: 'Czech Republic', code: 'CZ', phoneCode: '+420' },
    { name: 'Denmark', code: 'DK', phoneCode: '+45' },
    { name: 'Djibouti', code: 'DJ', phoneCode: '+253' },
    { name: 'Dominica', code: 'DM', phoneCode: '+1767' },
    { name: 'Dominican Republic', code: 'DO', phoneCode: '+1809' },
    { name: 'Ecuador', code: 'EC', phoneCode: '+593' },
    { name: 'Egypt', code: 'EG', phoneCode: '+20' },
    { name: 'El Salvador', code: 'SV', phoneCode: '+503' },
    { name: 'Equatorial Guinea', code: 'GQ', phoneCode: '+240' },
    { name: 'Eritrea', code: 'ER', phoneCode: '+291' },
    { name: 'Estonia', code: 'EE', phoneCode: '+372' },
    { name: 'Eswatini', code: 'SZ', phoneCode: '+268' },
    { name: 'Ethiopia', code: 'ET', phoneCode: '+251' },
    { name: 'Fiji', code: 'FJ', phoneCode: '+679' },
    { name: 'Finland', code: 'FI', phoneCode: '+358' },
    { name: 'France', code: 'FR', phoneCode: '+33' },
    { name: 'Gabon', code: 'GA', phoneCode: '+241' },
    { name: 'Gambia', code: 'GM', phoneCode: '+220' },
    { name: 'Georgia', code: 'GE', phoneCode: '+995' },
    { name: 'Germany', code: 'DE', phoneCode: '+49' },
    { name: 'Ghana', code: 'GH', phoneCode: '+233' },
    { name: 'Greece', code: 'GR', phoneCode: '+30' },
    { name: 'Grenada', code: 'GD', phoneCode: '+1473' },
    { name: 'Guatemala', code: 'GT', phoneCode: '+502' },
    { name: 'Guinea', code: 'GN', phoneCode: '+224' },
    { name: 'Guinea-Bissau', code: 'GW', phoneCode: '+245' },
    { name: 'Guyana', code: 'GY', phoneCode: '+592' },
    { name: 'Haiti', code: 'HT', phoneCode: '+509' },
    { name: 'Honduras', code: 'HN', phoneCode: '+504' },
    { name: 'Hungary', code: 'HU', phoneCode: '+36' },
    { name: 'Iceland', code: 'IS', phoneCode: '+354' },
    { name: 'India', code: 'IN', phoneCode: '+91' },
    { name: 'Indonesia', code: 'ID', phoneCode: '+62' },
    { name: 'Iran', code: 'IR', phoneCode: '+98' },
    { name: 'Iraq', code: 'IQ', phoneCode: '+964' },
    { name: 'Ireland', code: 'IE', phoneCode: '+353' },
    { name: 'Israel', code: 'IL', phoneCode: '+972' },
    { name: 'Italy', code: 'IT', phoneCode: '+39' },
    { name: 'Jamaica', code: 'JM', phoneCode: '+1876' },
    { name: 'Japan', code: 'JP', phoneCode: '+81' },
    { name: 'Jordan', code: 'JO', phoneCode: '+962' },
    { name: 'Kazakhstan', code: 'KZ', phoneCode: '+7' },
    { name: 'Kenya', code: 'KE', phoneCode: '+254' },
    { name: 'Kiribati', code: 'KI', phoneCode: '+686' },
    { name: 'Korea (North)', code: 'KP', phoneCode: '+850' },
    { name: 'Korea (South)', code: 'KR', phoneCode: '+82' },
    { name: 'Kuwait', code: 'KW', phoneCode: '+965' },
    { name: 'Kyrgyzstan', code: 'KG', phoneCode: '+996' },
    { name: 'Laos', code: 'LA', phoneCode: '+856' },
    { name: 'Latvia', code: 'LV', phoneCode: '+371' },
    { name: 'Lebanon', code: 'LB', phoneCode: '+961' },
    { name: 'Lesotho', code: 'LS', phoneCode: '+266' },
    { name: 'Liberia', code: 'LR', phoneCode: '+231' },
    { name: 'Libya', code: 'LY', phoneCode: '+218' },
    { name: 'Liechtenstein', code: 'LI', phoneCode: '+423' },
    { name: 'Lithuania', code: 'LT', phoneCode: '+370' },
    { name: 'Luxembourg', code: 'LU', phoneCode: '+352' },
    { name: 'Madagascar', code: 'MG', phoneCode: '+261' },
    { name: 'Malawi', code: 'MW', phoneCode: '+265' },
    { name: 'Malaysia', code: 'MY', phoneCode: '+60' },
    { name: 'Maldives', code: 'MV', phoneCode: '+960' },
    { name: 'Mali', code: 'ML', phoneCode: '+223' },
    { name: 'Malta', code: 'MT', phoneCode: '+356' },
    { name: 'Marshall Islands', code: 'MH', phoneCode: '+692' },
    { name: 'Mauritania', code: 'MR', phoneCode: '+222' },
    { name: 'Mauritius', code: 'MU', phoneCode: '+230' },
    { name: 'Mexico', code: 'MX', phoneCode: '+52' },
    { name: 'Micronesia', code: 'FM', phoneCode: '+691' },
    { name: 'Moldova', code: 'MD', phoneCode: '+373' },
    { name: 'Monaco', code: 'MC', phoneCode: '+377' },
    { name: 'Mongolia', code: 'MN', phoneCode: '+976' },
    { name: 'Montenegro', code: 'ME', phoneCode: '+382' },
    { name: 'Morocco', code: 'MA', phoneCode: '+212' },
    { name: 'Mozambique', code: 'MZ', phoneCode: '+258' },
    { name: 'Myanmar', code: 'MM', phoneCode: '+95' },
    { name: 'Namibia', code: 'NA', phoneCode: '+264' },
    { name: 'Nauru', code: 'NR', phoneCode: '+674' },
    { name: 'Nepal', code: 'NP', phoneCode: '+977' },
    { name: 'Netherlands', code: 'NL', phoneCode: '+31' },
    { name: 'New Zealand', code: 'NZ', phoneCode: '+64' },
    { name: 'Nicaragua', code: 'NI', phoneCode: '+505' },
    { name: 'Niger', code: 'NE', phoneCode: '+227' },
    { name: 'Nigeria', code: 'NG', phoneCode: '+234' },
    { name: 'North Macedonia', code: 'MK', phoneCode: '+389' },
    { name: 'Norway', code: 'NO', phoneCode: '+47' },
    { name: 'Oman', code: 'OM', phoneCode: '+968' },
    { name: 'Pakistan', code: 'PK', phoneCode: '+92' },
    { name: 'Palau', code: 'PW', phoneCode: '+680' },
    { name: 'Panama', code: 'PA', phoneCode: '+507' },
    { name: 'Papua New Guinea', code: 'PG', phoneCode: '+675' },
    { name: 'Paraguay', code: 'PY', phoneCode: '+595' },
    { name: 'Peru', code: 'PE', phoneCode: '+51' },
    { name: 'Philippines', code: 'PH', phoneCode: '+63' },
    { name: 'Poland', code: 'PL', phoneCode: '+48' },
    { name: 'Portugal', code: 'PT', phoneCode: '+351' },
    { name: 'Qatar', code: 'QA', phoneCode: '+974' },
    { name: 'Romania', code: 'RO', phoneCode: '+40' },
    { name: 'Russia', code: 'RU', phoneCode: '+7' },
    { name: 'Rwanda', code: 'RW', phoneCode: '+250' },
    { name: 'Saint Kitts and Nevis', code: 'KN', phoneCode: '+1869' },
    { name: 'Saint Lucia', code: 'LC', phoneCode: '+1758' },
    { name: 'Saint Vincent and the Grenadines', code: 'VC', phoneCode: '+1784' },
    { name: 'Samoa', code: 'WS', phoneCode: '+685' },
    { name: 'San Marino', code: 'SM', phoneCode: '+378' },
    { name: 'Sao Tome and Principe', code: 'ST', phoneCode: '+239' },
    { name: 'Saudi Arabia', code: 'SA', phoneCode: '+966' },
    { name: 'Senegal', code: 'SN', phoneCode: '+221' },
    { name: 'Serbia', code: 'RS', phoneCode: '+381' },
    { name: 'Seychelles', code: 'SC', phoneCode: '+248' },
    { name: 'Sierra Leone', code: 'SL', phoneCode: '+232' },
    { name: 'Singapore', code: 'SG', phoneCode: '+65' },
    { name: 'Slovakia', code: 'SK', phoneCode: '+421' },
    { name: 'Slovenia', code: 'SI', phoneCode: '+386' },
    { name: 'Solomon Islands', code: 'SB', phoneCode: '+677' },
    { name: 'Somalia', code: 'SO', phoneCode: '+252' },
    { name: 'South Africa', code: 'ZA', phoneCode: '+27' },
    { name: 'South Sudan', code: 'SS', phoneCode: '+211' },
    { name: 'Spain', code: 'ES', phoneCode: '+34' },
    { name: 'Sri Lanka', code: 'LK', phoneCode: '+94' },
    { name: 'Sudan', code: 'SD', phoneCode: '+249' },
    { name: 'Suriname', code: 'SR', phoneCode: '+597' },
    { name: 'Sweden', code: 'SE', phoneCode: '+46' },
    { name: 'Switzerland', code: 'CH', phoneCode: '+41' },
    { name: 'Syria', code: 'SY', phoneCode: '+963' },
    { name: 'Taiwan', code: 'TW', phoneCode: '+886' },
    { name: 'Tajikistan', code: 'TJ', phoneCode: '+992' },
    { name: 'Tanzania', code: 'TZ', phoneCode: '+255' },
    { name: 'Thailand', code: 'TH', phoneCode: '+66' },
    { name: 'Timor-Leste', code: 'TL', phoneCode: '+670' },
    { name: 'Togo', code: 'TG', phoneCode: '+228' },
    { name: 'Tonga', code: 'TO', phoneCode: '+676' },
    { name: 'Trinidad and Tobago', code: 'TT', phoneCode: '+1868' },
    { name: 'Tunisia', code: 'TN', phoneCode: '+216' },
    { name: 'Turkey', code: 'TR', phoneCode: '+90' },
    { name: 'Turkmenistan', code: 'TM', phoneCode: '+993' },
    { name: 'Tuvalu', code: 'TV', phoneCode: '+688' },
    { name: 'Uganda', code: 'UG', phoneCode: '+256' },
    { name: 'Ukraine', code: 'UA', phoneCode: '+380' },
    { name: 'United Arab Emirates', code: 'AE', phoneCode: '+971' },
    { name: 'United Kingdom', code: 'GB', phoneCode: '+44' },
    { name: 'United States', code: 'US', phoneCode: '+1' },
    { name: 'Uruguay', code: 'UY', phoneCode: '+598' },
    { name: 'Uzbekistan', code: 'UZ', phoneCode: '+998' },
    { name: 'Vanuatu', code: 'VU', phoneCode: '+678' },
    { name: 'Vatican City', code: 'VA', phoneCode: '+379' },
    { name: 'Venezuela', code: 'VE', phoneCode: '+58' },
    { name: 'Vietnam', code: 'VN', phoneCode: '+84' },
    { name: 'Yemen', code: 'YE', phoneCode: '+967' },
    { name: 'Zambia', code: 'ZM', phoneCode: '+260' },
    { name: 'Zimbabwe', code: 'ZW', phoneCode: '+263' },
  ];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: country,
    });
  }

  // Seed Departments
  console.log('Seeding Departments...');
  const departments = [
    { name: 'Automotive. Travel & Transportation, Construction Solutions', code: 'ATC', description: 'Automotive, Travel, Transportation & Hospitality, Construction & Infrastructure' },
    { name: 'Digital & Commerce Solutions', code: 'DES', description: 'Digital Experiences & E-commerce (across all verticals); Insurance' },
    { name: 'Retail & Warehouse Automation Solutions', code: 'RWA', description: 'Retail, Warehouse Automation, Dealer Management' },
    { name: 'Data & AI Solutions', code: 'DAI', description: 'Data & AI Solutions, DevOps/ Cloud Engineering (across all verticals)' },
    { name: 'Experience Design Studio', code: 'EDS', description: 'Digital Experience Services (across all verticals)' },
    { name: 'Digital Technology Services', code: 'DTS', description: 'Healthcare, Edutech, Banking; Automation, Cybersecurity (across all verticals)' },
    { name: 'IOT & Embedded Solutions', code: 'IES', description: 'IOT and Embedded (across all verticals)' },
    { name: 'VantX Financial Solutions', code: 'VTX', description: 'VantX products (VantX is the new name for Vantage)' },
    { name: 'Facilities & Support Services', code: 'FSS', description: 'Facilities & Support Services' },
    { name: 'Talent Acquisition', code: 'TAC', description: 'Talent Acquisition' },
    { name: 'Contracts & Legal Services', code: 'CLS', description: 'Contracts & Legal Services' },
    { name: 'Information Systems', code: 'INS', description: 'Information Systems' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { code: dept.code },
      update: {},
      create: dept,
    });
  }

  // Seed JobTitles
  console.log('Seeding JobTitles...');
  const jobTitles = [
    { title: 'Associate Software Engineer', description: 'Associate Software Engineer' },
    { title: 'Software Engineer', description: 'Software Engineer' },
    { title: 'Senior Software Engineer', description: 'Senior Software Engineer' },
    { title: 'Technical Specialist', description: 'Technical Specialist' },
    { title: 'Senior Technical Specialist', description: 'Senior Technical Specialist' },
    { title: 'Associate Consultant - Software Engineering', description: 'Associate Consultant - Software Engineering' },
    { title: 'Consultant - Software Engineering', description: 'Consultant - Software Engineering' },
    { title: 'Senior Consultant - Software Engineering', description: 'Senior Consultant - Software Engineering' },
    { title: 'Principal Consultant - Software Engineering (Grade 1)', description: 'Principal Consultant - Software Engineering (Grade 1)' },
    { title: 'Associate Data & AI Engineer', description: 'Associate Data & AI Engineer' },
    { title: 'Data & AI Engineer', description: 'Data & AI Engineer' },
    { title: 'Data & AI Specialist', description: 'Data & AI Specialist' },
    { title: 'Consultant - Data & AI', description: 'Consultant - Data & AI' },
    { title: 'Principal Consultant - Data & AI (Grade 1)', description: 'Principal Consultant - Data & AI (Grade 1)' },
    { title: 'Test Automation Engineer', description: 'Test Automation Engineer' },
    { title: 'Consultant - Test Automation', description: 'Consultant - Test Automation' },
    { title: 'UI Engineer', description: 'UI Engineer' },
  ];

  for (const jobTitle of jobTitles) {
    await prisma.jobTitle.upsert({
      where: { title: jobTitle.title },
      update: {},
      create: jobTitle,
    });
  }

  // Seed Qualifications
  console.log('Seeding Qualifications...');
  const qualifications = [
    { name: 'High School Diploma', level: 'Secondary', description: 'Completion of secondary education (12th grade or equivalent)' },
    { name: 'Undergraduate Degree', level: 'Bachelor', description: "Bachelor's degree in any field (typically 3-4 year program)" },
    { name: 'Bachelor of Technology (B.Tech)', level: 'Bachelor', description: '4-year undergraduate degree in engineering/technology' },
    { name: 'Bachelor of Computer Applications (BCA)', level: 'Bachelor', description: '3-year undergraduate degree in computer applications' },
    { name: 'Graduate Degree', level: 'Master', description: "Master's degree in any field (typically 2 year program)" },
    { name: 'Master of Technology (M.Tech)', level: 'Master', description: 'Postgraduate degree in engineering/technology specialization' },
    { name: 'Master of Computer Applications (MCA)', level: 'Master', description: 'Postgraduate degree in computer applications' },
    { name: 'Post Graduate Diploma', level: 'Postgraduate', description: "1-2 year specialized diploma after bachelor's degree" },
    { name: 'Doctorate (PhD)', level: 'Doctorate', description: 'Highest academic degree involving original research' },
    { name: 'Diploma in Engineering', level: 'Diploma', description: '3-year technical diploma after 10th grade' },
    { name: 'IT Certification Program', level: 'Certificate', description: 'Industry-recognized IT certification (e.g., Microsoft, Cisco)' },
    { name: 'Vocational Training Certificate', level: 'Certificate', description: 'Job-specific skills training program' },
    { name: 'Associate Degree', level: 'Associate', description: '2-year undergraduate degree (common in some countries)' },
    { name: 'Integrated Dual Degree', level: 'Bachelor+Master', description: "5-year combined bachelor's and master's program" },
    { name: 'Post Doctoral Research', level: 'Post-Doctorate', description: 'Advanced research following PhD completion' },
  ];

  for (const qual of qualifications) {
    await prisma.qualification.upsert({
      where: { name: qual.name },
      update: {},
      create: qual,
    });
  }

  // Seed Roles
  console.log('Seeding Roles...');
  const roles = [
    { name: 'Admin', description: 'Full Privilege' },
    { name: 'Hiring Manager', description: 'Responsible for initiating and overseeing hiring processes' },
    { name: 'DU Head', description: 'Delivery Unit Head with overall responsibility for the DU' },
    { name: 'CDO', description: 'Chief Delivery Officer with organization-wide delivery oversight' },
    { name: 'COO', description: 'Chief Operating Officer with executive leadership responsibilities' },
    { name: 'Recruiter Lead', description: 'Leads the recruitment team and processes' },
    { name: 'Recruiter POC', description: 'Recruiter Point of Contact for specific hiring needs' },
    { name: 'Interview Panel Member', description: 'Participates in candidate interviews and evaluations' },
    { name: 'Candidate', description: 'Individual applying for a position' },
    { name: 'Vendor', description: 'Representative from vendor or partner organizations' },
    { name: 'Employee', description: 'Regular employee within the organization' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  // Seed Skills
  console.log('Seeding Skills...');
  const skills = [
    { name: 'C#', category: 'Programming Language', isTechnical: true },
    { name: 'Java', category: 'Programming Language', isTechnical: true },
    { name: 'Python', category: 'Programming Language', isTechnical: true },
    { name: 'JavaScript', category: 'Programming Language', isTechnical: true },
    { name: 'TypeScript', category: 'Programming Language', isTechnical: true },
    { name: 'Go', category: 'Programming Language', isTechnical: true },
    { name: 'Ruby', category: 'Programming Language', isTechnical: true },
    { name: 'PHP', category: 'Programming Language', isTechnical: true },
    { name: 'Swift', category: 'Programming Language', isTechnical: true },
    { name: 'Kotlin', category: 'Programming Language', isTechnical: true },
    { name: '.NET', category: 'Framework', isTechnical: true },
    { name: 'Node.js', category: 'Framework', isTechnical: true },
    { name: 'Spring', category: 'Framework', isTechnical: true },
    { name: 'Django', category: 'Framework', isTechnical: true },
    { name: 'Flask', category: 'Framework', isTechnical: true },
    { name: 'React', category: 'Framework', isTechnical: true },
    { name: 'Angular', category: 'Framework', isTechnical: true },
    { name: 'Vue.js', category: 'Framework', isTechnical: true },
    { name: 'Express', category: 'Framework', isTechnical: true },
    { name: 'Laravel', category: 'Framework', isTechnical: true },
    { name: 'MS SQL', category: 'Database', isTechnical: true },
    { name: 'MySQL', category: 'Database', isTechnical: true },
    { name: 'PostgreSQL', category: 'Database', isTechnical: true },
    { name: 'MongoDB', category: 'Database', isTechnical: true },
    { name: 'Redis', category: 'Database', isTechnical: true },
    { name: 'Oracle', category: 'Database', isTechnical: true },
    { name: 'Cassandra', category: 'Database', isTechnical: true },
    { name: 'Elasticsearch', category: 'Database', isTechnical: true },
    { name: 'DynamoDB', category: 'Database', isTechnical: true },
    { name: 'Firebase', category: 'Database', isTechnical: true },
    { name: 'Docker', category: 'DevOps', isTechnical: true },
    { name: 'Kubernetes', category: 'DevOps', isTechnical: true },
    { name: 'AWS', category: 'Cloud', isTechnical: true },
    { name: 'Azure', category: 'Cloud', isTechnical: true },
    { name: 'GCP', category: 'Cloud', isTechnical: true },
    { name: 'Terraform', category: 'DevOps', isTechnical: true },
    { name: 'Ansible', category: 'DevOps', isTechnical: true },
    { name: 'Jenkins', category: 'DevOps', isTechnical: true },
    { name: 'GitLab CI/CD', category: 'DevOps', isTechnical: true },
    { name: 'GitHub Actions', category: 'DevOps', isTechnical: true },
    { name: 'Selenium', category: 'Testing', isTechnical: true },
    { name: 'Jest', category: 'Testing', isTechnical: true },
    { name: 'Mocha', category: 'Testing', isTechnical: true },
    { name: 'Cypress', category: 'Testing', isTechnical: true },
    { name: 'JUnit', category: 'Testing', isTechnical: true },
    { name: 'TestNG', category: 'Testing', isTechnical: true },
    { name: 'Postman', category: 'Testing', isTechnical: true },
    { name: 'JMeter', category: 'Testing', isTechnical: true },
    { name: 'Cucumber', category: 'Testing', isTechnical: true },
    { name: 'Playwright', category: 'Testing', isTechnical: true },
    { name: 'Tableau', category: 'Data Visualization', isTechnical: true },
    { name: 'Power BI', category: 'Data Visualization', isTechnical: true },
    { name: 'Pandas', category: 'Data Analysis', isTechnical: true },
    { name: 'NumPy', category: 'Data Analysis', isTechnical: true },
    { name: 'Spark', category: 'Big Data', isTechnical: true },
    { name: 'Hadoop', category: 'Big Data', isTechnical: true },
    { name: 'TensorFlow', category: 'Machine Learning', isTechnical: true },
    { name: 'PyTorch', category: 'Machine Learning', isTechnical: true },
    { name: 'Scikit-learn', category: 'Machine Learning', isTechnical: true },
    { name: 'R', category: 'Data Analysis', isTechnical: true },
    { name: 'React Native', category: 'Mobile Development', isTechnical: true },
    { name: 'Flutter', category: 'Mobile Development', isTechnical: true },
    { name: 'Android SDK', category: 'Mobile Development', isTechnical: true },
    { name: 'iOS SDK', category: 'Mobile Development', isTechnical: true },
    { name: 'Xamarin', category: 'Mobile Development', isTechnical: true },
    { name: 'GraphQL', category: 'API', isTechnical: true },
    { name: 'REST API', category: 'API', isTechnical: true },
    { name: 'SOAP', category: 'API', isTechnical: true },
    { name: 'Kafka', category: 'Messaging', isTechnical: true },
    { name: 'RabbitMQ', category: 'Messaging', isTechnical: true },
    { name: 'Nginx', category: 'Web Server', isTechnical: true },
    { name: 'Apache', category: 'Web Server', isTechnical: true },
    { name: 'Linux', category: 'Operating System', isTechnical: true },
    { name: 'Windows Server', category: 'Operating System', isTechnical: true },
    { name: 'Bash', category: 'Scripting', isTechnical: true },
    { name: 'PowerShell', category: 'Scripting', isTechnical: true },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: skill,
    });
  }

  // Get India country ID for office locations
  const india = await prisma.country.findUnique({ where: { code: 'IN' } });
  
  if (india) {
    // Seed Office Locations
    console.log('Seeding Office Locations...');
    const officeLocations = [
      { name: 'Cochin', address: 'Infopark, Kochi, Kerala, India', countryId: india.id },
      { name: 'Trivandrum', address: 'Technopark, Thiruvananthapuram, Kerala, India', countryId: india.id },
      { name: 'Bangalore', address: 'Manyata Tech Park, Bangalore, Karnataka, India', countryId: india.id },
      { name: 'Remote', address: 'Work from Home/Remote Location', countryId: india.id },
    ];

    for (const location of officeLocations) {
      await prisma.officeLocation.upsert({
        where: { name: location.name },
        update: {},
        create: location,
      });
    }
  }

  // Get role and department IDs for users
  const adminRole = await prisma.role.findUnique({ where: { name: 'Admin' } });
  const hiringManagerRole = await prisma.role.findUnique({ where: { name: 'Hiring Manager' } });
  const recruiterLeadRole = await prisma.role.findUnique({ where: { name: 'Recruiter Lead' } });
  const employeeRole = await prisma.role.findUnique({ where: { name: 'Employee' } });
  
  const dtsDept = await prisma.department.findUnique({ where: { code: 'DTS' } });
  const daiDept = await prisma.department.findUnique({ where: { code: 'DAI' } });
  const tacDept = await prisma.department.findUnique({ where: { code: 'TAC' } });
  const insDept = await prisma.department.findUnique({ where: { code: 'INS' } });
  const edsDept = await prisma.department.findUnique({ where: { code: 'EDS' } });
  const fssDept = await prisma.department.findUnique({ where: { code: 'FSS' } });

  // Seed Users
  console.log('Seeding Users...');
  const users = [
    { email: 'david.brown@company.com', name: 'David Brown', role: 'Hiring Manager', roleId: hiringManagerRole?.id, departmentId: dtsDept?.id, isActive: true },
    { email: 'catherine.lee@company.com', name: 'Catherine Lee', role: 'Hiring Manager', roleId: hiringManagerRole?.id, departmentId: daiDept?.id, isActive: true },
    { email: 'michael.wilson@company.com', name: 'Michael Wilson', role: 'Hiring Manager', roleId: hiringManagerRole?.id, departmentId: tacDept?.id, isActive: true },
    { email: 'admin.user@company.com', name: 'Admin User', role: 'Admin', roleId: adminRole?.id, departmentId: insDept?.id, isActive: true },
    { email: 'sarah.johnson@company.com', name: 'Sarah Johnson', role: 'Recruiter Lead', roleId: recruiterLeadRole?.id, departmentId: tacDept?.id, isActive: true },
    { email: 'robert.garcia@company.com', name: 'Robert Garcia', role: 'Recruiter Lead', roleId: recruiterLeadRole?.id, departmentId: tacDept?.id, isActive: true },
    { email: 'emily.chen@company.com', name: 'Emily Chen', role: 'Employee', roleId: employeeRole?.id, departmentId: dtsDept?.id, isActive: true },
    { email: 'james.smith@company.com', name: 'James Smith', role: 'Employee', roleId: employeeRole?.id, departmentId: edsDept?.id, isActive: true },
    { email: 'inactive.user@company.com', name: 'Inactive User', role: 'Employee', roleId: employeeRole?.id, departmentId: fssDept?.id, isActive: false },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Seed Visa Statuses
  console.log('Seeding Visa Statuses...');
  const visaStatuses = [
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
  ];

  for (const visa of visaStatuses) {
    await prisma.visaStatus.upsert({
      where: { status: visa.status },
      update: {},
      create: visa,
    });
  }

  // Seed Work Shifts
  console.log('Seeding Work Shifts...');
  const workShifts = [
    { name: 'Standard Day Shift', startTime: '09:00:00', endTime: '18:00:00', description: 'Regular 9am-6pm shift with 1 hour lunch break' },
    { name: 'UK Shift', startTime: '12:00:00', endTime: '21:00:00', description: 'Shift aligned with UK business hours (GMT/BST)' },
    { name: 'US East Coast Shift', startTime: '14:00:00', endTime: '23:00:00', description: 'Shift aligned with US Eastern Time (ET)' },
    { name: 'US West Coast Shift', startTime: '17:00:00', endTime: '02:00:00', description: 'Shift aligned with US Pacific Time (PT)' },
    { name: 'Australia Shift', startTime: '04:00:00', endTime: '13:00:00', description: 'Shift aligned with Australian Eastern Time (AET)' },
    { name: 'Early Morning Shift', startTime: '06:00:00', endTime: '15:00:00', description: 'Early start shift for morning coverage' },
    { name: 'Late Evening Shift', startTime: '15:00:00', endTime: '00:00:00', description: 'Late shift for evening/night coverage' },
    { name: 'Night Shift', startTime: '22:00:00', endTime: '07:00:00', description: 'Overnight shift for 24/7 operations' },
    { name: 'Flexible Shift', startTime: '10:00:00', endTime: '19:00:00', description: 'Flexible timing with core hours' },
    { name: 'Part-time Morning', startTime: '09:00:00', endTime: '14:00:00', description: 'Half-day morning shift' },
    { name: 'Part-time Afternoon', startTime: '14:00:00', endTime: '19:00:00', description: 'Half-day afternoon shift' },
    { name: 'Weekend Shift', startTime: '10:00:00', endTime: '18:00:00', description: 'Weekend working hours' },
    { name: 'Rotational Shift', startTime: '08:00:00', endTime: '20:00:00', description: 'Rotating between day and evening shifts' },
  ];

  for (const shift of workShifts) {
    await prisma.workShift.upsert({
      where: { name: shift.name },
      update: {},
      create: shift,
    });
  }

  // Seed Work Timezones
  console.log('Seeding Work Timezones...');
  const workTimezones = [
    { name: 'Baker Island Time', description: 'UTC−12:00 — Baker Island', timezoneValue: 'Etc/GMT+12' },
    { name: 'Niue Time', description: 'UTC−11:00 — Niue, American Samoa', timezoneValue: 'Pacific/Niue' },
    { name: 'Hawaii-Aleutian Standard Time', description: 'UTC−10:00 — Hawaii, Cook Islands', timezoneValue: 'Pacific/Honolulu' },
    { name: 'Alaska Standard Time', description: 'UTC−09:00 — Anchorage, Alaska', timezoneValue: 'America/Anchorage' },
    { name: 'Pacific Standard Time', description: 'UTC−08:00 — Los Angeles, Vancouver', timezoneValue: 'America/Los_Angeles' },
    { name: 'Mountain Standard Time', description: 'UTC−07:00 — Denver, Phoenix', timezoneValue: 'America/Denver' },
    { name: 'Central Standard Time', description: 'UTC−06:00 — Chicago, Mexico City', timezoneValue: 'America/Chicago' },
    { name: 'Eastern Standard Time', description: 'UTC−05:00 — New York, Toronto', timezoneValue: 'America/New_York' },
    { name: 'Greenwich Mean Time', description: 'UTC±00:00 — London, Lisbon', timezoneValue: 'Europe/London' },
    { name: 'Central European Time', description: 'UTC+01:00 — Berlin, Paris, Madrid', timezoneValue: 'Europe/Berlin' },
    { name: 'Eastern European Time', description: 'UTC+02:00 — Athens, Cairo, Jerusalem', timezoneValue: 'Europe/Athens' },
    { name: 'Moscow Standard Time', description: 'UTC+03:00 — Moscow, Nairobi, Riyadh', timezoneValue: 'Europe/Moscow' },
    { name: 'Gulf Standard Time', description: 'UTC+04:00 — Dubai, Baku', timezoneValue: 'Asia/Dubai' },
    { name: 'Pakistan Standard Time', description: 'UTC+05:00 — Karachi, Tashkent', timezoneValue: 'Asia/Karachi' },
    { name: 'India Standard Time', description: 'UTC+05:30 — India, Sri Lanka', timezoneValue: 'Asia/Kolkata' },
    { name: 'Bangladesh Standard Time', description: 'UTC+06:00 — Dhaka, Bhutan', timezoneValue: 'Asia/Dhaka' },
    { name: 'Indochina Time', description: 'UTC+07:00 — Bangkok, Hanoi, Jakarta', timezoneValue: 'Asia/Bangkok' },
    { name: 'China Standard Time', description: 'UTC+08:00 — Beijing, Singapore, Perth', timezoneValue: 'Asia/Shanghai' },
    { name: 'Japan Standard Time', description: 'UTC+09:00 — Tokyo, Seoul', timezoneValue: 'Asia/Tokyo' },
    { name: 'Australian Eastern Standard Time', description: 'UTC+10:00 — Sydney, Melbourne', timezoneValue: 'Australia/Sydney' },
    { name: 'New Zealand Standard Time', description: 'UTC+12:00 — Auckland, Fiji', timezoneValue: 'Pacific/Auckland' },
  ];

  for (const timezone of workTimezones) {
    await prisma.workTimeZone.upsert({
      where: { timezoneValue: timezone.timezoneValue },
      update: {},
      create: timezone,
    });
  }

  console.log('Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
