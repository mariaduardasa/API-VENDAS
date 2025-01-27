import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "src/shared/errors/AppError";
import authConfig from 'src/config/auth';

// Interface para o Payload do Token JWT
interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  // Verifica se o cabeçalho de autorização está presente
  if (!authHeader) {
    throw new AppError('JWT Token is missing.', 401); // Inclui o código de status 401 (não autorizado)
  }

  // Corrige a desestruturação do token
  const [, token] = authHeader.split(' '); // Divide pelo espaço para obter o esquema 'Bearer' e o token

  try {
    // Verifica o token JWT usando a chave secreta
    const decodedToken = verify(token, authConfig.jwt.secret);

    // Desestrutura o 'sub' do payload JWT
    const { sub } = decodedToken as ITokenPayload;

    // Adiciona o ID do usuário no objeto de request
    request.user = {
      id: sub,
    };

    return next(); // Chama o próximo middleware
  } catch {
    throw new AppError('Invalid JWT Token.', 401); // Inclui o código de status 401 (não autorizado)
  }
}
