import React from "react";

import "./LoadingAPI.css";
import { Header } from "../Header/Header";

import DirectionsBike from "@material-ui/icons/DirectionsBike";

export const LoadingAPI = props => {
  return (
    <div className="loading-stations-wrapper">
      <Header />
      <h1>Ladataan pyöräasemia...</h1>
      <DirectionsBike className="loading-icon" />
    </div>
  );
};
export default LoadingAPI;
