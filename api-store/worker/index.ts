import { api } from "@/api-store/index";

const basePath = `${process.env.NEXT_PUBLIC_API_URL}/worker`;

export async function getMyWorkerProfile() {
    return api({
        path: `${basePath}/me`,
        method: "GET"
    });
}

export async function updateMyWorkerProfile(values: { position: string, salary: number }) {
    return api({
        path: `${basePath}/me`,
        method: "PUT",
        data: values
    });
}

export async function getAllWorkers() {
    return api({
        path: basePath,
        method: "GET"
    });
}

export async function getWorkerById(id: string) {
    return api({
        path: `${basePath}/${id}`,
        method: "GET"
    });
}

export async function updateWorkerById(id: string, values: { position: string, salary: number }) {
    return api({
        path: `${basePath}/${id}`,
        method: "PUT",
        data: values
    });
}
