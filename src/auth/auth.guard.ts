import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidateRequest } from './auth.validate-request';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly validateRequest: ValidateRequest) {}

    canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const result = this.validateRequest.validate(request);
    if (result) {
        return true;
    }
    throw new UnauthorizedException();
  }
}
