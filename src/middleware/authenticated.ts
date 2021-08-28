import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class Autenticated {

    static userAutenticated (request: Request, response: Response, next: NextFunction): object | NextFunction {

        const token = request.headers.authorization;

        if(!token){
            return response.status(401).json({
                status: false,
                message: "Token inválido ou expirado."
            })
        }

        const setToken = token.split(" ");

        try {
            const tokenDecode = verify(setToken[1], process.env.TOKEN_KEY)

            return <unknown> next() as NextFunction

        } catch (error) {

            return response.status(401).json({
                "status": false,
                "message": `Erro desconhecido: ${error}`
            }); 
        }

    }
}