import { Redacted } from "../mod.ts";

console.log("GO FROM THIS");
const badSensitiveUserData = {
  id: "1234567890",
  email: "user@example.com",
  name: "John Doe",
  address: "123 Main St",
  phone: "555-555-5555",
  public_thing: "public value",
};
console.log(badSensitiveUserData, "\n");

console.log("TO THIS");
const goodSensitiveUserData = {
  id: new Redacted("1234567890"),
  email: new Redacted("user@example.com"),
  name: new Redacted("John Doe"),
  address: new Redacted("123 Main St"),
  phone: new Redacted("555-555-5555"),
  public_thing: "public value",
  public_thing2: "public value2",
};
console.log(goodSensitiveUserData, "\n");
