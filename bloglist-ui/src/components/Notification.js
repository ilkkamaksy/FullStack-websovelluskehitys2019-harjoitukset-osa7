import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {

    if ( !props.notice.content ) {
        return null;
    }

    return (
        <div className={`notice notice-${props.notice.type}`}>
            {props.notice.content}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notice: state.notice
    };
};


const connectedNotice = connect(mapStateToProps)(Notification);
export default connectedNotice;