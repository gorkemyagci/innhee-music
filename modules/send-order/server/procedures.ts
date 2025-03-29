import { getTokenFromCookie } from "@/app/server/action";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const SERVICE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://music-upwork-project-production.up.railway.app";

const milestoneSchema = z.object({
  contractId: z.string(),
  amount: z.number(),
  title: z.string(),
  amountCurrency: z.string(),
  description: z.string(),
  deadline: z.string(),
});

export const contractProcedures = createTRPCRouter({
  getUserContracts: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/user?userId=${input.userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user contracts",
        });
      }

      return response.json();
    }),
  createMilestone: protectedProcedure
    .input(milestoneSchema)
    .mutation(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/contract/milestone/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create milestone",
        });
      }

      return response.json();
    }),
  getMilestone: protectedProcedure
    .input(z.object({ milestoneId: z.string() }))
    .query(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/milestone/${input.milestoneId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch milestone",
        });
      }

      return response.json();
    }),
  deleteMilestone: protectedProcedure
    .input(z.object({ milestoneId: z.string() }))
    .mutation(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/milestone/${input.milestoneId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete milestone",
        });
      }
      return response.json();
    }),
  submitFile: protectedProcedure
    .input(
      z.object({
        contractId: z.string(),
        attachments: z.array(z.object({
          name: z.string(),
          size: z.number(),
          type: z.string(),
          file: z.any()
        }))
      })
    )
    .mutation(async ({ input }) => {
      const token = await getTokenFromCookie();
      const formData = new FormData();

      input.attachments.forEach((attachment) => {
        formData.append("attachments", attachment.file);
      });

      const response = await fetch(
        `${SERVICE_URL}/contract/${input.contractId}/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to submit files",
        });
      }

      return response.json();
    }),
  getContractDetails: protectedProcedure
    .input(z.object({ contractId: z.string() }))
    .query(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/${input.contractId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch contract details",
        });
      }

      return response.json();
    }),
  confirmContractPayment: protectedProcedure
    .input(z.object({ contractId: z.string() }))
    .mutation(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/${input.contractId}/confirm-payment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to confirm contract payment",
        });
      }

      return response.json();
    }),
  confirmMilestonePayment: protectedProcedure
    .input(
      z.object({
        contractId: z.string(),
        milestoneId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const token = await getTokenFromCookie();
      const response = await fetch(
        `${SERVICE_URL}/contract/${input.contractId}/milestone/${input.milestoneId}/confirm-payment`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to confirm milestone payment",
        });
      }

      return response.json();
    }),
});
