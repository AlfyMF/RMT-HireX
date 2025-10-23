import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const AZURE_AD_TENANT_ID = process.env.AZURE_AD_TENANT_ID;
const AZURE_AD_CLIENT_ID = process.env.AZURE_AD_CLIENT_ID;

if (!AZURE_AD_TENANT_ID || !AZURE_AD_CLIENT_ID) {
  console.warn('Warning: Azure AD credentials not configured. Authentication will fail.');
}

const client = jwksClient({
  jwksUri: `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/discovery/v2.0/keys`,
  cache: true,
  cacheMaxAge: 86400000,
  rateLimit: true,
  jwksRequestsPerMinute: 10,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
      return;
    }
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export interface AuthRequest extends Request {
  user?: {
    oid: string;
    email: string;
    name: string;
    preferred_username: string;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({
      success: false,
      message: 'Access token required',
    });
    return;
  }

  if (!AZURE_AD_TENANT_ID || !AZURE_AD_CLIENT_ID) {
    res.status(500).json({
      success: false,
      message: 'Server authentication not configured',
    });
    return;
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: AZURE_AD_CLIENT_ID,
      issuer: `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/v2.0`,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (err) {
        console.error('JWT verification error:', err.message);
        res.status(403).json({
          success: false,
          message: 'Invalid or expired token',
        });
        return;
      }

      const payload = decoded as jwt.JwtPayload;
      req.user = {
        oid: payload.oid as string,
        email: payload.email || payload.preferred_username || '',
        name: payload.name || '',
        preferred_username: payload.preferred_username || '',
      };

      next();
    }
  );
};

export const optionalAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    next();
    return;
  }

  if (!AZURE_AD_TENANT_ID || !AZURE_AD_CLIENT_ID) {
    next();
    return;
  }

  jwt.verify(
    token,
    getKey,
    {
      audience: AZURE_AD_CLIENT_ID,
      issuer: `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/v2.0`,
      algorithms: ['RS256'],
    },
    (err, decoded) => {
      if (!err && decoded) {
        const payload = decoded as jwt.JwtPayload;
        req.user = {
          oid: payload.oid as string,
          email: payload.email || payload.preferred_username || '',
          name: payload.name || '',
          preferred_username: payload.preferred_username || '',
        };
      }
      next();
    }
  );
};
