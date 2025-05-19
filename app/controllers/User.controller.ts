import { Request, Response } from "express";
import UserService from "../services/User.service";
import RequestStatus from "../utils/request-status";

class UserController {
  #userService: UserService;

  constructor(userService: UserService) {
    this.#userService = userService;
  }

  private getUserId = (req: Request) => {
    const userId = req.get("usuario_id");
    const onlyNumbers = String(userId ?? "").replace(/\D/g, "");
    return Number(onlyNumbers);
  };

  getUserData = async (req: Request, res: Response) => {
    const userId = this.getUserId(req);
    const user = this.#userService.findById(userId);

    if (!user) {
      res
        .status(RequestStatus.BAD_REQUEST)
        .json({ message: "Acesso não autorizado" });
      return;
    }

    res.json({
      username: user.username,
      email: user.password,
      perfil: user.perfil,
      id: user.id,
    });
  };

  getUsers = async (req: Request, res: Response) => {
    const users = this.#userService.findAll();

    res.json(users);
  };
}

export default UserController;
