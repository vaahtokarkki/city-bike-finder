import React from "react";

import Header from "../../components/Header/Header";
import WaitingLocation from "../../components/WaitingLocation/WaitingLocation";

export const WaitingLocationScene = (props) => {
    return (
        <div className="waiting-location-wrapper">
        <Header />
        <WaitingLocation userDennied={props.userDennied} />
        </div>
    );
}

export default WaitingLocation;
