import { createTRPCRouter } from '../init';
import { authProcedures } from '@/modules/auth/server/procedures';
export const appRouter = createTRPCRouter({
  auth: authProcedures,
});

export type AppRouter = typeof appRouter;
