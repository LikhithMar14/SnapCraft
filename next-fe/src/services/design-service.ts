
import { fetchWithAuth } from "./base-service";

export async function getUserDesigns() {
  return fetchWithAuth("/v1/design", {
    method: "GET",
  });
}
export async function getUserDesignById(id: string) {
  return fetchWithAuth(`/v1/design/${id}`, {
    method: "GET",
  });
}
export async function saveDesign(designData: any, designId = null) {
  return fetchWithAuth("/v1/design", {
    method: "POST",
    body: {
      ...designData,
      designId,
    },
  });
}
export async function deleteDesign(designId: string) {
  return fetchWithAuth(`/v1/design/${designId}`, {
    method: "DELETE",
  });
}
