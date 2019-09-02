import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserStats } from '../reducers/userStatsReducer';

const UserStats = (props) => {

    if ( props.userStatsData.userStats.length === 0 ) {
        return null;
    }

    return (
        <div>
            <h2>Users</h2>
            <div className="user-stats__wrapper">
                <div className="user-stats__row user-stats__row--header">
                    <div className="user-stats__col user-stats__col--start">User</div>
                    <div className="user-stats__col user-stats__col--end">Blogs created</div>
                </div>
                { props.userStatsData.userStats.map(userItem => {
                    return (
                        <div className="user-stats__row user-stats__row--body" key={userItem.id}>
                            <div className="user-stats__col user-stats__col--start">
                                <Link to={`/users/${userItem.id}`}>{userItem.name}</Link>
                            </div>
                            <div className="user-stats__col user-stats__col--end">{userItem.blogs.length}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userStatsData: state.userStats
    };
};

const connectedUsers = connect(
    mapStateToProps,
    {
        getUserStats
    }
)(UserStats);

export default connectedUsers;