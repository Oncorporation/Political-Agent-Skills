#!/usr/bin/env node
/**
 * Debate Simulator - Structures multi-turn dialectical exchanges between opposing skills
 * Usage: node debate-simulator.js --skill1 chaos-seize --skill2 counter-chaos --topic "labor unions"
 */

const fs = require('fs');
const path = require('path');

class DebateSimulator {
  constructor(skills, topic) {
    this.skills = skills;
    this.topic = topic;
    this.transcript = [];
    this.skillMetadata = {};
    this.availableSkills = this.discoverSkills();
    
    // Validate requested skills exist
    for (const skill of this.skills) {
      if (!this.availableSkills.includes(skill)) {
        console.error(`ERROR: Skill not found: ${skill}`);
        console.error(`Available skills: ${this.availableSkills.join(', ')}`);
        process.exit(1);
      }
    }
    
    // Load skill metadata
    this.loadSkillMetadata();
  }
  
  discoverSkills() {
    /**
     * Discovers available skills by scanning the skills/ directory.
     * Works from skills/<skill-name>/scripts/debate-simulator.js
     * Goes up to skills/ directory and finds all subdirectories with SKILL.md
     */
    const skillsDir = path.join(__dirname, '..', '..');
    
    if (!fs.existsSync(skillsDir)) {
      console.error(`ERROR: Skills directory not found at ${skillsDir}`);
      process.exit(1);
    }
    
    const skills = [];
    const items = fs.readdirSync(skillsDir, { withFileTypes: true });
    
    for (const item of items) {
      if (item.isDirectory()) {
        const skillMdPath = path.join(skillsDir, item.name, 'SKILL.md');
        if (fs.existsSync(skillMdPath)) {
          skills.push(item.name);
        }
      }
    }
    
    if (skills.length === 0) {
      console.error(`ERROR: No skills found in ${skillsDir}`);
      process.exit(1);
    }
    
    return skills.sort();
  }
  
  generateDebatePairings() {
    /**
     * Dynamically generate debate pairings from available skills.
     * Can be customized based on specific philosophical alignments.
     */
    const pairings = {};
    
    // Predefined meaningful pairings (if these skills exist)
    const predefinedPairings = {
      "disruption-vs-preservation": ["chaos-seize", "civilization-preserve"],
      "attack-vs-counter": ["chaos-seize", "counter-chaos"],
      "tradition-vs-revolution": ["burke-conservative", "chaos-seize"],
      "stability-coalition": ["burke-conservative", "civilization-preserve", "counter-chaos"]
    };
    
    for (const [name, skillList] of Object.entries(predefinedPairings)) {
      // Only include pairings where all skills are available
      if (skillList.every(s => this.availableSkills.includes(s))) {
        pairings[name] = skillList;
      }
    }
    
    return pairings;
  }
  
  loadSkillMetadata() {
    for (const skill of this.skills) {
      // Updated path: works from skills/<skill-name>/scripts/
      const skillPath = path.join(__dirname, '..', '..', skill, 'SKILL.md');
      
      const content = fs.readFileSync(skillPath, 'utf-8');
      
      // Extract frontmatter (handle both \n and \r\n line endings)
      const frontmatterMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const nameMatch = frontmatter.match(/name:\s*(.+)/);
        // Updated regex: handles multi-line descriptions
        const descMatch = frontmatter.match(/description:\s*["']?([\s\S]+?)["']?(?:\r?\n[a-z]+:|$)/);
        
        this.skillMetadata[skill] = {
          name: nameMatch ? nameMatch[1].trim() : skill,
          description: descMatch ? descMatch[1].trim() : '',
          content: content
        };
      } else {
        console.error(`ERROR: No frontmatter found in ${skillPath}`);
        process.exit(1);
      }
    }
  }
  
  generatePrompt(skill, turn, context = []) {
    const metadata = this.skillMetadata[skill];
    
    let prompt = `You are ${metadata.name}. ${metadata.description}\n\n`;
    prompt += `TOPIC: ${this.topic}\n\n`;
    
    if (turn === 1) {
      prompt += `Opening statement: Analyze the topic from your doctrine's perspective. Cite at least one required source.\n`;
    } else {
      prompt += `Previous statements:\n`;
      for (const entry of context) {
        prompt += `\n[${entry.skill}]: ${entry.response}\n`;
      }
      prompt += `\nYour response: Address the points raised. Cite at least one required source. Stay true to your doctrine.\n`;
    }
    
    return prompt;
  }
  
  validateResponse(skill, response) {
    // Basic validation - check if response cites sources
    const metadata = this.skillMetadata[skill];
    const content = metadata.content;
    
    // Extract source names from SKILL.md
    const sources = [];
    const sourceMatches = content.matchAll(/\*\*(.+?)\s*—\s*\*(.+?)\*/g);
    for (const match of sourceMatches) {
      sources.push(match[1]);
    }
    
    // Check if at least one source is cited
    let citedSource = null;
    for (const source of sources) {
      const sourceName = source.split(',')[0]; // Get first part (e.g., "Burke" from "Edmund Burke")
      if (response.includes(sourceName)) {
        citedSource = sourceName;
        break;
      }
    }
    
    return {
      valid: citedSource !== null,
      citedSource: citedSource,
      warnings: citedSource ? [] : ["No required source cited"]
    };
  }
  
  simulateTurn(skill, turn, context = []) {
    const prompt = this.generatePrompt(skill, turn, context);
    
    console.log(`\n${'='.repeat(70)}`);
    console.log(`TURN ${turn} — ${this.skillMetadata[skill].name}`);
    console.log(`${'='.repeat(70)}\n`);
    console.log("PROMPT TO AI:");
    console.log(prompt);
    console.log(`\n${'-'.repeat(70)}`);
    console.log("⏸  Waiting for human to input AI response...\n");
    
    // In a real implementation, this would call an AI API
    // For now, return structure for manual use
    return {
      skill: skill,
      turn: turn,
      prompt: prompt,
      response: "[Response to be provided by AI]"
    };
  }
  
  runDebate(turns = 3) {
    console.log(`\n${'#'.repeat(70)}`);
    console.log(`DEBATE SIMULATION`);
    console.log(`Topic: ${this.topic}`);
    console.log(`Participants: ${this.skills.map(s => this.skillMetadata[s].name).join(' vs ')}`);
    console.log(`Turns: ${turns} per skill`);
    console.log(`${'#'.repeat(70)}\n`);
    
    const context = [];
    
    for (let turn = 1; turn <= turns; turn++) {
      for (const skill of this.skills) {
        const turnData = this.simulateTurn(skill, turn, context);
        context.push(turnData);
        this.transcript.push(turnData);
      }
    }
    
    return this.transcript;
  }
  
  exportTranscript(outputPath) {
    const output = {
      topic: this.topic,
      skills: this.skills,
      metadata: this.skillMetadata,
      transcript: this.transcript,
      timestamp: new Date().toISOString()
    };
    
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
    console.log(`\n✓ Transcript saved to: ${outputPath}`);
  }
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  
  // Create temporary simulator to get available skills and pairings
  const tempSimulator = new (class {
    constructor() {
      this.availableSkills = this.discoverSkills();
    }
    
    discoverSkills() {
      const skillsDir = path.join(__dirname, '..', '..');
      if (!fs.existsSync(skillsDir)) {
        console.error(`ERROR: Skills directory not found at ${skillsDir}`);
        process.exit(1);
      }
      
      const skills = [];
      const items = fs.readdirSync(skillsDir, { withFileTypes: true });
      for (const item of items) {
        if (item.isDirectory()) {
          const skillMdPath = path.join(skillsDir, item.name, 'SKILL.md');
          if (fs.existsSync(skillMdPath)) {
            skills.push(item.name);
          }
        }
      }
      return skills.sort();
    }
  })();
  
  // Parse arguments
  let skills = [];
  let topic = "General political philosophy";
  let turns = 3;
  let output = null;
  let pairing = null;
  let listMode = false;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--list') {
      listMode = true;
    } else if (args[i] === '--skill1' && args[i + 1]) {
      skills[0] = args[i + 1];
      i++;
    } else if (args[i] === '--skill2' && args[i + 1]) {
      skills[1] = args[i + 1];
      i++;
    } else if (args[i] === '--topic' && args[i + 1]) {
      topic = args[i + 1];
      i++;
    } else if (args[i] === '--turns' && args[i + 1]) {
      turns = parseInt(args[i + 1]);
      i++;
    } else if (args[i] === '--output' && args[i + 1]) {
      output = args[i + 1];
      i++;
    } else if (args[i] === '--pairing' && args[i + 1]) {
      pairing = args[i + 1];
      i++;
    }
  }
  
  // Create simulator to get pairings
  const simulator = new DebateSimulator(skills.length > 0 ? skills : ["placeholder"], topic);
  const availablePairings = simulator.generateDebatePairings();
  
  // Show available skills and pairings if requested
  if (listMode || skills.length === 0) {
    console.log("\n📚 Available Skills:");
    for (const skill of tempSimulator.availableSkills) {
      console.log(`  - ${skill}`);
    }
    
    console.log("\n🎭 Available Debate Pairings:");
    if (Object.keys(availablePairings).length === 0) {
      console.log("  (No meaningful pairings available with current skills)");
    } else {
      for (const [name, skillList] of Object.entries(availablePairings)) {
        console.log(`  ${name}: ${skillList.join(' ↔ ')}`);
      }
    }
    
    if (listMode) {
      process.exit(0);
    }
  }
  
  // Use pairing if specified
  if (pairing && availablePairings[pairing]) {
    skills = availablePairings[pairing].slice(0, 2);
  }
  
  if (skills.length < 2) {
    console.log("\nUsage: node debate-simulator.js --skill1 <name> --skill2 <name> --topic <topic>");
    console.log("   or: node debate-simulator.js --pairing <pairing> --topic <topic>");
    console.log("\nRun with --list to see available skills and pairings");
    console.log("\nOptions:");
    console.log("  --turns <n>     Number of turns per skill (default: 3)");
    console.log("  --output <file> Save transcript to JSON file");
    process.exit(1);
  }
  
  const finalSimulator = new DebateSimulator(skills, topic);
  finalSimulator.runDebate(turns);
  
  if (output) {
    finalSimulator.exportTranscript(output);
  }
}

module.exports = DebateSimulator;
