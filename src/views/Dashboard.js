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
    defaultGridSize: 6,
    active: false,
    toChangePositions: [],
    };
  }

  markCellPositionsToChange = () => {
    let count1 = 0;
    let count2 = 0;
    let markedPositions = [];
    let grid = this.state.list
    for(var i = 0; i < (grid.length) ; i++) {
      for(var j = 0; j < (grid[i].length); j++) {

        let numOfColumns = (grid[i].length - 1)
        let numOfRows = (grid.length - 1)
        // Alive neighbors should only ever get to 3, otherwise BREAK?
        // or if alive neighbors is greater than 3
        let aliveNeighbors = 0;
        /* Need to check all 8 potential neighbours for current cell */

        /* Different cases for ALIVE KEY vs DEAD KEY?*/
        // 1. Up
        if(i - 1 >= 0) {
          if(grid[i-1][j] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 2. Up Right Diagonal
        if(i - 1 >= 0 && j + 1 <= numOfColumns) {
          if(grid[i-1][j+1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 3. Right
        if(j + 1 <= numOfColumns) {
          if(grid[i][j+1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 4. Down Right Diagonal
        if(i + 1 <= numOfRows &&  j + 1 <= numOfColumns) {
          if(grid[i+1][j+1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 5. Down
        if(i + 1 <= numOfRows) {
          if(grid[i+1][j] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
         }
        // 6. Down Left Diagonal
        if(i + 1 <= numOfRows && j - 1 >= 0) {
          if(grid[i+1][j-1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 7. Left
        if(j - 1 >= 0) {
          if(grid[i][j-1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }
        // 8. Up Left Diagonal
        if(i - 1 >= 0 && j - 1 >= 0) {
          if(grid[i-1][j-1] === ALIVE_KEY) {
            aliveNeighbors += 1;
          }
        }

        // Make check to see if current val is alive or dead
        if(grid[i][j] === ALIVE_KEY) {
          if(aliveNeighbors !== 2 && aliveNeighbors !== 3) {
            markedPositions.push([j, i])
          }
        } else if (grid[i][j] === DEAD_KEY) {
          if(aliveNeighbors === 3) {
            markedPositions.push([j, i])
          }
        }

      }
    }
    return markedPositions;
  }

    makeCellValueSwaps = (markedPositions) => {
    let grid = this.state.list;
    markedPositions.forEach(position => {
      // Swap value in grid
      let x = position[0];
      let y = position[1];
      console.log(x, y)

      if(grid[x][y] === ALIVE_KEY) {
        grid[x][y] = DEAD_KEY;
      } else if(grid[x][y] === DEAD_KEY) {
        grid[x][y] = ALIVE_KEY;
      }
    })
    return grid;
  }

  makeGridStateChange = () => {
    if(this.state.active) {
      let markedPositions = this.markCellPositionsToChange()
      console.log(markedPositions)
      let newGrid = this.makeCellValueSwaps(markedPositions)
      console.log(newGrid)
      this.setState({list: newGrid})
    }
  }

  cellClickHandler = (value, xVal, yVal) => {
    if (!this.state.active) {
        let newGrid = this.state.list;
        if (value === ALIVE_KEY) {
            newGrid[xVal][yVal] = DEAD_KEY
        } else if (value === DEAD_KEY) {
            newGrid[xVal][yVal] = ALIVE_KEY
        }
        this.setState({list: newGrid}) 
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

  handleStartClick = () => {
    this.setState({active: true})
    console.log("Should be started")
}
  startGridChanges = () => {
    if(this.state.active) {
      setTimeout(this.makeGridStateChange, 1000)
    }
  }
  handleStopClick = () => {
    this.setState({active: false})
    console.log("Should be stopped")
  }


  render() {
    return (
      <>
      {this.startGridChanges()}
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
                grid={this.state.list} 
                onClick={() => {
                  if(!this.state.active) { 
                    this.cellClickHandler(value, xVal, yVal)}
                  }
                  }/>
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
