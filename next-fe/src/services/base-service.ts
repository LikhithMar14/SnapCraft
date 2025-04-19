import axios from "axios";
import { auth } from "@/auth";

const API_URL = process.env.API_URL || "http://localhost:8000"

export async function fetchWithAuth(endpoint: string, options: any = {}) {
    const session = await auth();
    if (!session) {
        throw new Error("Unauthorized");
    }
    const token = session.user?.id;
    const headers = {
        "Authorization": `Bearer ${token}`,
        ...options.headers
    }
    try {
        const response = await axios({
            url: `${API_URL}${endpoint}`,
            data: options.body,
            headers,
            method: options.method || "GET",
            params: options.params || {}
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}