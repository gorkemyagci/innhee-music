import { jobPostsProcedures } from '@/modules/job-posting/server/procedures';
import { createTRPCRouter } from '../init';
import { authProcedures } from '@/modules/auth/server/procedures';
import { userProcedures } from '@/modules/settings-modal/server/procedures';
import { talentProcedure } from '@/modules/talent/server/procedures';
import { employerProcedure } from '@/modules/buyer/server/procedures';
import { dashboardProcedure } from '@/modules/dashboard/server/procedures';
import { jobDetailProcedure } from '@/modules/job-detail/server/procedures';
import { chatProcedure } from '@/modules/chat/server/procedures';

export const appRouter = createTRPCRouter({
  auth: authProcedures,
  jobPosting: jobPostsProcedures,
  user: userProcedures,
  talent: talentProcedure,
  employer: employerProcedure,
  dashboard: dashboardProcedure,
  jobDetail: jobDetailProcedure,
  chat: chatProcedure,
});

export type AppRouter = typeof appRouter;
