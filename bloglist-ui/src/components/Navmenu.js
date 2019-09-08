import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';

const Navmenu = (props) => {

    if ( !props.userdata.user ) {
        return null;
    }

    return (
        <div className="navbar">
            <div className="nav__container">
                <div className="nav__section nav__section--start">
                    <Link to="/"><span data-cy="nav-item-blogs" className="menu-item__text">Blogs</span></Link>
                    <Link to="/users"><span data-cy="nav-item-users" className="menu-item__text">Users</span></Link>
                </div>
                <div className="nav__section nav__section--end">
                    <span>{ props.userdata.user.name} logged in</span>
                    <button className="primary" onClick={props.logoutUser}>Logout</button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userdata: state.user
    };
};

const connectedNavmenu = connect(mapStateToProps, { logoutUser })(Navmenu);

export default connectedNavmenu;