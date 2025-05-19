import RequestStatus from "./request-status";

class AppError {
  public readonly message: string;
  public readonly statusCode: RequestStatus;

  constructor(message: string, statusCode = RequestStatus.BAD_REQUEST) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
