import { Request, Response } from "express";
import RequestStatus from "../utils/request-status";
import jwt from "jsonwebtoken";
import { TWO_MINUTES } from "./constants";
import UserService from "../services/User.service";

class LoginController {
  #userService: UserService;
  #attempts: string[] = [];

  constructor(userService: UserService) {
    this.#userService = userService;
  }

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      res
        .status(RequestStatus.BAD_REQUEST)
        .json({ message: "E-mail ou Senha inválidos" });
      return;
    }

    const isInvalidEmail =
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isInvalidPassword = !password || password.length < 3;

    if (isInvalidEmail) {
      res
        .status(RequestStatus.BAD_REQUEST)
        .json({ message: "E-mail inválido" });
      return;
    }

    if (isInvalidPassword) {
      res
        .status(RequestStatus.BAD_REQUEST)
        .json({ message: "Senha no formato inválido" });
      return;
    }

    const user = this.#userService.find({ email, password });

    if (!user) {
      const attempts = this.#attempts.filter((item) => item === email);
      const cannotTryLogin = attempts.length > 3;

      if (cannotTryLogin) {
        res
          .status(RequestStatus.BAD_REQUEST)
          .json({
            message: "Tentativas excedidas, tente novamente mais tarde.",
          });
        return;
      }

      this.#attempts.push(email);

      res
        .status(RequestStatus.BAD_REQUEST)
        .json({ message: "E-mail ou Senha inválidos" });
      return;
    }

    const jwtToken = jwt.sign(
      { usuario_id: user.id },
      process.env.APP_SECRET ?? "",
      {
        expiresIn: TWO_MINUTES,
      }
    );

    res.json({ sessionid: jwtToken });
  };
}

export default LoginController;
