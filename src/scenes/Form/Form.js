import React, { Component } from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";


import "./Form.css";
import { Header } from "../../components/Header/Header";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      minBikesLeft: 1,
      resultsAmount: 5
    };
  }

  onClickSubmit() {
    this.props.submit({
      minBikesLeft: this.state.minBikesLeft,
      resultsAmount: this.state.resultsAmount
    });
  }

  onClickFindEmpty() {
    this.props.submit({
      minBikesLeft: -1,
      resultsAmount: this.state.resultsAmount
    });
  }

  handeSelectChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Header />
        <Grid container spacing={0} justify="center" className="grid-container">
          <Grid item xs={10}>
            <Typography variant="headline" align="center" gutterBottom>
              Löydä lähin kaupunkipyöräasema jossa vähintään pyöriä
            </Typography>
          </Grid>

          <Grid item xs={10} align="center">
            <FormControl className="form-control">
              <InputLabel htmlFor="minBikes" />
              <Select
                value={this.state.minBikesLeft}
                onChange={this.handeSelectChange.bind(this)}
                input={<Input name="minBikesLeft" id="minBikes" />}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
              <FormHelperText>Pyöriä vähintään</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={10}>
            <Typography variant="headline" align="center" gutterBottom>
              Näytä tuloksia
            </Typography>
          </Grid>

          <Grid item xs={10} align="center">
            <FormControl className="form-control">
              <InputLabel htmlFor="results" />
              <Select
                value={this.state.resultsAmount}
                onChange={this.handeSelectChange.bind(this)}
                input={<Input name="resultsAmount" id="results" />}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
              <FormHelperText>Tuloksia</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={10} align="center">
            <Button
              variant="flat"
              color="primary"
              className="submit-button"
              onClick={this.onClickSubmit.bind(this)}
            >
              HAE 
            </Button>
          </Grid>
          <Grid item xs={10} align="center">
            <Button
              variant="outlined"
              color="primary"
              className="submit-button-outlined"
              onClick={this.onClickFindEmpty.bind(this)}
            >
              LÖYDÄ LÄHIN TYHJÄ ASEMA
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Form.propTypes = {
  submit: PropTypes.func
};

export default Form;
