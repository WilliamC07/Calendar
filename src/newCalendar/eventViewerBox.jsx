import React from 'react';
import {connect} from 'react-redux';

function EventViewerBoxConnect({}){
    return (
        <div>

        </div>
    );
}

function mapStateToProps(store){
    return {

    }
}

function mapDispatchToProps(dispatch){

}

const EventViewerBox = connect(mapStateToProps, mapDispatchToProps)(EventViewerBoxConnect);
export default EventViewerBox;

