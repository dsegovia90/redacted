interface Properties {
  /**
   * [redactedOnJsonStringify = true] - Whether the data should be
   * safe to stringify with JSON.stringify(), use with care since a lot of loggers
   * use this JSON.stringify().
   */
  redactedOnJsonStringify?: boolean;
}

export class MutableRedacted<T> {
  #data: T;
  #jsonStringifySafe: boolean;

  constructor(data: T, properties?: Properties) {
    this.#data = data;
    this.#jsonStringifySafe = properties?.redactedOnJsonStringify ?? true;
  }

  exposeSecret(): T {
    return this.#data;
  }

  mutateSecret(newData: T): void {
    this.#data = newData;
  }

  toJSON(): T | typeof this {
    if (this.#jsonStringifySafe) {
      return this;
    }
    return this.#data;
  }
}

export class Redacted<T> {
  #data: T;
  #jsonStringifySafe: boolean;

  constructor(data: T, properties?: Properties) {
    this.#data = data;
    this.#jsonStringifySafe = properties?.redactedOnJsonStringify ?? true;
  }

  exposeSecret(): T {
    return this.#data;
  }

  toJSON(): T | typeof this {
    if (this.#jsonStringifySafe) {
      return this;
    }
    return this.#data;
  }
}

export * from "./zod-v3.ts";
