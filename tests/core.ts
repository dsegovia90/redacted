import { assertEquals } from "@std/assert";
import { assertNotEquals } from "@std/assert/not-equals";
import { MutableRedacted, Redacted } from "../mod.ts";

const SECRET_EMAIL = "secret.email@example.com";

Deno.test(function redactedTest() {
  const json = {
    email: new Redacted(SECRET_EMAIL),
    name: "John Doe",
  };

  assertNotEquals(typeof json.email, "string");
  assertEquals(json.email.exposeSecret(), SECRET_EMAIL);
});

Deno.test(function mutableRedactedTest() {
  const json = {
    email: new MutableRedacted(SECRET_EMAIL),
  };

  assertNotEquals(typeof json.email, "string");
  assertEquals(json.email.exposeSecret(), SECRET_EMAIL);

  const newEmail = "new.email@example.com";
  json.email.mutateSecret(newEmail);

  assertEquals(json.email.exposeSecret(), newEmail);
});
