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
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components

import Cell from "../components/Cells/Cell"

const ALIVE_KEY = 'o';
const DEAD_KEY = 'x';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [['x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x'],
      ['x', 'x', 'x', 'x', 'x']
    ],
    defaultGridSize: 5,
    active: false,
    cellColourClass: this.props.bgColor
    };
  }


  cellClickHandler = (value, xVal, yVal) => {
    if (!this.state.active) {
        let newGrid = this.state.list;
        if (value === ALIVE_KEY) {
            newGrid[xVal][yVal] = DEAD_KEY
        } else if (value === DEAD_KEY) {
            newGrid[xVal][yVal] = ALIVE_KEY
        }
        console.log(newGrid)
        this.setState({list: newGrid}) 
        console.log("hi")
    }
  }



  /* Function to generate x by x grid based on input */
  generateGrid = (input) => {
    let newList = []
    let count1 = 0
    let count2 = 0
    while(count1 < input) {
      count2 = 0
      let row = []
      while(count2 < input) {
        row.push(DEAD_KEY);
        count2 += 1
      }
      newList.push(row)
      count1 += 1
    }
    this.setState({
      list: newList
    })
  }

  componentDidMount = () => {
    this.generateGrid(this.state.defaultGridSize)
    console.log(this.props.bgColor)
  }

  componentDidUpdate = () => {
    console.log(this.props.bgColor)
    
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
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data1"
                          })}
                          color="info"
                          id="0"
                          size="sm"
                          onClick={() => this.setBgChartData("data1")}
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
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data2"
                          })}
                          onClick={() => this.setBgChartData("data2")}
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
                          tag="label"
                          className={classNames("btn-simple", {
                            active: this.state.bigChartData === "data3"
                          })}
                          onClick={() => this.setBgChartData("data3")}
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
            </Col>
          </Row>





          <div className="grid-container" style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
            {this.state.list.map((row, xVal) => {
            return <Row style={{ display: "flex", justifyContent: "center", width: "auto", height: "1rem"}}>
            {row.map((value, yVal) => (
              <div onClick={() => this.cellClickHandler(value, xVal, yVal)}>
              <Cell 
                key={xVal + yVal}
                bgColourClass={this.props.bgColor}
                value={value} 
                xVal={xVal} 
                yVal={yVal} 
                active={this.state.active} 
                grid={this.state.list} 
                onClick={() => this.cellClickHandler(value, xVal, yVal)}/>
                </div>
            ))}
            <br />
            </Row>
            })}
          </div>

        </div>
      </>
    );
  }
}

export default Dashboard;
