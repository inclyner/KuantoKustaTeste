import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class DevAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.header('x-user-id') || '00000000-0000-0000-0000-000000000001';
    req.user = { sub: userId };
    return true;
  }
}
