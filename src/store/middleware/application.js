import ApplicationActionsType from '../../constants/application-actions';
import { getApplicationDataAsync } from '../../services/application-service';
import { setApplication } from '../actions/application';

const getApplicationAsync = async (dispatch, { payload }) => {
    try {
        const appData = await getApplicationDataAsync();
        if (!!appData) {
            await dispatch(setApplication(appData));
        }
    } catch (error) {
        // display error message
    }
};

const all = (action) => (dispatch) => {
    if (
        action.type &&
        action?.type === ApplicationActionsType.GET_APPLICATION
    ) {
        getApplicationAsync(dispatch, action);
    }

    dispatch(action);
};

export default all;
