import React from "react";

import Header from "../../components/Header/Header";
import LoadingAPI from "../../components/LoadingAPI/LoadingAPI";

import "./LoadingStations.css";

export const LoadingStations = props => {
  return (
    <div className="loading-stations-wrapper">
      <Header />
      <LoadingAPI />
    </div>
  );
};

export default LoadingStations;
