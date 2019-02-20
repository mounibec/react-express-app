import constants from "../../common/constants";

const initState = {status: 'offline'};

type ActionType = {
  type: string,
  payload?: object,
};

export const app = (state = initState, action: ActionType) => {
  switch (action.type) {
    case constants.CONNECTED:
      return {
        status: constants.CONNECTED
      };
    case constants.DISCONNECTED:
      return {
        status: constants.DISCONNECTED
      };
    default:
      return state;
  }
};
