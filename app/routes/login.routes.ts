import { Router, Request, Response } from "express";
import LoginController from "../controllers/Login.controller";

class LoginRoutes {
  #loginController: LoginController;
  router = Router();

  constructor(loginController: LoginController) {
    this.#loginController = loginController;
    this.routes();
  }

  private routes() {
    this.router.post("/api/auth/login", this.#loginController.login);
  }
}

export default LoginRoutes;
