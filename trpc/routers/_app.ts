import { jobPostsProcedures } from '@/modules/job-posting/server/procedures';
import { createTRPCRouter } from '../init';
import { authProcedures } from '@/modules/auth/server/procedures';
export const appRouter = createTRPCRouter({
  auth: authProcedures,
  jobPosting: jobPostsProcedures,
});

export type AppRouter = typeof appRouter;
