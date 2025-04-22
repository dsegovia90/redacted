import { assertEquals, assertThrows } from "@std/assert";
import { assertNotEquals } from "@std/assert/not-equals";
import { z } from "zod";
import {
  MutableRedacted,
  mutableRedactedZod,
  Redacted,
  redactedZod,
} from "../mod.ts";

const SECRET_EMAIL = "secret.email@example.com";

Deno.test(function redactedZodTest() {
  const json = {
    email: SECRET_EMAIL,
    name: "John Doe",
  };

  const RedactedSchema = z.preprocess((val) => {
    return new Redacted(val);
  }, z.instanceof(Redacted));

  const schema = z.object({
    email: RedactedSchema,
    name: z.string().min(2).max(100),
  });

  const parsed = schema.parse(json);

  assertNotEquals(typeof parsed.email, "string");
  assertEquals(parsed.email.exposeSecret(), SECRET_EMAIL);
});

Deno.test(function mutableRedactedZodTest() {
  const json = {
    email: SECRET_EMAIL,
    name: "John Doe",
  };

  const RedactedSchema = z.preprocess((val) => {
    return new MutableRedacted(val);
  }, z.instanceof(MutableRedacted));

  const schema = z.object({
    email: RedactedSchema,
    name: z.string().min(2).max(100),
  });

  const parsed = schema.parse(json);

  assertNotEquals(typeof parsed.email, "string");
  assertEquals(parsed.email.exposeSecret(), SECRET_EMAIL);

  parsed.email.mutateSecret("new.email@example.com");
  assertEquals(parsed.email.exposeSecret(), "new.email@example.com");
});

Deno.test(function redactedZodTypedTest() {
  const json = {
    email: SECRET_EMAIL,
    secretAge: 25,
    name: "John Doe",
  };

  const schema = z.object({
    email: redactedZod(z.string().email()),
    secretAge: redactedZod(z.number().min(1).max(100)),
    name: z.string().min(2).max(100),
  });

  const parsed = schema.parse(json);

  assertNotEquals(typeof parsed.email, "string");
  assertEquals(parsed.email.exposeSecret(), SECRET_EMAIL);
});

Deno.test(function redactedZodTypedFailTest() {
  const failJson = {
    email: SECRET_EMAIL,
    secretAge: 101,
    name: "John Doe",
  };

  const schema = z.object({
    email: redactedZod(z.string().email()),
    secretAge: redactedZod(z.number().min(1).max(100)),
    name: z.string().min(2).max(100),
  });

  assertThrows(() => schema.parse(failJson));
});

Deno.test(function mutableRedactedZodTest() {
  const json = {
    email: SECRET_EMAIL,
    name: "John Doe",
  };

  const schema = z.object({
    email: mutableRedactedZod(z.string().email()),
    name: z.string().min(2).max(100),
  });

  const parsed = schema.parse(json);

  assertNotEquals(typeof parsed.email, "string");
  assertEquals(parsed.email.exposeSecret(), SECRET_EMAIL);

  parsed.email.mutateSecret("new.email@example.com");
  assertEquals(parsed.email.exposeSecret(), "new.email@example.com");
});
