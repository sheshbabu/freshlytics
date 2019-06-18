export default async function request(path: string, method: string = "GET", body?: any) {
  const host = getHost();
  const headers = {
    "Content-Type": "application/json"
  };

  const response = await fetch(`${host}${path}`, { method, body, headers, credentials: "include" });
  const responseBody = await response.json();

  if (!response.ok) {
    throw responseBody;
  }

  return responseBody;
}

function getHost() {
  if (location.hostname === "localhost") {
    return "http://localhost:3001";
  }

  return "";
}
