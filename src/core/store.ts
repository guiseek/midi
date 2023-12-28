import { Callback } from "../interfaces";

export class Store<T extends object> extends Map {
  #subscribers: Callback<T[keyof T]>[] = [];

  constructor(value: T) {
    super();
    const entries = Object.entries(value);
    for (const [key, value] of entries) {
      super.set(key, value);
    }
  }

  subscribe(fn: Callback<T[keyof T]>) {
    this.#subscribers.push(fn);
  }

  get<K extends keyof T>(key: K) {
    return super.get(key) as T[K];
  }

  set<K extends keyof T>(key: K, value: T[K]) {
    super.set(key, value);
    for (const fn of this.#subscribers) fn(value);
    return this;
  }
}
