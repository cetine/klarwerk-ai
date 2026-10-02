import { PRICE_CENTS, PRICE_EUR, PRICE_LABEL, PRICE_SCHEMA } from '@/lib/pricing';

describe('pricing', () => {
    it('derives every representation from the cent amount', () => {
        expect(PRICE_CENTS).toBe(499);
        expect(PRICE_EUR).toBe(4.99);
        expect(PRICE_SCHEMA).toBe('4.99');
    });

    it('formats the label in German notation', () => {
        expect(PRICE_LABEL).toBe('4,99\u00a0€');
    });
});
