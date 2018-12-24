import React, { Component } from 'react';
import QRCode from 'qrcode.react';
import ECDSA from 'ecdsa-secp256r1/browser';
import { Button, Grid, Row, Col, FormGroup, ControlLabel, FormControl, Jumbotron } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { bottle: 0, can: 0, str: '' };
    this.handleClick = this.handleClick.bind(this);
    this.handleCan = this.handleCan.bind(this);
    this.handleBottle = this.handleBottle.bind(this);
  }

  handleClick() {
    const machineInfo = {
      log: 121.568780,
      lat: 25.034520,
      name: 'GreenCash Demo No.0001',
      id: 'DEMO0001'
    }

    let qr_str = JSON.stringify({
      info: machineInfo,
      content: {
        bottle: this.state.bottle,
        can: this.state.can,
      },
      time: (new Date()).getTime()
    })

    ECDSA.fromJWK({
      kty: 'EC',
      crv: 'P-256',
      x: 'TBJBm5OHQj2EyMwZosrLNl4-yxu5mf_0AianU0vQGy0',
      y: 'dJioz6Rh6MyeVwPBzQp_xKMjcZRT93Ql9dLDbbFwTsg',
      d: 'ADDkdPByhN0ed3CQR_HsAuVOLe5xKO_34x0NbheRctA'
    })
      .then(privateKey => {
        return privateKey.sign(qr_str);
      })
      .then(result => {
        console.log(result)
        this.setState({
          ...this.state,
          str: JSON.stringify({ content: qr_str, signature: result })
        })
      })
  }

  handleCan(e) {
    this.setState({ can: e.target.value });
  }

  handleBottle(e) {
    this.setState({ bottle: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <body>
          <Grid>
            <Row className="align-middle">
              <Col sm={4} md={8}>
                <Jumbotron>
                  <p> GreenCash DEMO QRcode Generator</p>
                </Jumbotron>
              </Col>
            </Row>
            <Row className="align-middle">
              <Col sm={8} md={4}>
                <p>
                  <QRCode className="align-middle" value={this.state.str} />
                </p>
                <Button onClick={this.handleClick}>Generate QR Code</Button>
              </Col>
              <Col sm={8} md={4}>
                <form>
                  <FormGroup
                    controlId="formBasicText"
                  >
                    <ControlLabel>Amount of Cans</ControlLabel>
                    <FormControl
                      type="number"
                      min="0"
                      value={this.state.can}
                      placeholder="0"
                      onChange={this.handleCan}
                    />
                    <ControlLabel>Amount of Bottles</ControlLabel>
                    <FormControl
                      type="number"
                      min="0"
                      value={this.state.bottle}
                      placeholder="0"
                      onChange={this.handleBottle}
                    />
                  </FormGroup>
                </form>
              </Col>
            </Row>
          </Grid>
        </body>
      </div>
    );
  }
}

export default App;
