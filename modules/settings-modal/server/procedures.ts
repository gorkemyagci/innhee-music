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

export const userProcedures = createTRPCRouter({
  update: protectedProcedure
    .input(
      z.object({
        nickname: z.string().optional(),
        about: z.string().optional(),
      }).refine(data => data.nickname !== undefined || data.about !== undefined, {
        message: "At least one of nickname or about must be provided"
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const requestBody: { nickname?: string; about?: string } = {};
        
        if (input.nickname !== undefined) {
          requestBody.nickname = input.nickname;
        }
        
        if (input.about !== undefined) {
          requestBody.about = input.about;
        }
        
        if (Object.keys(requestBody).length === 0) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "No valid fields to update"
          });
        }
        
        const response = await fetch(`${SERVICE_URL}/user/me`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: errorData.message || "Failed to update user",
          });
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to authenticate",
        });
      }
    }),
});
