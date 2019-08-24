export type HttpMethod = "DELETE" | "GET" | "HEAD" | "OPTIONS" | "POST" | "PUT";

export default async function request(path: string, method: HttpMethod = "GET", body?: any) {
  let headers = {};

  if (body instanceof FormData === false) {
    headers = { Accept: "application/json", "Content-Type": "application/json" };
    body = JSON.stringify(body);
  }

  const response = await fetch(path, { method, body, headers, credentials: "include" });

  const contentType = response.headers.get("Content-Type") || "";
  let responseBody: any = {};

  if (response.status === 401) {
    localStorage.removeItem("isAuthenticated");
    location.replace("/login");
  }

  if (contentType.includes("application/json")) {
    responseBody = await response.json();
  }

  if (!response.ok) {
    throw responseBody;
  }

  return responseBody;
}
