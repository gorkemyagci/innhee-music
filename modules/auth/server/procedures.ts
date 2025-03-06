import { SERVICE_URL } from "@/api-store";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const authProcedures = createTRPCRouter({
  login: baseProcedure
    .input(
      z.object({
        account: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { account, password } = input;
        const isEmail = account.includes("@");
        const requestBody = isEmail
          ? { email: account, password }
          : { phone: account, password };
        const response = await fetch(`${SERVICE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        const data = await response.json();
        if (!data.access_token) {
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
            error instanceof Error ? error.message : "Failed to authenticate",
        });
      }
    }),
  send_otp: baseProcedure
    .input(
      z.object({
        account: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { account } = input;
        const isEmail = account.includes("@");
        const requestBody = isEmail ? { email: account } : { phone: account };

        const response = await fetch(`${SERVICE_URL}/auth/send-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to send OTP",
        });
      }
    }),
  resetPassword: baseProcedure
    .input(
      z.object({
        email: z.string(),
        code: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email, code, password } = input;
        const response = await fetch(`${SERVICE_URL}/auth/reset-password`, {
          method: "POST",
          body: JSON.stringify({ email, code, password }),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to reset password",
        });
      }
    }),
  updateEmail: baseProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { email } = input;
        const response = await fetch(`${SERVICE_URL}/auth/update-email`, {
          method: "PUT",
          body: JSON.stringify({ email }),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to update email",
        });
      }
    }),
  sendForgotPasswordOtp: baseProcedure
    .input(
      z.object({
        account: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { account } = input;
        const isEmail = account.includes("@");
        const requestBody = isEmail ? { email: account } : { phone: account };
        const response = await fetch(
          `${SERVICE_URL}/auth/forgot-password/send-otp`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to send forgot password OTP",
        });
      }
    }),
  verifyOtp: baseProcedure
    .input(
      z.object({
        code: z.string(),
        account: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { code, account } = input;
        const isEmail = account.includes("@");
        const body = isEmail
          ? { email: account, code }
          : { phone: account, code };
        const response = await fetch(`${SERVICE_URL}/auth/verify-otp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to verify OTP",
        });
      }
    }),
  verifyForgotPasswordOtp: baseProcedure
    .input(
      z.object({
        code: z.string(),
        password: z.string(),
        account: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { code, password, account } = input;
        const isEmail = account.includes("@");
        const body = isEmail
          ? { email: account, code, password }
          : { phone: account, code, password };
        const response = await fetch(
          `${SERVICE_URL}/auth/forgot-password/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "Failed to verify forgot password OTP",
        });
      }
    }),
  updatePhone: baseProcedure
    .input(
      z.object({
        phone: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { phone } = input;
        const response = await fetch(`${SERVICE_URL}/auth/update-phone`, {
          method: "PUT",
          body: JSON.stringify({ phone }),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to update phone",
        });
      }
    }),
  verifyEmail: baseProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { code } = input;
        const response = await fetch(`${SERVICE_URL}/auth/email/verify`, {
          method: "POST",
          body: JSON.stringify({ code }),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to verify email",
        });
      }
    }),
  verifyPhone: baseProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { code } = input;
        const response = await fetch(`${SERVICE_URL}/auth/phone/verify`, {
          method: "POST",
          body: JSON.stringify({ code }),
        });
        return response;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error ? error.message : "Failed to verify phone",
        });
      }
    }),
  getMe: protectedProcedure.query(async () => {
    try {
      const response = await fetch(`${SERVICE_URL}/auth/me`, {
        method: "GET",
      });
      return response;
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
});
