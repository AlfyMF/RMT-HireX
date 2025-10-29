import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/auth';

const prisma = new PrismaClient();

/**
 * UserController handles all user-related operations
 * including fetching user profile data from the database
 */
export class UserController {
  /**
   * Get the current user's profile based on their authenticated email
   * The email is extracted from the Azure AD JWT token by the auth middleware
   * 
   * @param req - Express request with authenticated user data
   * @param res - Express response
   * @returns User profile data including role and department information
   */
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      // Extract email from the authenticated user (set by auth middleware)
      const userEmail = req.user?.email;

      if (!userEmail) {
        res.status(401).json({
          success: false,
          message: 'User email not found in authentication token',
        });
        return;
      }

      // Fetch user details from database using email
      const user = await prisma.user.findFirst({
        where: {
          email: userEmail,
          isActive: true, // Only return active users
        },
        include: {
          // Include department details
          department: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
          // Include role details
          roleRef: {
            select: {
              id: true,
              name: true,
              description: true,
              permissions: true,
            },
          },
        },
      });

      // Handle case where user is not found in database
      if (!user) {
        res.status(404).json({
          success: false,
          message: `User with email '${userEmail}' not found in the system. Please contact your administrator.`,
        });
        return;
      }

      // Return user profile data
      res.status(200).json({
        success: true,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          roleDetails: user.roleRef ? {
            id: user.roleRef.id,
            name: user.roleRef.name,
            description: user.roleRef.description,
            permissions: user.roleRef.permissions,
          } : null,
          department: user.department ? {
            id: user.department.id,
            name: user.department.name,
            code: user.department.code,
          } : null,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile. Please try again later.',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
