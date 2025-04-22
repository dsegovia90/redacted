export interface Properties {
  /**
   * [redactedOnJsonStringify = true] - Whether the data should be
   * safe to stringify with JSON.stringify(), use with care since a lot of loggers
   * use this JSON.stringify().
   */
  redactedOnJsonStringify?: boolean;
}

/**
 * MutableRedacted is a class that wraps a value and provides methods to mutate and expose the value.
 * It can be used to safely expose sensitive data without exposing the entire object.
 *
 * @param data - The data to be redacted.
 * @param properties - Optional properties to configure the behavior of the redacted object.
 *
 * @example
 * const mutableRedacted = new MutableRedacted("secret");
 * console.log(mutableRedacted.exposeSecret()); // "secret"
 * mutableRedacted.mutateSecret("newSecret");
 * console.log(mutableRedacted.exposeSecret()); // "newSecret"
 *
 * @example
 * const mutableRedacted = new MutableRedacted("secret", { redactedOnJsonStringify: false });
 * console.log(JSON.stringify(mutableRedacted)); // "secret"
 *
 * @example
 * const mutableRedacted = new MutableRedacted("secret"); // <-- secure by default!
 * console.log(JSON.stringify(mutableRedacted)); // "{}"
 */
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

/**
 * Redacted is a class that wraps a value and provides methods to expose the value.
 * It can be used to safely expose sensitive data without exposing the entire object.
 *
 * @param data - The data to be redacted.
 * @param properties - Optional properties to configure the behavior of the redacted object.
 *
 * @example
 * const redactedValue = new Redacted("secret");
 * console.log(redactedValue)
 * console.log(redactedValue.exposeSecret()); // "secret"
 *
 * @example
 * const redactedValue = new Redacted("secret", { redactedOnJsonStringify: false });
 * console.log(JSON.stringify(redactedValue)); // "secret"
 *
 * @example
 * const redactedValue = new Redacted("secret"); // <-- secure by default!
 * console.log(JSON.stringify(redactedValue)); // "{}"
 */
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
