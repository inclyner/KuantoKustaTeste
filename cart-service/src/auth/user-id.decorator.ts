import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const h = (req.headers || {}) as Record<string, string | string[] | undefined>;
  const headerId =
    (h['x-user-id'] as string) ||
    (h['user-id'] as string) ||
    (h['userid'] as string) ||
    (h['userId'] as string);
  return req.user?.sub ?? req.user?.id ?? headerId;
});
