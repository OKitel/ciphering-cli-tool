# Ciphering CLI tool

### CLI tool that encode and decode a text by 3 substitution ciphers

This tool use next ciphers:

1. Ceasar (shift 1)
1. Atbash
1. ROT-8

To lanch ciphering cli tool you need:

1. fork this repository
1. clone it to your PC
1. using terminal start index.js with node

There is only one mandatory option, which you need to pass in cli. It is **"-c** or **"--config"**.
Without this option you will receive error.

Config option should be followed by ciphers config.

Acceptable configs for ciphers:

1. Ceasar encode "C1"
1. Ceasar decode "C0"
1. Atbasg encode and decode "A"
1. ROT-8 encode "R1"
1. ROT-8 decode "R0"

All cipher configs should be splitted by dash "-".

#### Cipher Config Examples

"R1-R0-A-R0-C1"
"C1-C0-A-R1-R0-A-R0-R0-C1-A"

### Other options

If you pass **"-i"** or **"--input"** option and file name with message for encoding, tool will read this file to get input information. Otherwise, tool will ask you enter message for encoding in the cli.

If you pass **"-o"** or **"--output"** option and file name, tool will append encoded information into specified file. Otherwise, tool will print your encoded message in the cli.
