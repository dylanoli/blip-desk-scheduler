import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Home from '../Home';
import { getApplicationDataAsync } from '../../../services/application-service';
import { getResourceAsync } from '../../../services/resources-service';
import { DEFAULT_TIME } from '../constants';

jest.mock('../../../services/application-service');
jest.mock('../../../services/resources-service');
describe('Home page', () => {
    const history = createMemoryHistory();
    const mockedOpen = jest.fn();
    const originalOpen = window.open;

    beforeAll(() => {
        delete window.open;
        window.open = mockedOpen;
    });

    afterAll(() => {
        // Restore original
        window.open = originalOpen;
    });

    it('should navigate to repository', () => {
        render(
            <Router history={history}>
                <Home />
            </Router>
        );

        const repositoryButton = screen.getByTestId('repository-link');
        expect(repositoryButton).toBeInTheDocument();

        userEvent.click(repositoryButton);
        expect(mockedOpen).toHaveBeenCalled();
        expect(mockedOpen).toHaveBeenCalledTimes(1);
        expect(mockedOpen).toHaveBeenCalledWith(
            'https://github.com/dylanoli/blip-desk-scheduler',
            '_blank'
        );
    });

    it('load content without resource', async () => {
        getApplicationDataAsync.mockImplementationOnce(() => {
            return Promise.resolve({ shortName: 'test' });
        });

        render(
            <Router history={history}>
                <Home />
            </Router>
        );

        const repositoryButton = screen.getByTestId('repository-link');
        expect(repositoryButton).toBeInTheDocument();

        userEvent.click(repositoryButton);
        expect(mockedOpen).toHaveBeenCalled();
        expect(mockedOpen).toHaveBeenCalledWith(
            'https://github.com/dylanoli/blip-desk-scheduler',
            '_blank'
        );
    });

    it('load content without resource complete', async () => {
        getApplicationDataAsync.mockImplementationOnce(() => {
            return Promise.resolve({ shortName: 'test' });
        });

        getResourceAsync.mockImplementationOnce(() => {
            return Promise.resolve(JSON.stringify({ weekdays: [] }));
        });
        render(
            <Router history={history}>
                <Home />
            </Router>
        );

        const repositoryButton = screen.getByTestId('repository-link');
        expect(repositoryButton).toBeInTheDocument();

        userEvent.click(repositoryButton);
        expect(mockedOpen).toHaveBeenCalled();
        expect(mockedOpen).toHaveBeenCalledWith(
            'https://github.com/dylanoli/blip-desk-scheduler',
            '_blank'
        );
    });

    it('load content with resource and times null', async () => {
        getApplicationDataAsync.mockImplementationOnce(() => {
            return Promise.resolve({ shortName: 'test' });
        });

        getResourceAsync.mockImplementationOnce(() => {
            return Promise.resolve(JSON.stringify(DEFAULT_TIME));
        });

        render(
            <Router history={history}>
                <Home />
            </Router>
        );

        const repositoryButton = screen.getByTestId('repository-link');
        expect(repositoryButton).toBeInTheDocument();

        userEvent.click(repositoryButton);
        expect(mockedOpen).toHaveBeenCalled();
        expect(mockedOpen).toHaveBeenCalledWith(
            'https://github.com/dylanoli/blip-desk-scheduler',
            '_blank'
        );
    });

    it('load content with resource and times default', async () => {
        React.useState = jest.fn().mockReturnValue([DEFAULT_TIME, jest.fn()]);

        getApplicationDataAsync.mockImplementationOnce(() => {
            return Promise.resolve({ shortName: 'test' });
        });

        getResourceAsync.mockImplementationOnce(() => {
            return Promise.resolve(JSON.stringify(DEFAULT_TIME));
        });

        render(
            <Router history={history}>
                <Home />
            </Router>
        );

        const btnAddWworkTime = screen.getByTestId('btn-add-work-time-1');
        expect(btnAddWworkTime).toBeInTheDocument();
        userEvent.click(btnAddWworkTime);

        const btnRemoveWworkTime = screen.getByTestId(
            'btn-remove-work-time-1-0'
        );
        expect(btnRemoveWworkTime).toBeInTheDocument();
        userEvent.click(btnRemoveWworkTime);

        const repositoryButton = screen.getByTestId('repository-link');
        expect(repositoryButton).toBeInTheDocument();

        userEvent.click(repositoryButton);
        expect(mockedOpen).toHaveBeenCalled();
        expect(mockedOpen).toHaveBeenCalledWith(
            'https://github.com/dylanoli/blip-desk-scheduler',
            '_blank'
        );
    });
});
