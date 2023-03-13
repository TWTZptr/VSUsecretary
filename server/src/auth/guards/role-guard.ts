import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UserPayload } from '../types/user-payload.type';
import { GLOBAL_ACCESS_ROLES } from '../constants';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new ForbiddenException();
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new ForbiddenException();
    }

    let userPayload: UserPayload;

    try {
      userPayload = this.jwtService.verify(token);
    } catch (err) {
      throw new ForbiddenException();
    }

    if (!requiredRoles) {
      return true;
    }

    req.user = userPayload;
    const userRole = userPayload.role.name;
    return (
      GLOBAL_ACCESS_ROLES.includes(userRole) || requiredRoles.includes(userRole)
    );
  }
}
