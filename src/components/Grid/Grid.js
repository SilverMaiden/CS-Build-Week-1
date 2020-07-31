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

// reactstrap components
import {Row} from "reactstrap";

// core components

import Cell from "../Cells/Cell"

const ALIVE_KEY = 'o';
const DEAD_KEY = 'x';
const GRID_SIZE = 8

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: this.props.grid,
      defaultGridSize: GRID_SIZE,
        toChangePositions: [],
        };
    }

  markCellPositionsToChange = () => {
    let markedPositions = [];
    let grid = this.state.grid
    for(var i = 0; i < (grid.length); i++) {
      for(var j = 0; j < (grid[i].length); j++) {

        let numOfColumns = (grid[i].length - 1)
        let numOfRows = (grid.length - 1)
        console.log(numOfRows)
        console.log(numOfColumns)
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
    console.log(markedPositions)
    return markedPositions;
  }

    makeCellValueSwaps = (markedPositions) => {
    let grid = this.state.grid;
    markedPositions.forEach(position => {
      // Swap value in grid
      let first = position[1];
      let second = position[0];
      console.log(grid[first][second])

      if(grid[first][second] === ALIVE_KEY) {
        grid[first][second] = DEAD_KEY;
      } else if(grid[first][second] === DEAD_KEY) {
        grid[first][second] = ALIVE_KEY;
      }
    })
    return grid;
  }

  makeGridStateChange = () => {
    if(this.props.active) {
      let markedPositions = this.markCellPositionsToChange()
      console.log(markedPositions)
      let newGrid = this.makeCellValueSwaps(markedPositions)
      console.log(newGrid)
      this.setState({grid: newGrid})
    }
  }

  cellClickHandler = (value, xVal, yVal) => {
    if (!this.props.active) {
        let newGrid = this.state.grid;
        if (value === ALIVE_KEY) {
            newGrid[xVal][yVal] = DEAD_KEY
        } else if (value === DEAD_KEY) {
            newGrid[xVal][yVal] = ALIVE_KEY
        }
        this.setState({grid: newGrid}) 
    }
  }


  componentWillMount = () => {
    console.log(this.props.bgColor)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }


  startGridChanges = () => {
    if(this.props.active) {
      setTimeout(this.makeGridStateChange, 500)
    }
  }



  render() {
    return (
          <div className="grid-container" style={{display: "flex", flexFlow: "column", alignItems: "center"}}>
              {this.startGridChanges()}
            {this.state.grid.map((row, xVal) => {
            return <Row style={{ display: "flex", justifyContent: "center", width: "auto", height: "1rem"}}>
            {row.map((value, yVal) => (
              <div onClick={() => this.cellClickHandler(value, xVal, yVal)}>
              <Cell 
                key={xVal + yVal}
                bgColourClass={this.props.bgColor}
                value={value} 
                xVal={xVal} 
                yVal={yVal} 
                setActive={this.props.setActive}
                parentIsMounted={this._isMounted}
                grid={this.state.grid} 
                onClick={() => {
                  if(this.props.active) { 
                    this.cellClickHandler(value, xVal, yVal)}
                  }
                  }/>
                </div>
            ))}
            <br />
            </Row>
            })}
          </div>
    )
  }
}

export default Grid;
