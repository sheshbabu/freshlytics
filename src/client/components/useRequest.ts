import React from "react";
import request, { HttpMethod } from "../libs/request";

export default function useRequest<T>(path: string, method?: HttpMethod, body?: any): [T | null, boolean, Function] {
  const [response, setResponse] = React.useState<T | null>(null);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [shouldRefetch, setShouldRefetch] = React.useState<boolean>(false);

  React.useEffect(() => {
    request(path, method, body)
      .then((res: T) => setResponse(res))
      .finally(() => setLoading(false));
  }, [path, shouldRefetch]);

  function refetch() {
    setShouldRefetch(prevShouldRefetch => !prevShouldRefetch);
  }

  return [response, isLoading, refetch];
}
