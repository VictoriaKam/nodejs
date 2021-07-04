import { HttpException, HttpStatus } from "@nestjs/common";

export class TaskNotFoundError extends HttpException {
    constructor() {
        super("Task not found", HttpStatus.NOT_FOUND)
    }
}
