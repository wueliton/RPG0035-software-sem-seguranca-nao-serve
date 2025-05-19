import { Router } from "express";
import UserController from "../controllers/User.controller";
import ProfileMiddleware from "../middleware/profile.middleware";
import loggedMiddleware from "../middleware/logged.middleware";

class UserRoutes {
  #userController: UserController;
  #profileMiddleware: ProfileMiddleware;
  router = Router();

  constructor(
    userController: UserController,
    profileMiddleware: ProfileMiddleware
  ) {
    this.#userController = userController;
    this.#profileMiddleware = profileMiddleware;
    this.routes();
  }

  private routes() {
    this.router.get(
      "/api/users/my",
      loggedMiddleware,
      this.#profileMiddleware.user,
      this.#userController.getUserData
    );
    this.router.get(
      "/api/users",
      loggedMiddleware,
      this.#profileMiddleware.admin,
      this.#userController.getUsers
    );
  }
}

export default UserRoutes;
