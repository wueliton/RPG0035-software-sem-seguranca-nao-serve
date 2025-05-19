import { Router } from "express";
import ContractsController from "../controllers/Contracts.controller";
import loggedMiddleware from "../middleware/logged.middleware";
import ProfileMiddleware from "../middleware/profile.middleware";

class ContractsRoutes {
  #contractsController: ContractsController;
  #profileMiddleware: ProfileMiddleware;
  router = Router();

  constructor(
    contractsController: ContractsController,
    profileMiddleware: ProfileMiddleware
  ) {
    this.#contractsController = contractsController;
    this.#profileMiddleware = profileMiddleware;
    this.routes();
  }

  private routes() {
    this.router.get(
      "/api/contracts/:empresa/:inicio",
      loggedMiddleware,
      this.#profileMiddleware.admin,
      this.#contractsController.getContracts
    );
  }
}

export default ContractsRoutes;
