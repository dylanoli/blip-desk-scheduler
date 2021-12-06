import '@testing-library/jest-dom';
import { IframeMessageProxy } from 'iframe-message-proxy';
import { getResourceAsync } from '../resources-service';

jest.mock('iframe-message-proxy');

describe('services', () => {
    it('resources', async () => {
        IframeMessageProxy.sendMessage.mockImplementationOnce((body) => {
            return Promise.resolve({ response: 'response test' });
        });
        expect.assertions(1);
        const resultGet = await getResourceAsync('test');
        expect(resultGet).toStrictEqual('response test');
    });
});
