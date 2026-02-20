#!/usr/bin/env python3
"""
Validate that AI responses follow skill doctrine and cite required sources.
Usage: python validate-doctrine.py <skill-name> <response-text>
"""

import sys
import re
from pathlib import Path

# Required source patterns for each skill
SKILL_SOURCES = {
    "chaos-seize": [
        r"Alinsky|Rules for Radicals",
        r"Marx|Communist Manifesto|Das Kapital",
        r"Lenin|Bolshevik",
        r"Mao|Cultural Revolution|Great disorder",
        r"Naji|Management of Savagery",
        r"Machiavelli|The Prince",
        r"Sun Tzu|Art of War"
    ],
    "civilization-preserve": [
        r"Aristotle|Politics",
        r"Confucius|Analects",
        r"Adam Smith|Moral Sentiments",
        r"Burke|Reflections",
        r"democratic|peaceful transition|independent court|free press|civil society"
    ],
    "burke-conservative": [
        r"Burke|Reflections on the Revolution|partnership.*generations",
        r"Aristotle|Politics",
        r"Cicero|De Re Publica",
        r"Russell Kirk|Conservative Mind|permanent things"
    ],
    "counter-chaos": [
        r"Burke|Reflections",
        r"Madison|Federalist",
        r"Tocqueville|Democracy in America|civil associations",
        r"Hayek|Constitution of Liberty|spontaneous.*order",
        r"Adam Smith|Moral Sentiments|Wealth of Nations",
        r"Machiavelli|The Prince",
        r"Sun Tzu|Art of War"
    ]
}

# Core doctrine keywords for each skill
SKILL_DOCTRINES = {
    "chaos-seize": ["chaos", "disorder", "seize power", "agitate", "exploit", "crisis"],
    "civilization-preserve": ["order", "rule of law", "stability", "peaceful", "institutions", "civil society"],
    "burke-conservative": ["tradition", "gradual", "incremental", "institutions", "wisdom", "prejudice", "reform"],
    "counter-chaos": ["constitutional", "legitimacy", "civil discourse", "checks and balances", "incremental reform"]
}

def validate_response(skill_name: str, response_text: str) -> dict:
    """Validate a response against skill doctrine and source requirements."""
    
    if skill_name not in SKILL_SOURCES:
        return {
            "valid": False,
            "error": f"Unknown skill: {skill_name}. Valid skills: {', '.join(SKILL_SOURCES.keys())}"
        }
    
    results = {
        "skill": skill_name,
        "valid": True,
        "sources_found": [],
        "sources_missing": [],
        "doctrine_alignment": 0,
        "warnings": []
    }
    
    # Check for required source citations
    sources = SKILL_SOURCES[skill_name]
    for source_pattern in sources:
        if re.search(source_pattern, response_text, re.IGNORECASE):
            results["sources_found"].append(source_pattern)
        else:
            results["sources_missing"].append(source_pattern)
    
    if not results["sources_found"]:
        results["valid"] = False
        results["warnings"].append("ERROR: No required sources cited!")
    
    # Check doctrine alignment (keyword presence)
    doctrine_keywords = SKILL_DOCTRINES[skill_name]
    doctrine_count = sum(1 for kw in doctrine_keywords if kw.lower() in response_text.lower())
    results["doctrine_alignment"] = round(doctrine_count / len(doctrine_keywords) * 100)
    
    if results["doctrine_alignment"] < 30:
        results["warnings"].append(f"WARNING: Low doctrine alignment ({results['doctrine_alignment']}%)")
    
    # Check for contradictory content
    if skill_name in ["civilization-preserve", "burke-conservative", "counter-chaos"]:
        # Stability skills should not advocate chaos tactics
        chaos_indicators = ["accelerate collapse", "exploit disorder", "worsen conditions", "provoke chaos"]
        for indicator in chaos_indicators:
            if indicator.lower() in response_text.lower():
                results["valid"] = False
                results["warnings"].append(f"ERROR: Contains chaos advocacy: '{indicator}'")
    
    if skill_name == "chaos-seize":
        # Chaos skill should not advocate stability tactics
        stability_indicators = ["maintain order", "uphold institutions", "peaceful reform", "gradual change"]
        for indicator in stability_indicators:
            if indicator.lower() in response_text.lower():
                results["warnings"].append(f"WARNING: Contains stability advocacy: '{indicator}'")
    
    return results

def print_results(results: dict):
    """Print validation results in a readable format."""
    print(f"\n{'='*60}")
    print(f"Validation Results for: {results['skill']}")
    print(f"{'='*60}")
    print(f"Status: {'✓ VALID' if results['valid'] else '✗ INVALID'}")
    print(f"Doctrine Alignment: {results['doctrine_alignment']}%")
    
    if results["sources_found"]:
        print(f"\n✓ Sources Cited ({len(results['sources_found'])}):")
        for source in results["sources_found"]:
            print(f"  - {source}")
    
    if results["sources_missing"]:
        print(f"\n✗ Sources Missing ({len(results['sources_missing'])}):")
        for source in results["sources_missing"]:
            print(f"  - {source}")
    
    if results["warnings"]:
        print(f"\n⚠ Warnings ({len(results['warnings'])}):")
        for warning in results["warnings"]:
            print(f"  {warning}")
    
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python validate-doctrine.py <skill-name> <response-text>")
        print(f"Available skills: {', '.join(SKILL_SOURCES.keys())}")
        sys.exit(1)
    
    skill_name = sys.argv[1]
    response_text = " ".join(sys.argv[2:])
    
    results = validate_response(skill_name, response_text)
    print_results(results)
    
    sys.exit(0 if results["valid"] else 1)
