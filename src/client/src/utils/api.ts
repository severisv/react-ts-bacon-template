type Method = "GET" | "PUT" | "POST";

function call<T>(method: Method, url: string, payload: any): Promise<T> {
  return fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(payload)
  }).then(response => {
    const contentType = response.headers.get("content-type");
    if (response.status >= 200 && response.status < 300) {
      if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
      }
      return response.text();
    }
    return response
      .json()
      .then(result =>
        Promise.reject({ status: response.status, payload: result })
      );
  });
}

export function post<T>(url: string, payload: any) {
  return call<T>("POST", url, payload);
}
export function put<T>(url: string, payload: any) {
  return call<T>("PUT", url, payload);
}

export function get<T>(url: string): Promise<T> {
  return fetch(url, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  }).then(result => result.json());
}
