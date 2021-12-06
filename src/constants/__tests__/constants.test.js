import '@testing-library/jest-dom';
import { CommandMethod, CommandStatus, NotificationEvent } from 'lime-js';
import ApplicationActions from '../application-actions';
import BlipPortalDestinations from '../blip-portal-destinations';
import BlipPortalToastTypes from '../blip-portal-toast-types';
import CommonActions from '../common-actions';
import IframeMessageProxyActions from '../iframe-message-proxy-actions';
import IframeMessageProxyContainer from '../iframe-message-proxy-container';
import TrackingEvents from '../tracking-events';
import UserActions from '../user-actions';

describe('Constants', () => {
    it('test ApplicationActions values', () => {
        expect(ApplicationActions.GET_APPLICATION).toBe('getApplication');
        expect(ApplicationActions.SET_APPLICATION).toBe('setApplication');
        expect(ApplicationActions.SET_CONFIGURATION).toBe('setConfiguration');
    });

    it('test BlipPortalDestinations values', () => {
        expect(BlipPortalDestinations.MESSAGING_HUB_SERVICE).toBe(
            'MessagingHubService'
        );
        expect(BlipPortalDestinations.BLIP_SERVICE).toBe('BlipService');
    });

    it('test BlipPortalToastTypes values', () => {
        expect(BlipPortalToastTypes.INFO).toBe('info');
        expect(BlipPortalToastTypes.SUCCESS).toBe('success');
        expect(BlipPortalToastTypes.WARNING).toBe('warning');
        expect(BlipPortalToastTypes.DANGER).toBe('danger');
        expect(BlipPortalToastTypes.REFRESH).toBe('refresh');
    });

    it('test CommonActions values', () => {
        expect(CommonActions.GET_LANGUAGE).toBe('getLanguage');
        expect(CommonActions.SET_LANGUAGE).toBe('setLanguage');
        expect(CommonActions.SET_LOADING).toBe('setLoading');
    });

    it('test IframeMessageProxyActions values', () => {
        expect(IframeMessageProxyActions.SEND_COMMAND).toBe('sendCommand');
        expect(IframeMessageProxyActions.START_LOADING).toBe('startLoading');
        expect(IframeMessageProxyActions.STOP_LOADING).toBe('stopLoading');
        expect(IframeMessageProxyActions.HEIGHT_CHANGE).toBe('heightChange');
        expect(IframeMessageProxyActions.SHOW_MODAL).toBe('showModal');
        expect(IframeMessageProxyActions.HIDE_NAVBAR).toBe('hideNavbar');
        expect(IframeMessageProxyActions.SHOW_NAVBAR).toBe('showNavbar');
        expect(IframeMessageProxyActions.GET_CURRENT_LANGUAGE).toBe(
            'getCurrentLanguage'
        );
        expect(IframeMessageProxyActions.TOAST).toBe('toast');
        expect(IframeMessageProxyActions.GET_APPLICATION).toBe(
            'getApplication'
        );
        expect(IframeMessageProxyActions.HAS_PERMISSIONS).toBe(
            'hasPermissions'
        );
        expect(IframeMessageProxyActions.GET_PERMISSIONS_OBJECT).toBe(
            'getPermissionsObject'
        );
        expect(IframeMessageProxyActions.GET_USER_CONTEXT).toBe(
            'getUserContext'
        );
    });

    it('test CommonActions values', () => {
        expect(IframeMessageProxyContainer.CommandMethods).toBe(CommandMethod);
        expect(IframeMessageProxyContainer.CommandStatus).toBe(CommandStatus);
        expect(IframeMessageProxyContainer.NotificationEvents).toBe(
            NotificationEvent
        );
        expect(IframeMessageProxyContainer.Destinations).toBe(
            BlipPortalDestinations
        );
        expect(IframeMessageProxyContainer.Actions).toBe(
            IframeMessageProxyActions
        );
    });

    it('test TrackingEvents values', () => {
        expect(TrackingEvents.EVENT_EXAMPLE).toBe('TRACKING_ACTION_EXAMPLE');
    });

    it('test UserActions values', () => {
        expect(UserActions.GET_LOGGED_USER).toBe('getLoggedUser');
        expect(UserActions.SET_LOGGED_USER).toBe('setLoggedUser');
        expect(UserActions.GET_USER_PERMISSION).toBe('getUserPermission');
        expect(UserActions.SET_USER_PERMISSION).toBe('setUserPermission');
    });
});
