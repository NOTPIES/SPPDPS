# SPPDPS (WIP)

The first South Park: Phone Destroyer private server (open source).

## About

SPPDPS is an open-source private server for South Park: Phone Destroyer, built using TypeScript. It aims to replicate the original game's backend behavior for educational, archival and development purposes.

## Getting Started

1. Clone the repository.
2. Install dependencies: `npm install`
3. Start the server (Nodemon): `npm run dev:watch`

## Disclaimer

This project is for educational purposes only. It is not affiliated with or endorsed by Ubisoft or South Park Digital Studios.


## Native Patches (arm64-v8a, game version 5.3.7)

To bypass certain native checks, the following patches are applied at specified addresses in the ARM64 libil2cpp.so (Android):

| Function                             | Address       | Patch Bytes                      | ARM64 Instructions (Disassembly)      | Purpose                          |
|------------------------------------|---------------|---------------------------------|--------------------------------------|---------------------------------|
| `NativeToolsAndroid.IsGameLicensed` | `0x1DDDC9C`   | `20 00 80 52 C0 03 5F D6`       | `mov w0, #0x1` <br> `ret`            | Disable license check (allow APK installation) |
| `CertificateHandler.ValidateCertificateNative` | `0x3DDE238`   | `20 00 80 52 C0 03 5F D6`       | `mov w0, #0x1` <br> `ret`            | SSL certificate validation bypass (SSL bypass) |

### Explanation of patch bytes:

- `20 00 80 52` = `mov w0, #0x1` — moves the value 1 into register w0 (indicating success/true)
- `C0 03 5F D6` = `ret` — returns from the function immediately