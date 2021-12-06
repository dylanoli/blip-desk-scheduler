import '@testing-library/jest-dom';
import { locale } from '..';

describe('pt-br', () => {
    it('test Titles', () => {
        expect(locale.pt.translations.title.homePage).toBe(
            'Blip desk scheduler'
        );
    });
});
