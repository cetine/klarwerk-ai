# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Private individuals in Germany (tenants, employees, consumers) holding a contract they have signed or are about to sign — Mietvertrag, Arbeitsvertrag, Kaufvertrag, AGB. They are not lawyers, are uneasy about what they might be agreeing to, and want a fast, cheap first opinion before deciding whether to sign, negotiate, or go to a Mieterverein / Fachanwalt.

## Product Purpose
Upload a contract, pay 3,99 € once, get an automated first assessment in the browser: contract type, overall score and traffic-light risk level, critical clauses quoted from the contract with explanation and legal basis (§), positive aspects, negotiation points, recommendations. Success = the visitor understands what in their contract is worth worrying about, in plain German, within minutes.

## Positioning
One-off 3,99 € per contract, no account, no subscription. Clause-level findings quoted from the user's own contract with the relevant §, not a generic checklist.

## Operating Context
Flow: upload (PDF, DOC, DOCX, TXT, max 50 MB; text is extracted server-side) + e-mail → Stripe Checkout → /success runs the analysis and shows the report in the browser; "Als PDF speichern" via print. The e-mail goes to Stripe (receipt); the report is NOT e-mailed.

## Capabilities and Constraints
- Analysis today = one call to an OpenAI language model (gpt-4o-mini) with a legal review prompt. Not trained on BGB, no "Vergleichsdaten". The page describes the planned five-examiner council (Vertragsrecht, AGB-Recht, Mietrecht, Arbeitsrecht, Kosten & Fristen + Schlussprüfung) — see launch gate.
- The upload happens before payment.
- Scanned PDFs without a text layer cannot be read (no OCR).
- Owner decision 2026-09-23: the landing page states "DSGVO-konform", "Automatische Löschung nach 24 Stunden", "Serverstandort Deutschland", "Made in Germany" and presents a five-examiner "KI-Expertenrat". The owner will make these true before launch.
- LAUNCH GATE (not true as of 2026-09-23, must be built before this page goes live): private Blob + deletion after 24 h incl. existing files; multi-examiner analysis (currently one gpt-4o-mini call); functions, storage and model hosted in Germany (OpenAI is US today); Datenschutzerklärung + AVV naming all processors.
- OPEN: Datenschutzerklärung does not yet name OpenAI as processor.
- Contact address is noreply@vertragsklar.de for now (owner decision 2026-09-23).

## Brand Commitments
Name "VertragsKlar". Formal "Sie". Operator (Enver Cetin) appears only in the Impressum, not on the landing page (owner decision 2026-09-23). No discount popups.

## Evidence on Hand
No testimonials, ratings, user counts, or press. None may be invented (the former JSON-LD aggregateRating 4.8/1250 was fabricated and is removed). Sample reports on the site are synthetic and must be labelled as such.

## Product Principles
1. Show the report, don't describe the AI.
2. Every claim on the page must be true of the running product today.
3. Honest about limits: automated first assessment, not legal advice; point to Mieterverein, Verbraucherzentrale, Fachanwalt for serious findings.
4. The pay moment carries its own reassurance: what happens, in what order, for what price.

## Accessibility & Inclusion
WCAG 2.2 AA: text contrast ≥ 4.5:1, touch targets ≥ 44 px, keyboard-operable upload.
