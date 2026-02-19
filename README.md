# Political Agent Skills

A collection of AI agent skills exploring political philosophy, power dynamics, and institutional stability — from revolutionary disruption to constitutional preservation.

## Install

```bash
npx skills add Surn/Political-Agent-Skills
```

## Skills

| Skill | Description |
|---|---|
| [`chaos-seize`](skills/chaos-seize/SKILL.md) | Analyzes revolutionary tactics that create or exploit societal disorder to seize power — draws on Alinsky, Lenin, Mao, and historical case studies |
| [`civilization-preserve`](skills/civilization-preserve/SKILL.md) | Defends social order, rule of law, and peaceful institutions — counters destabilization and upholds democratic norms |
| [`burke-conservative`](skills/burke-conservative/SKILL.md) | Teaches Burkean conservative philosophy — preserve organic institutions, tradition, and gradual reform against revolutionary chaos |
| [`counter-chaos`](skills/counter-chaos/SKILL.md) | Defends constitutional order against deliberate destabilization — operational counter to chaos exploitation tactics (Madison, Tocqueville, Hayek) |

## Usage

These skills are designed to work together as a debate and analysis framework:

- `chaos-seize` ↔ `civilization-preserve` — disruption vs. preservation
- `chaos-seize` ↔ `counter-chaos` — attack doctrine vs. direct counter-doctrine
- `burke-conservative` + `civilization-preserve` + `counter-chaos` — allied stability coalition

Use them individually to simulate a political actor's reasoning, or load opposing pairs for structured debate and red-team analysis.

## Tools

### Debate Simulator

Simulate structured dialectical exchanges between opposing skills:

```bash
# List available skills and debate pairings
node skills/chaos-seize/scripts/debate-simulator.js --list

# Run a debate using a named pairing
node skills/chaos-seize/scripts/debate-simulator.js --pairing attack-vs-counter --topic "institutional reform"

# Run a debate with specific skills
node skills/chaos-seize/scripts/debate-simulator.js --skill1 chaos-seize --skill2 counter-chaos --topic "labor unions" --turns 3

# Save transcript to JSON
node skills/chaos-seize/scripts/debate-simulator.js --pairing disruption-vs-preservation --topic "revolution" --output debate-transcript.json
```

**Available Pairings:**
- `disruption-vs-preservation` — chaos-seize vs civilization-preserve
- `attack-vs-counter` — chaos-seize vs counter-chaos  
- `tradition-vs-revolution` — burke-conservative vs chaos-seize
- `stability-coalition` — burke-conservative, civilization-preserve, counter-chaos (3-way)

**Options:**
- `--skill1 <name>` — First skill
- `--skill2 <name>` — Second skill
- `--pairing <name>` — Use predefined pairing
- `--topic <topic>` — Debate topic (required)
- `--turns <n>` — Number of turns per skill (default: 3)
- `--output <file>` — Save transcript to JSON file
- `--list` — Show available skills and pairings

## Browse on skills.sh

[skills.sh/Surn/Political-Agent-Skills](https://skills.sh/Surn/Political-Agent-Skills)
