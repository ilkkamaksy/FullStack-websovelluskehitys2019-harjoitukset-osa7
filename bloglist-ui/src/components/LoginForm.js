import React from 'react';
import { connect } from 'react-redux';
import { setUsername, setPassword, loginUser, authenticationCheck } from '../reducers/userReducer';

const LoginForm = (props) => {

    if ( props.userdata.user ) {
        return null;
    }

    return (
        <div>
            <h1>Log in to application</h1>
            <form onSubmit={(e) => props.loginUser(e, { username: props.userdata.username, password: props.userdata.password })}>
                <div>
                    username
                    <input value={props.userdata.username} onChange={(e) => props.setUsername(e)} />
                </div>
                <div>
                    password
                    <input value={props.userdata.password} onChange={(e) => props.setPassword(e)}
                    />
                </div>
                <button className="primary" type="submit">login</button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userdata: state.user
    };
};

const connectedLoginForm = connect(
    mapStateToProps,
    {
        setUsername,
        setPassword,
        loginUser,
        authenticationCheck
    }
)(LoginForm);

export default connectedLoginForm;