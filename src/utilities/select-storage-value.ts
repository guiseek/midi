import { parse } from "./parse";

export function selectStorageValue<T>(selectedIndex: number) {
  const values = Object.values(localStorage);
  const value = values[selectedIndex];
  return parse<T>(value);
}
