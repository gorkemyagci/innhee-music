import { getTokenFromCookie } from "@/app/server/action";
import {
    baseProcedure,
    createTRPCRouter,
    protectedProcedure,
  } from "@/trpc/init";
  import { TRPCError } from "@trpc/server";
  import { z } from "zod";
  
  const SERVICE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://music-upwork-project-production.up.railway.app";
  
  export const jobDetailProcedure = createTRPCRouter({
    createJobApplication: protectedProcedure
      .input(
        z.object({
          jobPostId: z.string(),
          description: z.string(),
          amount: z.number(),
          messagingSettings: z.boolean(),
          matchingScore: z.boolean(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        try {
          const token = await getTokenFromCookie();
          const response = await fetch(`${SERVICE_URL}/job-appliement`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              jobPostId: input.jobPostId,
              description: input.description,
              amount: input.amount,
              messagingSettings: input.messagingSettings,
              matchingScore: input.matchingScore,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: errorData?.message || "Failed to create job application",
            });
          }

          const data = await response.json();
          return data;
        } catch (error) {
          if (error instanceof TRPCError) {
            throw error;
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error instanceof Error ? error.message : "An unknown error occurred",
          });
        }
      }),
  });
  