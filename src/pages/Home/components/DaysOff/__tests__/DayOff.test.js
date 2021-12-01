import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import DayOff from '../DayOff';
import { DEFAULT_TIME } from '../../../constants';

describe('Day off', () => {
    const emptyFunction = jest.fn();
    let rtlContainer;

    beforeEach(() => {
        const { container } = render(
            <DayOff
                noWorkDays={DEFAULT_TIME.noWorkDays}
                changeDayOff={emptyFunction}
                removeDayOff={emptyFunction}
                addDayOff={emptyFunction}
            />
        );
        rtlContainer = container;
    });

    it('should render correctly', () => {
        expect(screen.queryByTestId('day-off')).toBeInTheDocument();
        expect(screen.queryByTestId('btn-remove-0')).toBeInTheDocument();
        expect(screen.queryByTestId('ipt-data-0')).toBeInTheDocument();
    });

    it('should handle click remove event', () => {
        const backButtonNode = screen.queryByTestId('btn-remove-0');
        fireEvent.click(backButtonNode);
        expect(emptyFunction).toHaveBeenCalledTimes(1);
    });
});
