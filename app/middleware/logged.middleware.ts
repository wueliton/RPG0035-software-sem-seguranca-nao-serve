import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import RequestStatus from "../utils/request-status";
import { UserPayload } from "../@types/user-payload";

async function loggedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.get("authorization") ?? "";
  const [_, jwtToken] = authorizationHeader.split(" ");

  if (!jwtToken) {
    res
      .status(RequestStatus.UNAUTHORIZED)
      .json({ message: "Acesso Não autorizado" });
    return;
  }

  try {
    const appSecret = process.env.APP_SECRET ?? "";
    const decoded = (await jwt.verify(jwtToken, appSecret)) as UserPayload;
    req.headers.usuario_id = decoded.usuario_id;

    next();
  } catch {
    res
      .status(RequestStatus.UNAUTHORIZED)
      .json({ message: "Acesso Não autorizado" });
  }
}

export default loggedMiddleware;
