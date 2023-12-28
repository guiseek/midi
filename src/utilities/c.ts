export function c<K extends keyof HTMLElementTagNameMap>(
  name: K,
  attrs: Partial<HTMLElementTagNameMap[K]> = {},
  ...children: Element[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(name);
  el.append(...children);
  return Object.assign(el, attrs);
}
