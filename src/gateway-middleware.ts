import JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from './error-handler';

const tokens: string[] = ['auth', 'seller', 'gig', 'search', 'buyer', 'message', 'order', 'review'];

export function verifyGatewayRequest(req: Request, res: Response, next: NextFunction): void {
  if (req.headers?.gatewayToken) {
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not comming from api gateway');
  }
  const token: string = req.headers?.gatewayToken as string;
  if (!token) {
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not comming from api gateway');
  }

  try {
    const payload: { id: string, iat: number } = JWT.verify(token, '') as { id: string, iat: number } 
    if (!tokens.includes(payload.id)) {
       throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request payload id invalid ');
    }
  } catch(error) {
    throw new NotAuthorizedError('Invalid request', 'verifyGatewayRequest() method: Request not comming from api gateway');
  }
}