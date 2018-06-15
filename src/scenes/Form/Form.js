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
import Radio from "@material-ui/core/Radio";

import "./Form.css";
import { Header } from "../../components/Header/Header";

class Form extends Component {
  constructor() {
    super();

    this.state = {
      minBikesLeft: "1",
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

  handleChange(e) {
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
              Löydä lähin kaupunkipyöräasema, jossa pyöriä vähintään
            </Typography>
          </Grid>
          <div className="radio-wrapper">
            <Grid container spacing={8}>
              <Grid item xs>
                <Radio
                  name="minBikesLeft"
                  value={"1"}
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.minBikesLeft === "1"}
                />
              </Grid>
              <Grid item xs>
                <Radio
                  name="minBikesLeft"
                  value={"2"}
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.minBikesLeft === "2"}
                />
              </Grid>
              <Grid item xs>
                <Radio
                  name="minBikesLeft"
                  value={"3"}
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.minBikesLeft === "3"}
                />
              </Grid>
              <Grid item xs>
                <Radio
                  name="minBikesLeft"
                  value={"4"}
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.minBikesLeft === "4"}
                />
              </Grid>
              <Grid item xs>
                <Radio
                  name="minBikesLeft"
                  value={"5"}
                  onChange={this.handleChange.bind(this)}
                  checked={this.state.minBikesLeft === "5"}
                />
              </Grid>
            </Grid>
            <Grid container spacing={8}>
              <Grid item xs>
                1
              </Grid>
              <Grid item xs>
                2
              </Grid>
              <Grid item xs>
                3
              </Grid>
              <Grid item xs>
                4
              </Grid>
              <Grid item xs>
                5
              </Grid>
            </Grid>
          </div>

          <Grid item xs={10}>
            <Typography variant="headline" align="center" gutterBottom>
              Näytä asemia
            </Typography>
          </Grid>

          <Grid item xs={10} align="center">
            <FormControl className="form-control">
              <InputLabel htmlFor="results" />
              <Select
                value={this.state.resultsAmount}
                onChange={this.handleChange.bind(this)}
                input={<Input name="resultsAmount" id="results" />}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </Select>
              <FormHelperText>Kappaletta</FormHelperText>
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
