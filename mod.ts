import type { z } from "zod";

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

export const redactedZod = <T>(zodType: z.ZodType<T>) => {
  return zodType.transform<Redacted<T>>((value) => {
    zodType.parse(value);
    return new Redacted(value);
  });
};

export const mutableRedactedZod = <T>(zodType: z.ZodType<T>) => {
  return zodType.transform<MutableRedacted<T>>((value) => {
    zodType.parse(value);
    return new MutableRedacted(value);
  });
};
