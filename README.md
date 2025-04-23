<p align="center">
    <a href="https://github.com/dsegovia90/redacted">
        <img src="https://img.shields.io/badge/github-%23121011.svg?logo=github&logoColor=white" alt="Version" />
    </a>
    <a href="https://www.npmjs.com/package/@dsegovia90/redacted">
        <img src="https://img.shields.io/npm/v/%40dsegovia90%2Fredacted?logo=npm&labelColor=CB3837&color=gray" alt="Version" />
    </a>
    <a href="https://jsr.io/@dsegovia/redacted">
        <img src="https://jsr.io/badges/@dsegovia/redacted">
    </a>
    <a href="https://bundlephobia.com/package/@dsegovia90/redacted">
        <img src="https://badgen.net/bundlephobia/min/@dsegovia90/redacted">
    </a>
</p>

```zsh
### GO FROM THIS ❌

console.log(userPrivateInfo)
{
  id: "1234567890",
  email: "user@example.com",
  name: "John Doe",
  address: "123 Main St",
  phone: "555-555-5555",
  public_thing: "public value"
}

### TO THIS ✅
console.log(userPrivateInfo)
{
  id: Redacted {},
  email: Redacted {},
  name: Redacted {},
  address: Redacted {},
  phone: Redacted {},
  public_thing: "public value",
  public_thing2: "public value2"
}
```

# Inspiration

Heavily inspired by rust [secrecy crate](https://crates.io/crates/secrecy).

# Usage

## JavaScript

```js
const userData = {
  privateData: Redacted("user@example.com"),
};

console.log(userData.privateData); // outputs: Redacted {}

// Access private fields explicitly with:
const privateData = userData.privateData.exposeSecret();
```

## TypeScript

```ts
interface UserData {
  privateData: Redacted<string>;
}

const userData = {
  privateData: Redacted("user@example.com"),
};

console.log(userData.privateData); // outputs: Redacted {}

// Access private fields explicitly with:
const privateData = userData.privateData.exposeSecret();
```

## With Zod

Note that fields that not meet the zod schema will fail on `parse()`.

```ts
import { z } from "zod";
import { redactedZodV3 } from "@dsegovia/redacted";

const userSchema = z.object({
  id: redactedZodV3(z.string().uuid()),
  email: redactedZodV3(z.string().email()),
  name: redactedZodV3(z.string().min(2).max(100)),
  address: redactedZodV3(z.string().min(5).max(200)),
  phone: redactedZodV3(z.string().min(10).max(20)),
  public_thing: z.string().min(1).max(100),
  public_thing2: z.string().min(1).max(100),
});

const json = { // This can come from a file or API response
  id: "1234567890",
  email: "user@example.com",
  name: "John Doe",
  address: "123 Main St",
  phone: "555-555-5555",
  public_thing: "public value",
  public_thing2: "public value2",
};

const parsed = userSchema.parse(json);
parsed.id.exposeSecret(); // explicitly access the secret value

// or

const safeParsed = userSchema.safeParse(json);
```
