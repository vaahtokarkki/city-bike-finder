import React from "react";

import DirectionsBike from "@material-ui/icons/DirectionsBike";

export const LoadingAPI = props => {
  return (
    <div className="loading-stations-text">
      <h1>Ladataan pyöräasemia...</h1>
      <DirectionsBike className="loading-icon" />
    </div>
  );
};
export default LoadingAPI;
