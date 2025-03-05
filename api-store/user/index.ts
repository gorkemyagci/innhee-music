import { api } from "@/api-store/index";

const basePath = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export async function getMe(values: { nickname: string }) {
  const { nickname } = values;
  return api({
    path: `${basePath}/me`,
    method: "PUT",
    data: {
      nickname,
    },
  });
}
