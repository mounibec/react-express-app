import {Dispatch} from 'redux';

import constants from '../../common/constants';

export const connect = () => (dispatch: Dispatch) => dispatch({type: constants.CONNECTED});
