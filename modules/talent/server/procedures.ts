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

export const talentProcedure = createTRPCRouter({
  getWorkerById: baseProcedure.input(z.string()).query(async ({ input }) => {
    try {
      const talentId = input;
      const response = await fetch(`${SERVICE_URL}/worker/${talentId}`, {
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

  getPortfolioByWorkerId: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const workerId = input;
        const token = await getTokenFromCookie();
        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to view this portfolio",
          });
        }
        const response = await fetch(`${SERVICE_URL}/portfolio/${workerId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new TRPCError({
            code: response.status === 404 ? "NOT_FOUND" : "BAD_REQUEST",
            message: errorData?.message || "Failed to fetch worker's portfolio",
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
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }),

  createPortfolio: protectedProcedure
    .input(
      z.object({
        workerId: z.string(),
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const token = await getTokenFromCookie();

        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to create a portfolio",
          });
        }

        const response = await fetch(`${SERVICE_URL}/portfolio`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            workerId: input.workerId,
            title: input.title,
            description: input.description,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: errorData?.message || "Failed to create portfolio",
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
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }),

  createPortfolioItem: protectedProcedure
    .input(
      z.object({
        portfolioId: z.string(),
        title: z.string(),
        description: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        tagIds: z.array(z.string()).optional(),
        displayOnProfile: z.boolean().optional(),
        disableComments: z.boolean().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const token = await getTokenFromCookie();
        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to create a portfolio item",
          });
        }

        const response = await fetch(
          `${SERVICE_URL}/portfolio/${input.portfolioId}/portfolio-items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: input.title,
              description: input.description,
              startDate: input.startDate,
              endDate: input.endDate,
              tagIds: input.tagIds || [],
              displayOnProfile: input.displayOnProfile !== undefined ? input.displayOnProfile : true,
              disableComments: input.disableComments !== undefined ? input.disableComments : false,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: errorData?.message || "Failed to create portfolio item",
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
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }),

  addAttachmentsToPortfolioItem: protectedProcedure
    .input(
      z.object({
        portfolioId: z.string(),
        portfolioItemId: z.string(),
        attachments: z.array(z.instanceof(File)),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to add attachments",
          });
        }
        const formData = new FormData();
        input.attachments.forEach((file) => {
          formData.append("attachments", file);
        });

        const response = await fetch(
          `${SERVICE_URL}/portfolio/${input.portfolioId}/portfolio-items/${input.portfolioItemId}/attachments`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              errorData?.message ||
              "Failed to add attachments to portfolio item",
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
          message:
            error instanceof Error
              ? error.message
              : "An unknown error occurred",
        });
      }
    }),
});
