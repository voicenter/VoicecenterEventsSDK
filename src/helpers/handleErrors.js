import {Notification} from 'element-ui';
import get from 'lodash/get';

const parseCatch = (apiError, showAxiosErrorMessage = false) => {
    let message;

    if (get(apiError.response, 'data')) {
        message = apiError.response.data.message
    } else if (apiError.message) {
        message = apiError.message
    }

    if (showAxiosErrorMessage && message) {
        Notification.error(message);
    }
};

export default parseCatch;
