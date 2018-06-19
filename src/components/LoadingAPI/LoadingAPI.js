import React from "react";

import DirectionsBike from "@material-ui/icons/DirectionsBike";

export const LoadingAPI = props => {
  return (
    <div>
      <h1>Ladataan pyöräasemia...</h1>
      <DirectionsBike className="loading-icon" />
    </div>
  );
};
export default LoadingAPI;
