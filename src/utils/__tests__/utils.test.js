import '@testing-library/jest-dom';
import { toKebabCase } from '../string';

describe('utils', () => {
    it('test toKebabCase', () => {
        expect(toKebabCase('Dylan Oliveira')).toBe('dylan-oliveira');
    });
});
