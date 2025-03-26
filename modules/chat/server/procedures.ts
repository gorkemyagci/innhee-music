import { getTokenFromCookie } from "@/app/server/action";
import {
  protectedProcedure,
  createTRPCRouter,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const SERVICE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://music-upwork-project-production.up.railway.app";

const WS_URL = "https://inhee-chat-production.up.railway.app/chat";

export const chatProcedure = createTRPCRouter({
  chatRooms: protectedProcedure.query(async () => {
    try {
      const token = await getTokenFromCookie();
      const response = await fetch(`${SERVICE_URL}/chat/rooms`, {
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
        message: "Failed to fetch chat rooms",
      });
    }
  }),

  createRoom: protectedProcedure
    .input(
      z.object({
        userIds: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const response = await fetch(`${SERVICE_URL}/chat/rooms`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(input),
        });
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create chat room",
        });
      }
    }),
  getRoomMessages: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const response = await fetch(
          `${SERVICE_URL}/chat/rooms/${input.roomId}/messages`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch room messages",
        });
      }
    }),
  getRoomContracts: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const response = await fetch(
          `${SERVICE_URL}/chat/rooms/${input.roomId}/contracts`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch room contracts",
        });
      }
    }),

  addAttachments: protectedProcedure
    .input(
      z.object({
        attachments: z.array(z.instanceof(File))
      })
    )
    .mutation(async ({ input }) => {
      try {
        const token = await getTokenFromCookie();
        const formData = new FormData();
      
        input.attachments.forEach((file) => {
          formData.append('attachments', file);
        });

        const response = await fetch(`${SERVICE_URL}/chat/attachments`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload attachments",
        });
      }
    }),
});
