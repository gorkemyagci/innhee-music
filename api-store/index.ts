import {
    getTokenFromCookie,
  } from "@/app/server/action";
import { RecordType } from "@/lib/types";
  import { removeUndefined } from "@/lib/utils/modify";
  
  export const SERVICE_URL = process.env.NEXT_PUBLIC_API_URL;
  
  export class CustomError extends Error {
    public info: any;
  
    constructor(message: string, info?: any) {
      super(message);
      this.name = "CustomError";
      this.info = info || {};
    }
  }
  
  interface API_PROPS {
    path: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    contentType?:
      | "application/json"
      | "application/x-www-form-urlencoded"
      | "multipart/form-data"
      | "text/plain";
    data?: RecordType | undefined;
    params?: Record<string, any> | URLSearchParams | undefined;
    token?: string;
    tags?: string[];
  }
  
  export async function api({
    path,
    method = "GET",
    contentType = "application/json",
    data = undefined,
    params = {},
    token,
    tags,
  }: API_PROPS) {
    const jwtToken = token || (await getTokenFromCookie());
  
    const customParams = Object.keys(removeUndefined(params))?.length
      ? `?${new URLSearchParams(params)}`
      : "";
  
    const response = await fetch(`${SERVICE_URL}${path}` + customParams, {
      method,
      headers: {
        "Content-Type": contentType,
        Authorization: jwtToken ? `Bearer ${jwtToken}` : "",
      },
      body: JSON.stringify(data),
      next: { tags },
    });
  
    if (response.status === 204) return { succeess: true };
    if (response.status === 403 || response.status === 401)
      throw new CustomError("No permission", {
        status: response.status,
      });
    let responseData: RecordType | RecordType[] | any = await response.json();
    if (!response.ok) {
      throw new CustomError(responseData.message, {
        status: response.status,
        data: responseData,
      });
    }
  
    return responseData;
  }