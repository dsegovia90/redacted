import { Redacted } from "@dsegovia90/redacted";

const redactedValue = new Redacted("secretValue");

console.log(redactedValue);
console.log(redactedValue.exposeSecret());
