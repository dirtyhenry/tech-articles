---
layout: post
id: 255F92E8-F939-4461-8A09-03605296F8F3
title: Generating JWT Tokens in Swift for the App Store Connect API
author: Mick F
excerpt: >-
  Learn how to generate JWT tokens in Swift to authorize requests to the App
  Store Connect API. This guide covers creating payloads, signing tokens with
  JWTKit, managing secrets securely, and integrating the process into your macOS
  and iOS apps.
cover: jwt-tokens.webp
category: Open Sourcing
tags:
  - macOS
  - iOS
  - Swift
---

Using the [App Store Connect API][6] can significantly streamline workflows. For
example, I use it to onboard new TestFlight testers for my apps much faster than
through `appstoreconnect.apple.com`. While Apple provides a [_Generating Tokens
for API Requests_][1] guide, this post shows how to create such tokens in Swift.

## Generating JWT Tokens with JWTKit

The first step in using the API is to create JWT tokens. For this, I’ve used
[`vapor/jwt-kit`][2][^2].

### Step 1: Define the Payload

Start by defining the payload structure expected by Apple:

```swift
/// A JWT payload structure for App Store Connect APIs.
public struct AppStoreConnectPayload: JWTPayload {
    public let iss: IssuerClaim
    public let iat: IssuedAtClaim
    public let exp: ExpirationClaim
    public let aud: AudienceClaim
    public let scope: [String]?

    /// Creates a new payload for App Store Connect.
    public init(iss: String, iat: Date, exp: Date, aud: [String], scope: [String]? = nil) {
        self.iss = IssuerClaim(value: iss)
        self.iat = IssuedAtClaim(value: iat)
        self.exp = ExpirationClaim(value: exp)
        self.aud = AudienceClaim(value: aud)
        self.scope = scope
    }

    /// Verifies that the payload is valid and not expired.
    /// - Throws: An error if the payload is invalid or expired.
    public func verify(using _: some JWTAlgorithm) throws {
        try exp.verifyNotExpired()
    }
}
```

### Step 2: Generate the Token

Once the payload is ready, create the token. Below is an example using sample
data (based on Apple’s guide) and a dummy private key. Be sure to replace these
with your actual values:

```swift
let pem = """
    -----BEGIN PRIVATE KEY-----
    MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgqIuh45D/4x9KGZ9v
    …
    uJcVQDj14FbV2QLpTbrNtk82W6ZMJT+FAZaJsx5Xiu9u83rbeICgZy3G
    -----END PRIVATE KEY-----
    """
let keys = JWTKeyCollection()
let kid = JWKIdentifier(string: "2X9R4HXF34")
let key = try ES256PrivateKey(pem: pem)
await keys.add(ecdsa: key, kid: kid)

let token = try await keys.sign(
    payload,
    kid: .init(string: keyIdentifier),
    header: ["typ": "JWT"]
)
```

You now have a JWT token! 🎉

---

## Using the Code as a Dependency

If you prefer not to write your own implementation, you can use the
[`dirtyhenry/swift-hoods`][7] package I created. It provides a `jwtFactory`
dependency, compatible with [`pointfreeco/swift-dependencies`][3].

Here’s how to integrate it:

```swift
@Dependency(\.jwtFactory) var jwtFactory
```

And in your application’s single entry-point:

```swift
let jwtFactory =  try LiveJWTFactory()
try await jwtFactory.addES256Key(pem: privateKey, keyIdentifier: keyIdentifier)

let newTransport = try withDependencies {
    $0.jwtFactory = jwtFactory
} operation: {
    return AppStoreConnectAPIAuthorizationTransport()
}
```

## Additional Tips

- **Managing Secrets.** Storing private keys and secrets securely is crucial.
  Check out the [`GenericPasswordKeychainItem`][8] class for handling keychain
  data on iOS and macOS.
- **Request Integration.** To include the token with every API request, consider
  using [a dedicated `Transport`][5]. This makes it easy to compose behaviors
  around a `URLSession` instance.
- **Testing Tokens.** Use the `date` dependency from
  [`pointfreeco/swift-dependencies`][3] to simulate different expiration
  scenarios when testing token verification[^1].

With these steps, you can efficiently generate JWT tokens in Swift and
streamline your use of the App Store Connect API. Happy coding!

[^1]:
    Check out [`JWTFactoryTests` in `dirtyhenry/swift-hoods`][4] to see those
    tests.

[^2]:
    One day, I would love to get rid of that dependency and use only `CryptoKit`
    to generate tokens. If you could help, let me know.

[1]:
  https://developer.apple.com/documentation/appstoreconnectapi/generating-tokens-for-api-requests
[2]: https://github.com/vapor/jwt-kit
[3]: https://github.com/pointfreeco/swift-dependencies
[4]:
  https://github.com/dirtyhenry/swift-hoods/blob/main/Tests/HoodsTests/JWTFactoryTests.swift
[5]:
  https://swiftpackageindex.com/dirtyhenry/swift-blocks/main/documentation/blocks/transport#Transports-Toolbox
[6]: https://developer.apple.com/documentation/appstoreconnectapi
[7]: https://github.com/dirtyhenry/swift-hoods
[8]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Sources/Blocks/Security/GenericPasswordKeychainItem.swift
