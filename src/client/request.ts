export default function request(path: string, method: string = "GET", body: any = {}) {
  const host = getHost();
  const headers = {
    "Content-Type": "application/json"
  };

  return fetch(`${host}${path}`, { method, body, headers }).then(res => res.json());
}

function getHost() {
  if (location.hostname === "localhost") {
    return "http://localhost:3001";
  }

  return "";
}
