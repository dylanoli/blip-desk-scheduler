import '@testing-library/jest-dom';
import {
    getApplication,
    setApplication,
    setConfiguration
} from '../application';
import ApplicationActions from '../../../constants/application-actions';
import UserActions from '../../../constants/user-actions';
import {
    getLoggedUser,
    setLoggedUser,
    getUserPermission,
    setUserPermission
} from '../user';

describe('actions', () => {
    it('test Application', () => {
        expect(getApplication('teste')).toStrictEqual({
            payload: 'teste',
            type: ApplicationActions.GET_APPLICATION
        });

        expect(setApplication('teste')).toStrictEqual({
            type: ApplicationActions.SET_APPLICATION,
            payload: 'teste'
        });

        expect(setConfiguration('teste')).toStrictEqual({
            type: ApplicationActions.SET_CONFIGURATION,
            payload: 'teste'
        });
    });

    it('test User', () => {
        expect(getLoggedUser('teste')).toStrictEqual({
            payload: 'teste',
            type: UserActions.GET_LOGGED_USER
        });

        expect(setLoggedUser('teste')).toStrictEqual({
            type: UserActions.SET_LOGGED_USER,
            payload: 'teste'
        });

        expect(getUserPermission('teste')).toStrictEqual({
            type: UserActions.GET_USER_PERMISSION,
            payload: 'teste'
        });

        expect(setUserPermission('teste')).toStrictEqual({
            type: UserActions.SET_USER_PERMISSION,
            payload: 'teste'
        });
    });
});
