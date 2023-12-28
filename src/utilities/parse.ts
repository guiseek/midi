export function parse<T>(value: string): T {
  return JSON.parse(value ?? "{}");
}
