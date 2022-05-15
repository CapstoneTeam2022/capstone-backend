import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import passport from "passport";
@Injectable()
export class AuthenticatedGuard implements CanActivate{
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        return request.isAuthenticated;
    }
}