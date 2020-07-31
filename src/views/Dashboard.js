/*!

=========================================================
* Black Dashboard React v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Input,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from "reactstrap";

// core components

import Grid from "../components/Grid/Grid"
const ALIVE_KEY = 'o';
const DEAD_KEY = 'x';
const GRID_SIZE = 8


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      defaultGridSize: GRID_SIZE,
      reset: false,
      currentGeneration: 1
    }
  }

  handleStartClick = () => {
    this.setState({active: true})
    console.log("Should be started")
  }
  handleStopClick = () => {
    this.setState({active: false})
    console.log("Should be stopped")
  }

  handleClearClick = () => {
    if (!this.state.active) {
      this.setState({reset: !this.state.reset})
    }
  }

  handleGridSize = (input) => {
    this.setState({defaultGridSize: input, reset: true})
  }


  setActive = (input) => {
    this.setState({active: input})
  }
  setReset = (input) => {
    this.setState({reset: input})
  }
  updateCurrentGeneration = () => {
    this.setState({currentGeneration: this.state.currentGeneration + 1})
  }

  resetGeneration = () => {
    this.setState({currentGeneration: 1})
    this.setActive(false)
    this.setReset(false)
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col xs="12">
              <Card className="card-chart">
                <CardHeader>
                  <Row>
                    <Col className="text-left" sm="6">
                      <CardTitle tag="h2">Conways Game of Life</CardTitle>
                    </Col>
                    <Col sm="6">
                      <ButtonGroup
                        className="btn-group-toggle float-right"
                        data-toggle="buttons"
                      >
                        <Button
                          className={classNames("btn-simple")}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.handleStartClick()}
                        >
                          <input
                            defaultChecked
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Start
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="1"
                          size="sm"
                          className={classNames("btn-simple")}
                          onClick={() => this.handleStopClick()}
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Stop
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-gift-2" />
                          </span>
                        </Button>
                        <Button
                          color="info"
                          id="2"
                          size="sm"
                          className={classNames("btn-simple")}
                          onClick={this.handleClearClick
                          }
                        >
                          <input
                            className="d-none"
                            name="options"
                            type="radio"
                          />
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            Clear
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-tap-02" />
                          </span>
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
              <Col>
              <UncontrolledDropdown group>
                      <DropdownToggle caret color="info" data-toggle="dropdown">
                          Choose Grid Size
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem onClick={() => this.handleGridSize(25)}>25 x 25</DropdownItem>
                          <DropdownItem onClick={() => this.handleGridSize(30)}>30 x 30</DropdownItem>
                          <DropdownItem onClick={() => this.handleGridSize(45)}>45 x 45</DropdownItem>
                      </DropdownMenu>
                  </UncontrolledDropdown>
                  </Col>
                  <Col>
                  <span>
                    Current Generation: {this.state.currentGeneration}
                  </span>
                  </Col>

                  </Col>
                  
          </Row>
          <Grid 
            bgColor={this.props.bgColor}
            active={this.state.active}
            reset={this.state.reset}
            setActive={this.setActive}
            setReset={this.setReset}
            defaultGridSize={this.state.defaultGridSize}
            currentGeneration={this.state.currentGeneration}
            updateCurrentGeneration={this.updateCurrentGeneration}
            resetGeneration={this.resetGeneration}
            />

<Col>
            <UncontrolledDropdown group>
                      <DropdownToggle caret color="info" data-toggle="dropdown">
                          Choose Speed
                      </DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem onClick={() => this.handleGridSize(25)}> x 2</DropdownItem>
                          <DropdownItem onClick={() => this.handleGridSize(30)}> x 4</DropdownItem>
                          <DropdownItem onClick={() => this.handleGridSize(45)}> x 6</DropdownItem>
                      </DropdownMenu>
                  </UncontrolledDropdown>
                  <br />
                  </Col>
            <Col>
                  <span>
                    Rules: 
                    <p>
                    Any live cell with fewer than two live neighbours dies, as if by underpopulation.</p>
<p>Any live cell with two or three live neighbours lives on to the next generation.</p>
<p>Any live cell with more than three live neighbours dies, as if by overpopulation.</p>
<p>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</p>
                  </span>
                  </Col>


        </div>
      </>
    );
  }
}

export default Dashboard;
