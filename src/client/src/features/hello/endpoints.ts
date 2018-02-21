import { get, post } from "utils/api";

interface Value {
  value: string;
}

export const getValue = () => get<Value>("/api/value");

interface Result {
  success: boolean;
}

export const postValue = (value: string) =>
  post<Result>("/api/value", {
    value
  });
