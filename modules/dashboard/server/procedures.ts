import {
  baseProcedure,
  createTRPCRouter,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";

const SERVICE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://music-upwork-project-production.up.railway.app";

export const dashboardProcedure = createTRPCRouter({
  getAllWorkers: baseProcedure.query(async () => {
    try {
      const response = await fetch(`${SERVICE_URL}/worker`, {
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
        message: "Failed to fetch worker data",
      });
    }
  }),
  
  getAllTags: baseProcedure.query(async () => {
    try {
      const response = await fetch(`${SERVICE_URL}/tag`, {
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
        message: "Failed to fetch tag data",
      });
    }
  }),
});
