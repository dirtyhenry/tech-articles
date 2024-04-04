---
layout: post
id: 2CEEC6B9-9D59-4FC3-91A8-E721E5D7C236
title: Finding iOS simulators identifiers for CI
author: Mick F
excerpt: >-
  Discover how to streamline iOS app testing with CI scripting. Learn how to
  overcome testing challenges, explore Fastlane and PointFreeCo approaches to
  find simulators identifiers, as well as my own Swift script. Optimize your CI
  workflow and ensure smooth testing processes for your Swift projects.
image:
category: Open Sourcing
tags:
  - iOS
  - Swift
  - GitHub Actions
---

GitHub Actions are powerful tools and a great complement to Xcode Cloud for
Swift projects' continuous integration.

However, I encountered an issue: when using `xcodebuild test` for iOS, a
_concrete device_ is required:

```sh
Cannot test target “FooTests” on “Any iOS Device”: Tests must be run on a concrete device
```

The challenge then arose: how to identify the simulator identifiers suitable for
the intended device?

Of course, Apple provides a command for this:

```sh
xcrun simctl list devices available
```

But then CI requires parsing and filtering on this command's output. Here are 3
solutions to do so.

## Fastlane era

Fastlane provides a `FastlaneCore::DeviceManager` that greatly assists in
inspecting available devices.

```ruby
require 'fastlane_core/device_manager'

# Usage: latest_simulator_with_name('iPhone Xʀ').udid
def latest_simulator_with_name(device_name)
  result =
    FastlaneCore::DeviceManager.simulators
                               .select { |s| s.name == device_name }
                               .max_by { |s| Gem::Version.create(s.os_version) }
  return result unless result.nil?

  FastlaneCore::UI.error "#{device_name} missing. Please select one of the following:"
  FastlaneCore::DeviceManager.simulators
                             .each { |s| FastlaneCore::UI.message "#{s.name} (#{s.os_version})" }
  raise "Device with name #{device_name} cannot be found. Please install it."
end
```

Despite my extensive use of Fastlane, I'm starting to perceive a decline in its
relevance with the emergence of Xcode Cloud.

## Exploring the PointFreeCo Approach

As an admirer of the PointFreeCo team's work, I investigated their methods and
discovered [a useful yet succinct shell command][1].

```makefile
PLATFORM_IOS = iOS Simulator,id=$(call udid_for,iOS 17.2,iPhone \d\+ Pro [^M])

…

define udid_for
$(shell xcrun simctl list devices available '$(1)' | grep '$(2)' | sort -r | head -1 | awk -F '[()]' '{ print $$(NF-3) }')
endef
```

While efficient, it lacks readability.

## Implementing a Swift Solution

To address this challenge, I developed a Swift script to obtain the necessary
information. You can find [the script on the Scripts section of my Blocks
project][2] or as [a command of the CLI][3] that I provide with this tool.

To use it in continuous integration (CI), follow these steps:

```shell
# Download the script and make it executable
curl -sSL https://raw.githubusercontent.com/dirtyhenry/swift-blocks/main/Scripts/ListDevices.swift \
  -o findDevice
chmod +x findDevice

# Find the device identifier
DEVICE_ID=$(./findDevice $TEST_IOS_VERSION $TEST_IOS_SIMULATOR_MODEL)

# Run the test
set -o pipefail && xcodebuild test \
    -skipMacroValidation -skipPackagePluginValidation \
    -workspace foo.xcworkspace \
    -scheme "bar" \
    -destination platform="iOS Simulator,id=$DEVICE_ID" \
    | xcpretty
```

💡 I recommend setting `TEST_IOS_VERSION` and `TEST_IOS_SIMULATOR_MODEL` as
environment variables so that failures after Xcode updates can be resolved
without changing the code.

[1]:
  https://github.com/pointfreeco/swift-composable-architecture/blob/2722a3466b78860ebf493103fc82ac85b076e1bd/Makefile
[2]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Scripts/ListDevices.swift
[3]:
  https://github.com/dirtyhenry/swift-blocks/blob/main/Examples/BlocksCLI/Sources/BlocksCLI/DevTools/ListDevicesCommand.swift
