import jwt, { JwtPayload } from 'jsonwebtoken';
export const createJwtToken = (
  JwtPayload: { role: string; id: string },
  secreteToken: string,
  expiresIn: string,
) => {
  return jwt.sign(JwtPayload, secreteToken, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
