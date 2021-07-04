import { HttpException, HttpStatus } from "@nestjs/common";

export class BoardNotFoundError extends HttpException {
    constructor() {
        super("Board not found", HttpStatus.NOT_FOUND)
    }
}
