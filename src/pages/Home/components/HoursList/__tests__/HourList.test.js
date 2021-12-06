import React from 'react';
import '@testing-library/jest-dom';

import { render, screen, fireEvent } from '@testing-library/react';
import { DEFAULT_TIME } from '../../../constants';
import HoursList from '..';

describe('Day off', () => {
    const emptyFunction = jest.fn();
    const typeFunction = (indexWeek, indexHour, event) => {
        screen.queryByTestId('ipt-change-start-work-time-1-0').value =
            event.target.value;
    };
    let rtlContainer;

    beforeEach(() => {
        const { container } = render(
            <HoursList
                workTimes={DEFAULT_TIME.weekdays[1].workTimes}
                index={1}
                changeStart={typeFunction}
                changeEnd={emptyFunction}
                removeWorkTime={emptyFunction}
                addWorkTime={emptyFunction}
            />
        );
        rtlContainer = container;
    });

    it('should render correctly', () => {
        expect(screen.queryByTestId('btn-add-work-time-1')).toBeInTheDocument();
        expect(
            screen.queryByTestId('btn-remove-work-time-1-0')
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId('ipt-change-start-work-time-1-0')
        ).toBeInTheDocument();
    });

    it('should handle click add work time event', () => {
        const backButtonNode = screen.queryByTestId('btn-add-work-time-1');
        fireEvent.click(backButtonNode);
        expect(emptyFunction).toHaveBeenCalledTimes(1);
    });

    it('should handle click remove work time event', () => {
        const backButtonNode = screen.queryByTestId('btn-remove-work-time-1-0');
        fireEvent.click(backButtonNode);
        expect(emptyFunction).toHaveBeenCalledTimes(2);
    });
});
