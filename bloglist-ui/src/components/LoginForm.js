import React from 'react';
import { connect } from 'react-redux';
import { setUsername, setPassword, loginUser, authenticationCheck } from '../reducers/userReducer';

const LoginForm = (props) => {

    if ( props.userdata.user ) {
        return null;
    }

    return (
        <div className="form form__login">
            <h3>Log in</h3>
            <form onSubmit={(e) => props.loginUser(e, { username: props.userdata.username, password: props.userdata.password })}>
                <div>
                    <label>Username</label>
                    <input
                        id="username"
                        data-cy="username"
                        value={props.userdata.username}
                        onChange={(e) => props.setUsername(e)}
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        id="password"
                        type="password"
                        data-cy="pw"
                        value={props.userdata.password}
                        onChange={(e) => props.setPassword(e)}
                    />
                </div>
                <button className="primary login submit" data-cy="login" type="submit">Login</button>
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