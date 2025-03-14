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

export const employerProcedure = createTRPCRouter({
  getEmployerById: baseProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const employerId = input;
      const response = await fetch(`${SERVICE_URL}/employer/${employerId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch employer data",
      });
    }
  }),
});
