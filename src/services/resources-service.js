import { IframeMessageProxy } from 'iframe-message-proxy';
import IMPConstants from '../constants/iframe-message-proxy-container';

const BASE_URI = '/resources';
const TYPE_TEXT = 'text/plain';

const getResourceAsync = async (resource) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.SEND_COMMAND,
            content: {
                destination: IMPConstants.Destinations.MESSAGING_HUB_SERVICE,
                command: {
                    method: IMPConstants.CommandMethods.GET,
                    uri: `${BASE_URI}/${resource}`
                }
            }
        });
        return response;
    } catch (error) {
        return {};
    }
};

const saveResourceAsync = async (resource, content) => {
    try {
        const { response } = await IframeMessageProxy.sendMessage({
            action: IMPConstants.Actions.SEND_COMMAND,
            content: {
                destination: IMPConstants.Destinations.MESSAGING_HUB_SERVICE,
                command: {
                    method: IMPConstants.CommandMethods.SET,
                    uri: `${BASE_URI}/${resource}`,
                    type: TYPE_TEXT,
                    resource: JSON.stringify(content)
                }
            }
        });
        return response;
    } catch (error) {
        return {};
    }
};

export { getResourceAsync, saveResourceAsync };
