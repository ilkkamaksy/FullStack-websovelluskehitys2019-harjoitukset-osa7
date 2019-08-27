import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notice }) => {
    return (
        <div className={`notice notice-${notice.type}`}>
            {notice.message}
        </div>
    );
};

Notification.propTypes = {
    notice: PropTypes.object.isRequired
};

export default Notification;