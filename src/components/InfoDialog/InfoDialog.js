import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

import GitHubLogo from "../../images/GitHub_Logo.png"

import "./InfoDialog.css"

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class InfoDialog extends Component {
  constructor() {
      super();
      
      this.state = {
          open: false
      };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Tietoa sivusta"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Voit löytää sovelluksella sinua lähimmät pyöräasemat, joissa vapaita pyöriä vähintään haluttu määrä.<br /><br />
              Tiedot haetaan HSL tarjoamasta rajapinnasta ja ovat reaaliaikaisia.
              <img src={GitHubLogo} alt="GitHub" className="github-logo" />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Sulje
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default InfoDialog;