import { NextFunction, Request, Response } from "express";
import UserService from "../services/User.service";
import RequestStatus from "../utils/request-status";

class ProfileMiddleware {
  #userService: UserService;

  constructor(userService: UserService) {
    this.#userService = userService;
  }

  private getUser(req: Request) {
    const userId = req.get("usuario_id");
    if (!userId) return null;
    const onlyNumbers = String(userId).replace(/\D/g, "");
    const user = this.#userService.findById(Number(onlyNumbers));

    if (!user) return null;

    return user;
  }

  user = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUser(req);

    if (!user) {
      res
        .status(RequestStatus.UNAUTHORIZED)
        .json({ message: "Acesso não autorizado" });
      return;
    }

    const hasUserProfile = ["user", "admin"].includes(user.perfil);

    if (!hasUserProfile) {
      res
        .status(RequestStatus.UNAUTHORIZED)
        .json({ message: "Acesso não autorizado" });
      return;
    }

    next();
  };

  admin = async (req: Request, res: Response, next: NextFunction) => {
    const user = this.getUser(req);

    if (!user) {
      res
        .status(RequestStatus.UNAUTHORIZED)
        .json({ message: "Acesso não autorizado" });
      return;
    }

    const hasAdminProfile = user.perfil.includes("admin");

    if (!hasAdminProfile) {
      res
        .status(RequestStatus.UNAUTHORIZED)
        .json({ message: "Acesso não autorizado" });
      return;
    }

    next();
  };
}

export default ProfileMiddleware;
