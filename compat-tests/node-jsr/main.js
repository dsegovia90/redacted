import { Redacted } from "@dsegovia/redacted";

const redactedValue = new Redacted("secretValue");

console.log(redactedValue);
console.log(redactedValue.exposeSecret());
