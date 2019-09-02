import userService from '../services/users';

export const getUserStats = () => {
    return async dispatch => {
        const userStats = await userService.getUsers();

        dispatch({
            type: 'INIT_USERSTATS',
            data: userStats
        });
    };
};

const intitalState = {
    userStats: [],
    fetching: true
};

const userStatsReducer = (state = intitalState, action) => {

    switch (action.type) {
    case 'INIT_USERSTATS' :
        return {
            fetching: false,
            userStats: action.data
        };
    default:
        return state;
    }
};

export default userStatsReducer;