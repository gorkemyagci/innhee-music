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

export const jobPostsProcedures = createTRPCRouter({
  createJob: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
        detail: z.string(),
        salary: z.number(),
        salaryCurrency: z.string(),
        deadline: z.string(),
        budgetsActive: z.boolean(),
        usage: z.string(),
        privacy: z.string(),
        skillLevelIds: z.array(z.string()),
        candidateSourceIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const {
          subject,
          detail,
          salary,
          salaryCurrency,
          deadline,
          budgetsActive,
          usage,
          privacy,
          skillLevelIds,
          candidateSourceIds,
        } = input;
        const response = await fetch(`${SERVICE_URL}/job-post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            subject,
            detail,
            salary,
            salaryCurrency,
            deadline,
            budgetsActive,
            usage,
            privacy,
            skillLevelIds,
            candidateSourceIds,
          }),
        });
        const data = await response.json();
        if (!data) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: data.message,
          });
        }
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to create job",
        });
      }
    }),
  getMyJobPosts: protectedProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/job-post/my-posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorData.message || "Failed to fetch job posts",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to fetch job posts",
      });
    }
  }),
  getAllSkillLevels: protectedProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/skill-level`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorData.message || "Failed to fetch skill levels",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch skill levels",
      });
    }
  }),
  getSkills: baseProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/skill`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorData.message || "Failed to fetch skills",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error ? error.message : "Failed to fetch skills",
      });
    }
  }),
  getAllCandidateSources: protectedProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/candidate-source`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: errorData.message || "Failed to fetch candidate sources",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch candidate sources",
      });
    }
  }),
  getJobPosts: baseProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/job-post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to get user information",
      });
    }
  }),
  getJobPostById: baseProcedure.input(z.object({ 
    id: z.string(), 
    userId: z.string().optional() 
  })).query(async ({ input }) => {
    try {
      const token = await getTokenFromCookie();
      const {id, userId} = input;
      const url = userId 
        ? `${SERVICE_URL}/job-post/${id}?userId=${userId}`
        : `${SERVICE_URL}/job-post/${id}`;
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message:
          error instanceof Error
            ? error.message
            : "Failed to get job post by id",
      });
    }
  }),
  addAttachmentsToJobPost: protectedProcedure
    .input(
      z.object({
        jobPostId: z.string(),
        attachments: z.array(z.any())
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { jobPostId, attachments } = input;
        const token = ctx.token;
        
        if (!token) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to add attachments",
          });
        }

        const formData = new FormData();
        
        attachments.forEach((attachment, index) => {
          formData.append('attachments', attachment);
        });
        
        const response = await fetch(`${SERVICE_URL}/job-post/${jobPostId}/attachments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: errorData.message || "Failed to add attachments to job post",
          });
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to add attachments to job post",
        });
      }
    }),
});
