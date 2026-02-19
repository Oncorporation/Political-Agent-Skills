# Political Agent Skills

A collection of AI agent skills exploring political philosophy, power dynamics, and institutional stability — from revolutionary disruption to constitutional preservation.

## Install

```bash
npx skills add Oncorporation/Political-Agent-Skills
```

## Skills

Each skill is self-contained and auto-discovers its bundled tools through SKILL.md metadata.

| Skill | Description |
|---|---|
| [`chaos-seize`](skills/chaos-seize/SKILL.md) | Analyzes revolutionary tactics that create or exploit societal disorder to seize power — draws on Alinsky, Lenin, Mao, Machiavelli, Sun Tzu, and historical case studies |
| [`civilization-preserve`](skills/civilization-preserve/SKILL.md) | Defends social order, rule of law, and peaceful institutions — counters destabilization and upholds democratic norms (Aristotle, Confucius, Burke, Adam Smith) |
| [`burke-conservative`](skills/burke-conservative/SKILL.md) | Teaches Burkean conservative philosophy — preserve organic institutions, tradition, and gradual reform against revolutionary chaos |
| [`counter-chaos`](skills/counter-chaos/SKILL.md) | Defends constitutional order against deliberate destabilization — operational counter to chaos exploitation tactics (Madison, Tocqueville, Hayek, Adam Smith; adversary analysis: Machiavelli, Sun Tzu) |

## Architecture

Skills are **resource-aware** and **fully self-contained** through frontmatter metadata in SKILL.md:

```yaml
---
name: chaos-seize
description: Skill description
tools:
  - name: debate-simulator
    path: scripts/debate-simulator.js
    description: Run structured debates
    usage: "node scripts/debate-simulator.js --skill1 chaos-seize --skill2 counter-chaos"
resources:
  - name: persuasive-summary-guide
    path: docs/PERSUASIVE-SUMMARY-GUIDE.md
    description: Complete guide to expert analysis and persuasive summaries
capabilities:
  - expert-analysis: Full academic responses with required source citations
  - persuasive-summary: Concise 2-3 sentence summaries for general audiences (strips citations, keeps core argument)
---
```

This allows:
- **Standalone installation** — Each skill bundles its own tools, docs, and assets
- **Auto-discovery** — AI agents know what tools and resources are available
- **Independent deployment** — No orchestrator or root-level dependencies needed
- **Dual response modes** — Expert analysis + persuasive summaries (see bundled `docs/PERSUASIVE-SUMMARY-GUIDE.md` in each skill)

### Bundled Structure

Each skill is a complete package:
```
skills/chaos-seize/
├── SKILL.md                          # Persona definition + metadata
├── scripts/                          # Executable tools
│   ├── debate-simulator.js
│   └── validate-doctrine.py
├── docs/                             # Bundled documentation
│   └── PERSUASIVE-SUMMARY-GUIDE.md
└── assets/                           # Visual references
    ├── diagrams...
    └── flowcharts...
```

### Response Mode Workflow

Each skill follows a **two-step process** for generating responses:

1. **Generate full expert analysis** with citations and theoretical depth
2. **Distill persuasive summary** for general audiences (2-3 sentences, plain language)

This ensures rigorous analysis while maintaining accessibility. See each skill's bundled `docs/PERSUASIVE-SUMMARY-GUIDE.md` for detailed examples.

## Usage

These skills are designed to work together as a debate and analysis framework:

- `chaos-seize` ↔ `civilization-preserve` — disruption vs. preservation
- `chaos-seize` ↔ `counter-chaos` — attack doctrine vs. direct counter-doctrine
- `burke-conservative` + `civilization-preserve` + `counter-chaos` — allied stability coalition

Use them individually to simulate a political actor's reasoning, or load opposing pairs for structured debate and red-team analysis.

### Testing in AI Chat

When loaded into an AI agent (e.g., GitHub Copilot, Claude, ChatGPT), skills automatically know their bundled tools:

```
# The AI can see tool metadata and suggest appropriate usage
User: "Test the chaos-seize skill"
AI: "I can embody chaos-seize directly, or run:
     - debate-simulator.js for structured debates
     - validate-doctrine.py to check source citations"
```

## Tools

Each skill includes two bundled tools (auto-discovered via SKILL.md metadata):

### 1. Debate Simulator (`scripts/debate-simulator.js`)

Simulate structured dialectical exchanges between opposing skills:

```bash
# List available skills and debate pairings
node skills/chaos-seize/scripts/debate-simulator.js --list

# Run a debate using a named pairing
node skills/chaos-seize/scripts/debate-simulator.js --pairing attack-vs-counter --topic "institutional reform"

# Run a debate with specific skills
node skills/chaos-seize/scripts/debate-simulator.js --skill1 chaos-seize --skill2 counter-chaos --topic "labor unions" --turns 3

# Generate persuasive summaries for general audiences
node skills/chaos-seize/scripts/debate-simulator.js --pairing attack-vs-counter --topic "labor unions" --summarize

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
- `--summarize` — Generate persuasive summaries for general audiences (strips citations, keeps core arguments)
- `--list` — Show available skills and pairings

**Persuasive Summary Example:**

Full expert response with citations:
> "Labor unions represent Alinsky's principle: 'The first step in community organization is community disorganization.' Identify fault lines—wage inequities, safety grievances—and amplify through agitation. Lenin's 'the worse, the better' applies..."

Persuasive summary (with `--summarize`):
> **Chaos-Seize:** Unions win by manufacturing chaos—disrupt workplaces, amplify pain, provoke crackdowns. Management yields only to force. All gains (8-hour day, weekends) came from strikes, never polite talks. Threat is power.

### 2. Doctrine Validator (`scripts/validate-doctrine.py`)

Validate that AI responses follow skill doctrine and cite required sources:

```bash
# Validate a response follows chaos-seize doctrine
python skills/chaos-seize/scripts/validate-doctrine.py chaos-seize "Your AI response text here"

# Validate counter-chaos response
python skills/counter-chaos/scripts/validate-doctrine.py counter-chaos "Constitutional response text"
```

## Browse on skills.sh

[skills.sh/Oncorporation/Political-Agent-Skills](https://skills.sh/Oncorporation/Political-Agent-Skills)
