import { isTenancyContract, nebenkostenNinjaUrl } from '@/lib/crosssell';

describe('isTenancyContract', () => {
    it.each(['Mietvertrag', 'Wohnraummietvertrag', 'Untermietvertrag', 'Staffelmietvertrag über Wohnraum', 'MIETVERTRAG'])(
        'recognises %s',
        (type) => expect(isTenancyContract(type)).toBe(true)
    );

    it.each(['Arbeitsvertrag', 'Kaufvertrag', 'AGB', '', undefined])('ignores %s', (type) =>
        expect(isTenancyContract(type)).toBe(false)
    );
});

describe('nebenkostenNinjaUrl', () => {
    it('adds the UTM parameters for the report', () => {
        expect(nebenkostenNinjaUrl('report')).toBe(
            'https://nebenkosten-ninja.de/?utm_source=vertragsklar&utm_medium=report&utm_campaign=crosssell'
        );
    });

    it.each(['footer', 'popup'] as const)('marks %s clicks separately', (placement) => {
        expect(new URL(nebenkostenNinjaUrl(placement)).searchParams.get('utm_medium')).toBe(placement);
    });
});
