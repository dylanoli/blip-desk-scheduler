import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import RoutesPath from '../constants/routes-path';

import HomePage from '../pages/Home';

import Initialize from './Initialize';
import Analytics from './Analytics';

const Routes = () => (
    <BrowserRouter>
        <Initialize />
        <Analytics>
            <Switch>
                <Route exact path={RoutesPath.HOME.PATH} component={HomePage} />
            </Switch>
        </Analytics>
    </BrowserRouter>
);

export default Routes;
