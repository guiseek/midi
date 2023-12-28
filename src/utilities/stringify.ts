export function stringify<T>(value: T) {
  return JSON.stringify(value ?? []);
}
