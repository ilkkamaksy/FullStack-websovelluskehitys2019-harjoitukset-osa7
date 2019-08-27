import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
    handleSubmit,
    usernameInput,
    passwordInput,
}) => {

    return (
        <div>
            <h1>Log in to application</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input { ...usernameInput}
                    />
                </div>
                <div>
                    password
                    <input {...passwordInput}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};

export default LoginForm;