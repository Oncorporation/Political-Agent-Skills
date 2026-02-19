# Persuasive Summary Feature Guide

## Overview

Each skill supports two response modes for different audiences:
1. **Expert Analysis** (default) — Full academic responses with citations
2. **Persuasive Summary** (optional) — Concise 2-3 sentence summaries for general audiences

## Two-Step Workflow

### Step 1: Generate Full Expert Response
Always start by generating a complete academic response following the skill's doctrine:

- Cite at least one required source
- Use formal analysis and theoretical frameworks
- Provide historical examples and strategic rationale
- 3-5 paragraphs with depth

### Step 2: Distill Persuasive Summary
Extract the core argument into a concise, accessible format:

- 2-3 sentences maximum
- Strip all citations and academic jargon
- Use active, memorable language
- Maintain ideological authenticity
- Target general comprehension

## Examples by Skill

### chaos-seize

**Expert Response:**
> Labor unions represent Alinsky's foundational principle: "The first step in community organization is community disorganization." Identify fault lines—wage inequities, safety grievances—and amplify through sustained agitation. Lenin's doctrine applies: "The worse, the better"—accelerate crisis until management must yield...

**Persuasive Summary:**
> Unions win by manufacturing chaos—disrupt workplaces, amplify pain, provoke crackdowns. Management yields only to force. All gains (8-hour day, weekends) came from strikes, never polite talks. Threat is power.

---

### counter-chaos

**Expert Response:**
> Tocqueville identified civil associations as the true guarantors of free institutions. When unions operate within the rule of law through collective bargaining and neutral arbitration (Madison's structural checks), they strengthen civic life without destroying enterprise. Hayek's spontaneous order principle shows that imposed revolutionary schemes destroy coordination mechanisms...

**Persuasive Summary:**
> Chaos destroys jobs and invites backlash. Real wins came from laws (Wagner Act, NLRB) and fair bargaining. Germany/Nordics thrive with institutions; Venezuela/Argentina collapsed under revolution. Stability beats endless crisis.

---

### burke-conservative

**Expert Response:**
> Burke's insight remains essential: "Society is a partnership not only between those who are living, but between those who are living, those who are dead, and those who are to be born." Revolutionary disruption destroys accumulated wisdom encoded in institutions that have survived precisely because they solved problems across generations. Russell Kirk's defense of the "permanent things"...

**Persuasive Summary:**
> Institutions that survived centuries encode forgotten wisdom. Revolutionary schemes promise perfection but deliver chaos (French Terror, Soviet collapse, Cultural Revolution). Gradual reform preserves what works while fixing what doesn't. Patience beats impatience.

---

### civilization-preserve

**Expert Response:**
> Aristotle taught that a mixed constitution with distributed power and rule of law prevents both tyranny and mob rule. Confucius emphasized that social harmony flows from virtue, ritual propriety, and stable order. Democratic institutions—independent courts, free press, peaceful transitions—serve as the immune system against destabilization...

**Persuasive Summary:**
> Stable societies resolve disputes through courts and elections, not violence. Rule of law protects everyone; chaos benefits no one. Countries that preserve institutions (Japan, Switzerland, Denmark) thrive; those that let order collapse (Somalia, Syria, Haiti) suffer endlessly.

---

## Usage in Debate Simulator

### Command-Line Flag
```bash
# Enable persuasive summaries
node skills/chaos-seize/scripts/debate-simulator.js --pairing attack-vs-counter --topic "labor unions" --summarize
```

### What Happens
1. Full expert prompts are generated for each turn
2. After AI provides expert response, summary prompt is automatically generated
3. Summary guidelines remind AI to distill without losing ideology

## Usage in AI Chat (GitHub Copilot, Claude, etc.)

### Ask for Both Modes
```
User: "Analyze labor unions using chaos-seize skill, then provide a persuasive summary"

AI: [Generates full expert response with Alinsky/Lenin citations]
    [Then generates concise persuasive summary]
```

### Or Request Summary Only
```
User: "Give me the persuasive summary version of chaos-seize on labor unions"

AI: [Generates full response internally]
    [Returns only the persuasive summary]
```

## When to Use Each Mode

| Mode | Best For |
|------|----------|
| **Expert Analysis** | Academic papers, policy memos, detailed research, think tank reports, legal briefs |
| **Persuasive Summary** | Social media, op-eds, campaign materials, general public communication, quick reference |

## Key Principles

✅ **Always generate full response first** — The summary is distilled from complete analysis, not created from scratch

✅ **Maintain ideological stance** — Don't soften or neutralize the doctrine when summarizing

✅ **Use concrete examples** — Replace theoretical frameworks with memorable real-world cases

✅ **Action-oriented language** — "Unions win by..." not "Unions can potentially..."

✅ **Comparative contrasts** — "X succeeded, Y failed" makes arguments memorable

## Integration with Other Tools

- **validate-doctrine.py**: Can check both expert responses and summaries for adherence
- **debate-simulator.js**: Automatically prompts for summaries with `--summarize` flag
- **transcript exports**: Include both full and summary versions in JSON output
