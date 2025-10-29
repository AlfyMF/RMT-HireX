import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from './auth';

const prisma = new PrismaClient();

/**
 * Middleware to enrich authenticated request with user database information
 * Must be used after authenticateToken middleware
 */
export const enrichUserData = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user?.email) {
      next();
      return;
    }

    // Fetch user from database
    const dbUser = await prisma.user.findFirst({
      where: {
        email: req.user.email,
        isActive: true
      },
      include: {
        roleRef: true,
        department: true
      }
    });

    if (dbUser) {
      // Enrich request with database user information
      (req as any).user = {
        ...req.user,
        userId: dbUser.id,
        role: dbUser.role,
        roleId: dbUser.roleId,
        departmentId: dbUser.departmentId,
        dbUser: dbUser
      };
    }

    next();
  } catch (error) {
    console.error('Error enriching user data:', error);
    next(); // Continue even if enrichment fails
  }
};
