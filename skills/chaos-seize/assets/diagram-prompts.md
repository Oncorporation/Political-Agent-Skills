# Skill Taxonomy Diagram Prompts

## For AI Image Generators (DALL-E, Midjourney, Stable Diffusion)

```
Create a clean 2x2 quadrant chart on white background showing political philosophy skill positioning:

**Axes:**
- X-axis: "Disruption ← → Preservation" (left to right)
- Y-axis: "Tactical ← → Philosophical" (bottom to top)

**All skills represented as equal-sized circles: 120px diameter each**

**Four quadrants with skills plotted as colored circles:**

TOP-RIGHT (Philosophical Preservation):
- "burke-conservative" 
  - Circle: dark green (#006600), 120px diameter
  - Position: X=85% (right), Y=90% (top)
  - Label: "Tradition & Gradual Reform"
  - Sub-label: "Burke, Kirk, Aristotle"

- "civilization-preserve"
  - Circle: medium green (#00cc00), 120px diameter
  - Position: X=80% (right), Y=80% (top)
  - Label: "Social Order & Rule of Law"
  - Sub-label: "Aristotle, Confucius"

BOTTOM-RIGHT (Tactical Preservation):
- "counter-chaos"
  - Circle: teal (#0099cc), 120px diameter
  - Position: X=75% (right), Y=40% (middle-bottom)
  - Label: "Constitutional Defense"
  - Sub-label: "Madison, Tocqueville, Hayek"

TOP-LEFT (Disruption):
- "chaos-seize"
  - Circle: red (#cc0000), 120px diameter
  - Position: X=20% (left), Y=30% (bottom)
  - Label: "Revolutionary Tactics"
  - Sub-label: "Alinsky, Lenin, Mao"

**CRITICAL: All four circles are exactly 120px diameter — the percentages above refer to X/Y position on chart, NOT bubble size.**

**Visual connections:**
- Dashed red line from chaos-seize to civilization-preserve (opposition)
- Dashed red line from chaos-seize to counter-chaos (counter-doctrine)
- Solid green line connecting burke-conservative, civilization-preserve, and counter-chaos (stability coalition)

**Style:** Clean, technical, minimal, professional business chart aesthetic, sans-serif font, clear grid lines
```

## For Vector Diagram Tools (Lucidchart, draw.io, Figma)

**Manual Creation Guide:**

1. **Canvas:** 1200x900px, white background
2. **Axes:** 
   - Draw perpendicular lines intersecting at center
   - Label X-axis: "← Disruption | Preservation →"
   - Label Y-axis: "↓ Tactical | Philosophical ↑"
3. **Plot skills as equal-sized circles (all 120px diameter):**
   - `chaos-seize` — Red (#cc0000) — Position: (240, 630)
   - `civilization-preserve` — Green (#00cc00) — Position: (960, 180)
   - `burke-conservative` — Dark Green (#006600) — Position: (1020, 90)
   - `counter-chaos` — Teal (#0099cc) — Position: (900, 540)
4. **Labels:** 14pt bold skill name inside circle, 10pt source names below
5. **Connections:**
   - Dashed red (2px): chaos-seize ↔ civilization-preserve
   - Dashed red (2px): chaos-seize ↔ counter-chaos
   - Solid green (3px): Triangle connecting BC, CP, CC
6. **Legend:** Bottom-left corner explaining line types

**Note:** All circles must be exactly 120px diameter — consistent sizing is critical for a clean quadrant chart.

## For D3.js / Plotly (Interactive Web Version)

See `assets/interactive-taxonomy.html` for embeddable SVG with hover tooltips showing full skill descriptions.

## Quick ASCII Version (for documentation)

```
        PHILOSOPHICAL
              ↑
              |
     BC ●     |     CP ●
   (Burke)    |  (Civlization)
              |
   ┌──────────┼──────────┐
   │          |          │
 D │          |          │ P
 I │          |          │ R
 S │  CS ●    |    CC ● │ E
 R │ (Chaos)  | (Counter)│ S
 U │          |          │ E
 P │          |          │ R
 T │          |          │ V
   └──────────┼──────────┘
              |
          TACTICAL
              ↓

Legend:
● = Skill position
--- Opposition (red)
━━━ Alliance (green)
```
