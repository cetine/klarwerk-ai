---
name: VertragsKlar
description: Die Randnotiz – ein Vertrag, den jemand Sorgfältiges mit Textmarker und Bleistift durchgegangen ist.
colors:
  desk: "#F2F3F5"
  sheet: "#FFFFFF"
  ink: "#14161A"
  ink-soft: "#454B53"
  rule: "#D5D9DE"
  marker-yellow: "#FFE14D"
  marker-red: "#FF8A98"
  marker-green: "#A6E8A0"
  action: "#14161A"
  action-hover: "#2B3038"
typography:
  display:
    fontFamily: "Archivo (wdth 85), Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 5.2vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  heading:
    fontFamily: "Archivo (wdth 85), sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.1
  body:
    fontFamily: "Archivo (wdth 100), system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  contract:
    fontFamily: "Tinos, Times New Roman, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  note:
    fontFamily: "Archivo (wdth 90), sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.4
  wordmark:
    fontFamily: "Archivo (wdth 85), sans-serif"
    fontSize: "1.375rem"
    fontWeight: 700
    lineHeight: 1
  lead:
    fontFamily: "Archivo (wdth 100), sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.55
  caption:
    fontFamily: "Archivo (wdth 100), sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.45
rounded:
  sheet: "2px"
  control: "6px"
  marker: "0.25em 0.4em 0.3em 0.35em"
  swatch: "0.2rem 0.35rem 0.25rem 0.3rem"
spacing:
  gutter: "16px"
  section: "clamp(5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.sheet}"
    rounded: "{rounded.control}"
    padding: "0 24px"
    height: "56px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    height: "52px"
---

# Design System: VertragsKlar

## Overview
**North star: Die Randnotiz.** The page looks like a contract someone careful has gone through: white A4 sheets lying on a cool grey desk, the problem sentences swiped with a highlighter, the explanation pencilled in the margin. It proves the product by showing the product's output on a (clearly labelled, fictional) contract, not by describing AI.

Scope: the landing page (`app/page.tsx`, `components/landing/*`). `/success`, `AnalysisResults` and `/legal/*` still use the previous Apple-style look and are candidates for the next pass.

## Colors
Restrained strategy: neutrals plus the highlighter set. No blue, no gradients.

### Primary
**Ink** (#14161A) – text, the primary button, the wordmark. Action is black ink, like signing.

### Secondary
**Highlighter set** – the only saturated colors, and they always *mean* something:
- marker-red #FF8A98 = kritisch / wahrscheinlich unwirksam
- marker-yellow #FFE14D = prüfen / verhandeln; also the brand swipe under "Klar" and the focus ring
- marker-green #A6E8A0 = in Ordnung

### Neutral
desk #F2F3F5 (page ground, cool — never cream), sheet #FFFFFF (documents), ink-soft #454B53 (secondary text, ≥ 7:1 on desk), rule #D5D9DE (hairlines).

### Named Rules
- **Marker means risk.** Highlighter colors appear only on document text or as the risk legend. Never as decoration, badges, or backgrounds of UI chrome (one exception: the yellow swipe in the wordmark).
- **No gray-on-gray below 4.5:1.**

## Typography
Archivo (variable, wdth + wght) for everything UI; its narrowed width (wdth ≈ 85) at 700 gives headings a German administrative / DIN-sign sobriety. Tinos (Times-metric) is reserved for quoted contract text, because real Mietverträge are Word printouts in Times.

### Hierarchy
display → heading → body; notes are Archivo 500 at 15px, set in the margin under a hairline with a dashed leader toward the clause. Numbers use tabular figures.

### Named Rules
- **Tinos only for contract text.** Never for headings or UI.
- No gradient text, no tracked uppercase eyebrows over sections.

## Layout
Max content width 1200px, 16px gutter on phones. The hero is two columns on desktop (offer + upload left, sheet right); on phones the upload comes first. Sheets carry a right margin column (≈ 34%) where notes sit; on phones notes drop under the highlighted passage.

## Elevation & Depth
Only sheets have depth: `0 1px 1px rgba(20,22,26,.06), 0 18px 40px -18px rgba(20,22,26,.28)`. Everything else is flat, separated by hairline rules.

## Shapes
Sheets 2px radius (paper), controls 6px. No pills.

## Components
### Buttons
Primary: ink fill, white text, 56px tall, price on the button. Focus: 2px ink outline (offset 2px) plus a 6px marker-yellow halo.

### Inputs / Fields
White field, 1px ink-soft border, 52px tall, visible label above. Errors inline in plain German, never `alert()`.

### Navigation
Thin top bar: wordmark left, four anchors (Beispiel, Ablauf, Preis, FAQ) and a small "Vertrag prüfen" link right; anchors hidden on phones except the CTA.

### Contract sheet (signature)
White A4 fragment, Tinos body, § heading, highlighted phrases (`<mark data-risk>`), margin notes. Each note has a dashed ink leader reaching into the gutter toward its clause (desktop). On first view the hero highlights draw left-to-right once (700ms, ease-out-expo, staggered red → yellow → green); reduced motion shows them already drawn.

### Motion
Curves: `--ease-out-strong` cubic-bezier(0.23,1,0.32,1), `--ease-in-out-strong` cubic-bezier(0.77,0,0.175,1). Everything plays once; nothing loops.
- Hero highlights draw on load (700ms, staggered).
- Upload icon: idle nudge, three soft lifts from 2.4s, stops on hover/focus.
- Errors: 320ms horizontal shake on the field that needs attention (WAAPI), never as decoration.
- File chosen: pay button scrolls into view and swells once (1.03, 420ms).
- Ink buttons: press scale 0.97 (160ms); arrow leans 3px on hover (fine pointers only).
- Links: underline draws from the left on hover (220ms).
- Scroll reveals (`data-reveal`, IntersectionObserver, once): 14px rise + fade, 520ms; sample-report highlights draw as their clause arrives; routing-slip "geprüft" stamps in 160ms apart. Content is visible without JS and above the fold.
- Reduced motion: no nudge, shake, swell or translation; reveals fade only, highlights already drawn.

## Do's and Don'ts
### Do:
- Show real report structure (Vertragstyp, Einschätzung, kritische Klauseln mit Zitat + §, positive Punkte, Verhandlungspunkte).
- Label every sample as fictional.
- Say plainly what the product is: automatisierte Ersteinschätzung durch ein KI-Sprachmodell.
### Don't:
- No icon-tile grids, stat bars, glass, blobs, pulsing dots, emoji, discount popups.
- No claims the product can't back (retention periods, "Multi-KI", ratings).
