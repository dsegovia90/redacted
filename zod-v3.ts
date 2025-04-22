import type z from "zod";
import { MutableRedacted, type Properties, Redacted } from "./mod.ts";

/**
 * Creates a Zod schema that redacts the value.
 */
export const redactedZodV3 = <T>(
  zodType: z.ZodType<T>,
  properties: Properties,
): z.ZodEffects<z.ZodType<T, z.ZodTypeDef, T>, Redacted<T>, T> => {
  return zodType.transform<Redacted<T>>((value) => {
    zodType.parse(value);
    return new Redacted(value, properties);
  });
};

/**
 * Creates a Zod schema that mutably redacts the value. Allows for mutable access to the redacted value.
 */
export const mutableRedactedZodV3 = <T>(
  zodType: z.ZodType<T>,
  properties: Properties,
): z.ZodEffects<z.ZodType<T, z.ZodTypeDef, T>, MutableRedacted<T>, T> => {
  return zodType.transform<MutableRedacted<T>>((value) => {
    zodType.parse(value);
    return new MutableRedacted(value, properties);
  });
};
