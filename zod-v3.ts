import type z from "zod";
import { MutableRedacted, Redacted } from "./mod.ts";

export const redactedZodV3 = <T>(
  zodType: z.ZodType<T>,
): z.ZodEffects<z.ZodType<T, z.ZodTypeDef, T>, Redacted<T>, T> => {
  return zodType.transform<Redacted<T>>((value) => {
    zodType.parse(value);
    return new Redacted(value);
  });
};

export const mutableRedactedZodV3 = <T>(
  zodType: z.ZodType<T>,
): z.ZodEffects<z.ZodType<T, z.ZodTypeDef, T>, MutableRedacted<T>, T> => {
  return zodType.transform<MutableRedacted<T>>((value) => {
    zodType.parse(value);
    return new MutableRedacted(value);
  });
};
