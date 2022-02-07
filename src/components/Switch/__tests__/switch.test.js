import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Switch from '../Switch';

describe('Switch component', () => {
    const handleChange = jest.fn();

    it('should render correctly', () => {
        const { container } = render(
            <Switch name="test" checked={false} onChange={handleChange} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});
