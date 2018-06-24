import React from "react";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import "./BikesAppBar.css";

export const BikesAppBar = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/">
          <IconButton style={{ color: "white" }} aria-label="Back">
            <ArrowBack />
          </IconButton>
        </Link>
        <Typography variant="title" color="inherit" className="appbar-title">
          Lähimmät pyöräasemat
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(BikesAppBar);
