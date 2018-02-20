import { Reducer } from "repatch";
import { Store } from "Store";
export { Reducer };

export function combine<T>(key: string, reducer: Reducer<T>) {
  return (store: Store) => ({
    ...store,
    [key]: reducer((store as any)[key])
  });
}
