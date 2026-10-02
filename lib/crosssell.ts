// Cross-link to Nebenkosten-Ninja, the sister product for checking utility bills.
const NEBENKOSTEN_NINJA_URL = "https://nebenkosten-ninja.de";

export type CrossSellPlacement = "report" | "footer" | "popup";

export function nebenkostenNinjaUrl(placement: CrossSellPlacement): string {
    const url = new URL(NEBENKOSTEN_NINJA_URL);
    url.searchParams.set("utm_source", "vertragsklar");
    url.searchParams.set("utm_medium", placement);
    url.searchParams.set("utm_campaign", "crosssell");
    return url.toString();
}

/**
 * contractType is free text from the model ("Mietvertrag", "Wohnraummietvertrag",
 * "Untermietvertrag", ...), so match the word stem instead of an exact value.
 */
export function isTenancyContract(contractType: string | undefined): boolean {
    return /miet/i.test(contractType ?? "");
}
