import express from "express";
import dotenv from "dotenv";
import LoginRoutes from "./routes/login.routes";
import UserService from "./services/User.service";
import LoginController from "./controllers/Login.controller";
import UserRoutes from "./routes/user.routes";
import UserController from "./controllers/User.controller";
import ProfileMiddleware from "./middleware/profile.middleware";
import ContractsController from "./controllers/Contracts.controller";
import ContractsService from "./services/Contacts.service";
import ContractsRoutes from "./routes/contracts.routes";

dotenv.config();

const app = express();

const userService = new UserService();
const loginController = new LoginController(userService);
const loginRoutes = new LoginRoutes(loginController).router;

const profileMiddleware = new ProfileMiddleware(userService);
const userController = new UserController(userService);
const userRoutes = new UserRoutes(userController, profileMiddleware).router;

const contractsService = new ContractsService();
const contractsController = new ContractsController(contractsService);
const contractsRoutes = new ContractsRoutes(
  contractsController,
  profileMiddleware
).router;

app.use(express.json());
app.use(loginRoutes);
app.use(userRoutes);
app.use(contractsRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
