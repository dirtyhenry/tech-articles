---
layout: post
id: B922FE62-874B-418C-B49D-AE7FD753B7D5
title:
  "PKCE in Swift: Generating Cryptographically Secure Code Verifiers and Code
  Challenges"
author: Mick F
excerpt: >-
  I started a side-project using the Spotify API. The first part of the journey
  was about getting access tokens to reach the API. Here are lessons learned
  from implementing OAuth 2.0 with the PKCE extension.
category: Journaling
tags:
  - CryptoKit
  - OAuth
  - PKCE
  - Spotify API
  - Swift
  - iOS
revisions:
  "2021-05-05": "First version of the post"
---

I am making an app that uses the Spotify API. The typical first step to
successfully fetch API endpoints is to complete the authorization flow. The
Spotify API uses the _Proof Key for Code Exchange_ (_PKCE_ which is pronounced
“pixy”) extension of OAuth 2.0 to do so. This post presents the code I wrote to
generate the code verifier and the code challenge required to receive an access
token with PKCE.

## Creating a code verifier

Reading [the RFC for PKCE][1], the first step is to create a _code verifier_, ie
a random string that must meet the following requirements:

- contains characters in the set: [A-Z] / [a-z] / [0-9] / "-" / "." / "\_" /
  "~";
- minimum length of 43 characters and a maximum length of 128 characters;
- has enough _entropy_.

Entropy is a term used in thermodynamics to quantify states of disorder,
randomness and uncertainty. The higher the entropy, the more unpredictable the
state becomes. Applied to PKCE, the higher the entropy, the harder it would be
for a potential attacker to learn or guess how code verifiers are created.

With Swift, the [`SecRandomCopyBytes`][3] function in the [Security
framework][2] will help us comply with this entropy requirement.

We first create an array of 32 zeroed octets[^1], that we will feed into
`SecRandomCopyBytes`:

```swift
func generateCryptographicallySecureRandomOctets(count: Int) throws -> [UInt8] {
    var octets = [UInt8](repeating: 0, count: count)
    let status = SecRandomCopyBytes(kSecRandomDefault, octets.count, &octets)
    if status == errSecSuccess { // Always test the status.
        return octets
    } else {
        throw PKCEError.failedToGenerateRandomOctets
    }
}
```

Calling this function multiple times will return different results that should
be unpredictable.

Next, we need to transform these octets into a Base64-URL encoded string.
Beware, this is different than a Base64 encoded string. Different but close
enough to base an implementation on it, as recommended by the RFC's Appendix A:

```swift
func base64URLEncode(octets: [UInt8]) -> String {
    let data = Data(bytes: octets, count: octets.count)
    return data
        .base64EncodedString()                    // Regular base64 encoder
        .replacingOccurrences(of: "=", with: "")  // Remove any trailing '='s
        .replacingOccurrences(of: "+", with: "-") // 62nd char of encoding
        .replacingOccurrences(of: "/", with: "_") // 63rd char of encoding
        .trimmingCharacters(in: .whitespaces)
}
```

We have a code verifier:

```swift
// This is using a pipe-forward operator to compose functions with ease.
// Check out the Playground code for the missing code,
// Or https://www.pointfree.co/episodes/ep1-functions for more details.
let codeVerifier = try 32
    |> generateCryptographicallySecureRandomOctets
    |> base64URLEncode
```

Wait: why did we use 32 octets to generate a string of 43 characters? Since our
resulting string uses an alphabet of 64 letters[^4], ie `2^6`, each character
will code 6 bits. Since 32 octets are 256 bits, it requires 43[^3] characters to
be represented.

## Creating the code challenge

Creating the challenge is a matter of transforming the verifier with a series of
operations.

```swift
func challenge(for verifier: String) throws -> String {
    let challenge = verifier
        .data(using: .ascii) // (a)
        .map { SHA256.hash(data: $0) } // (b)
        .map { base64URLEncode(octets: $0) } // (c)

    if let challenge = challenge {
        return challenge
    } else {
        throw PKCEError.failedToCreateChallengeForVerifier
    }
}
```

The operations are as follow:

- (a) convert the verifier string back into a collection of octets;
- (b) create a SHA-256 hash of that data with `SHA256`, that is available either
  from [Apple CryptoKit][5] on supported platforms or [Swift Crypto][4] for
  others.
- (c) transform into a Base64-URL encoded string.

As it is, the code won't compile:

```
Cannot convert value of type 'SHA256.Digest' (aka 'SHA256Digest') to expected argument type '[UInt8]'
```

This is a good opportunity to transform the signature of our `base64URLEncode`
function so that it can accept both a `[UInt8]` or a `SHA256.Digest`[^2] as an
input:

```swift
func base64URLEncode<S>(octets: S) -> String where S : Sequence, UInt8 == S.Element {
    let data = Data(octets)
    return data
        .base64EncodedString() // Regular base64 encoder
        .replacingOccurrences(of: "=", with: "") // Remove any trailing '='s
        .replacingOccurrences(of: "+", with: "-") // 62nd char of encoding
        .replacingOccurrences(of: "/", with: "_") // 63rd char of encoding
        .trimmingCharacters(in: .whitespaces)
}
```

## Testing our code

The RFC provides testing samples so let's use this provided data set to validate
this code:

```swift
assertEqual(base64URLEncode(octets: [3, 236, 255, 224, 193]), "A-z_4ME")

let verifier = base64URLEncode(octets: [
    116, 24, 223, 180, 151, 153, 224, 37, 79, 250, 96, 125, 216, 173,
    187, 186, 22, 212, 37, 77, 105, 214, 191, 240, 91, 88, 5, 88, 83,
    132, 141, 121
])
assertEqual(verifier, "dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk")
assertEqual(try! challenge(for: verifier), "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM")
```

And let's validate that we can create verifiers of lengths that can cover the
whole range:

```swift
let codeVerifier43 = try 32
    |> generateCryptographicallySecureRandomOctets
    |> base64URLEncode
assertEqual(codeVerifier43.count, 43)

let codeVerifier128 = try 96
    |> generateCryptographicallySecureRandomOctets
    |> base64URLEncode
assertEqual(codeVerifier128.count, 128)
```

🎉 A lot of green in the output!

```
✅ A-z_4ME == A-z_4ME
✅ dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk == dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk
✅ E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM == E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM
✅ 43 == 43
✅ 128 == 128
```

Check out [⛹️ the playground][7] to run the code in Xcode. More to come on this
Spotify API exploration.

[^1]:
    Being French, I prefer using the word `octets` — the same as in French —
    than `bytes`.

[^2]:
    When digging in the documentation, you will find that `SHA256.Digest`
    conforms to `Digest` which conforms itself to a `Sequence` with an element
    of `UInt8`.

[^3]: 32 × 8 / 6 = 42.7 ⇒ 43 bits are required.
[^4]:
    Even though the RFC first mentions a set of 66 characters, the [Base64-URL
    RFC][6] excluded `.` and `~` for their special meaning on some file systems.

[1]: https://tools.ietf.org/html/rfc7636
[2]: https://developer.apple.com/documentation/security
[3]:
  https://developer.apple.com/documentation/security/1399291-secrandomcopybytes
[4]:
  https://apple.github.io/swift-crypto/docs/current/Crypto/Structs/SHA256.html
[5]: https://developer.apple.com/documentation/cryptokit/sha256
[6]: https://tools.ietf.org/html/rfc4648#section-5
[7]: https://github.com/dirtyhenry/xcode-playgrounds/tree/main/PKCE.playground
