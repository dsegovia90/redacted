export class Redacted<T> {
  #data: T;
  constructor(data: T) {
    this.#data = data;
  }

  exposeSecret(): T {
    return this.#data;
  }
}

export class MutableRedacted<T> {
  #data: T;

  constructor(data: T) {
    this.#data = data;
  }

  exposeSecret(): T {
    return this.#data;
  }

  mutateSecret(newData: T): void {
    this.#data = newData;
  }
}

export * from "./zod-v3.ts";
