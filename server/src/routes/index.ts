import { Router } from 'express';
import { JobRequisitionController } from '../controllers/jobRequisition';
import { MasterDataController } from '../controllers/masterData';
import { authenticateToken } from '../middleware/auth';

const router = Router();

const jrController = new JobRequisitionController();
const masterDataController = new MasterDataController();

router.get('/', (req, res) => {
  res.json({ message: 'HireX API v1' });
});

/**
 * @swagger
 * /api/job-requisitions:
 *   get:
 *     summary: Get all job requisitions with pagination, filtering, and search
 *     tags: [Job Requisitions]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by status
 *       - in: query
 *         name: department
 *         schema:
 *           type: string
 *         description: Filter by department
 *       - in: query
 *         name: workArrangement
 *         schema:
 *           type: string
 *         description: Filter by work arrangement
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by location
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by JR ID, job title, or department
 *     responses:
 *       200:
 *         description: Job requisitions retrieved successfully
 */
router.get('/job-requisitions', authenticateToken, jrController.findAll.bind(jrController));

/**
 * @swagger
 * /api/job-requisitions/{id}:
 *   get:
 *     summary: Get a single job requisition by ID
 *     tags: [Job Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job requisition retrieved successfully
 *       404:
 *         description: Job requisition not found
 */
router.get('/job-requisitions/:id', authenticateToken, jrController.findById.bind(jrController));

/**
 * @swagger
 * /api/job-requisitions:
 *   post:
 *     summary: Create a new job requisition
 *     tags: [Job Requisitions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobTitleId
 *               - departmentId
 *               - jobTypeId
 *               - workArrangement
 *               - locationId
 *               - requestedBy
 *             properties:
 *               jobTitleId:
 *                 type: string
 *               departmentId:
 *                 type: string
 *               jobTypeId:
 *                 type: string
 *               workArrangement:
 *                 type: string
 *                 enum: [Offshore, Onsite]
 *               locationId:
 *                 type: string
 *               positions:
 *                 type: integer
 *               requestedBy:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job requisition created successfully
 */
router.post('/job-requisitions', authenticateToken, jrController.create.bind(jrController));

/**
 * @swagger
 * /api/job-requisitions/{id}:
 *   put:
 *     summary: Update a job requisition
 *     tags: [Job Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Job requisition updated successfully
 */
router.put('/job-requisitions/:id', authenticateToken, jrController.update.bind(jrController));

/**
 * @swagger
 * /api/job-requisitions/{id}:
 *   delete:
 *     summary: Delete a job requisition
 *     tags: [Job Requisitions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job requisition deleted successfully
 */
router.delete('/job-requisitions/:id', authenticateToken, jrController.delete.bind(jrController));

/**
 * @swagger
 * /api/job-types:
 *   get:
 *     summary: Get all job types
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Job types retrieved successfully
 */
router.get('/job-types', masterDataController.getJobTypes.bind(masterDataController));

/**
 * @swagger
 * /api/certifications:
 *   get:
 *     summary: Get all certifications
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Certifications retrieved successfully
 */
router.get('/certifications', masterDataController.getCertifications.bind(masterDataController));

/**
 * @swagger
 * /api/countries:
 *   get:
 *     summary: Get all countries
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Countries retrieved successfully
 */
router.get('/countries', masterDataController.getCountries.bind(masterDataController));

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Departments retrieved successfully
 */
router.get('/departments', masterDataController.getDepartments.bind(masterDataController));

/**
 * @swagger
 * /api/job-titles:
 *   get:
 *     summary: Get all job titles
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Job titles retrieved successfully
 */
router.get('/job-titles', masterDataController.getJobTitles.bind(masterDataController));

/**
 * @swagger
 * /api/qualifications:
 *   get:
 *     summary: Get all qualifications
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Qualifications retrieved successfully
 */
router.get('/qualifications', masterDataController.getQualifications.bind(masterDataController));

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Roles retrieved successfully
 */
router.get('/roles', masterDataController.getRoles.bind(masterDataController));

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Skills retrieved successfully
 */
router.get('/skills', masterDataController.getSkills.bind(masterDataController));

/**
 * @swagger
 * /api/office-locations:
 *   get:
 *     summary: Get all office locations
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Office locations retrieved successfully
 */
router.get('/office-locations', masterDataController.getOfficeLocations.bind(masterDataController));

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 */
router.get('/users', masterDataController.getUsers.bind(masterDataController));

/**
 * @swagger
 * /api/visa-statuses:
 *   get:
 *     summary: Get all visa statuses
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Visa statuses retrieved successfully
 */
router.get('/visa-statuses', masterDataController.getVisaStatuses.bind(masterDataController));

/**
 * @swagger
 * /api/work-shifts:
 *   get:
 *     summary: Get all work shifts
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Work shifts retrieved successfully
 */
router.get('/work-shifts', masterDataController.getWorkShifts.bind(masterDataController));

/**
 * @swagger
 * /api/work-timezones:
 *   get:
 *     summary: Get all work timezones
 *     tags: [Master Data]
 *     responses:
 *       200:
 *         description: Work timezones retrieved successfully
 */
router.get('/work-timezones', masterDataController.getWorkTimezones.bind(masterDataController));

export default router;
