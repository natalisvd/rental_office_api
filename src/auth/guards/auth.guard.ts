import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { config } from 'src/config';

import { Request } from 'express';

import { IS_PUBLIC_KEY } from 'src/shared/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    readonly jwtService: JwtService,
    readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const isRefreshRoute = request.url === '/auth/refresh';
      const secret = isRefreshRoute
        ? config.SECRET_REFRESH
        : config.SECRET_ACCESS;

      const payload = await this.jwtService.verify(token, { secret });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
