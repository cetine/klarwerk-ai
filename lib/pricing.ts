// Single source of truth for the displayed price. The amount actually charged comes from the
// Stripe Price behind STRIPE_PRICE_ID, which must be kept at the same value.
export const PRICE_CENTS = 499;

export const PRICE_EUR = PRICE_CENTS / 100;

/**
 * German display form, e.g. "4,99 €" (non-breaking space before the euro sign).
 * Built by hand rather than with Intl so server and browser render the identical string.
 */
export const PRICE_LABEL = `${PRICE_EUR.toFixed(2).replace(".", ",")} €`;

/** Machine-readable form for JSON-LD, e.g. "4.99". */
export const PRICE_SCHEMA = PRICE_EUR.toFixed(2);
