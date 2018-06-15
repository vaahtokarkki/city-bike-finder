import React, { Component } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { withRouter } from 'react-router'

import BikeStationList from "./BikeStationList.js";

import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";

import "./Results.css";

class Results extends Component {

  render() {
    if(this.props.stations.length === 0) {
      this.props.history.push("/");
      return null;
    }

    return (
      <div className="results-wrapper">
        <AppBar position="static">
          <Toolbar>
            <Link to="/">
              <IconButton
                style={{color:"white"}}
                aria-label="Back"
              >
                <ArrowBack />
              </IconButton>
            </Link>
            <Typography
              variant="title"
              color="inherit"
              className="appbar-title"
            >
              Lähimmät pyöräasemat
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="resultslist-wrapper">
          <Grid container spacing={0} justify="center">
            <Grid item xs={10}>
              <BikeStationList stations={this.props.stations} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

Results.propTypes = {
  stations: PropTypes.array,
  backFunc: PropTypes.func
};

export default withRouter(Results);
