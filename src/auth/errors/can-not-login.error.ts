import { HttpException, HttpStatus } from "@nestjs/common";

export class CanNotLoginError extends HttpException {
    constructor() {
        super("Can not login", HttpStatus.NOT_FOUND)
    }
}
