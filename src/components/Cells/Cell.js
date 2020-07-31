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
import equal from 'fast-deep-equal'
// reactstrap components
import {
  Card,
  CardBody,
} from "reactstrap";

// core components

const ALIVE_KEY = 'o';
const DEAD_KEY = 'x';

const blue = {
    width: "1rem", background: "linear-gradient(#1d8cf8, #3358f4)", height: "1rem",
  }

const green = {
    width: "1rem", background: "linear-gradient(#00f2c3, #0098f0)", height: "1rem",
}

const dead = {
    width: "1rem", height: "1rem", border: "slategrey dotted 0.25px",

}

const pink = {
    width: "1rem", background: "linear-gradient(#e14eca, #ba54f5)", height: "1rem",

}


class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        bgStyle: blue
    }
    this.chooseColour = this.chooseColour.bind(this);

}
    chooseColour = () => {
        if(this.props.bgColourClass === "blue") {
            this.setState({bgStyle: blue})
        } else if (this.props.bgColourClass === "green") {
            this.setState({bgStyle: green})
        } else if (this.props.bgColourClass === "primary") {
            this.setState({bgStyle: pink})
        }
    }

    componentDidMount = () => {
        this.chooseColour()
    }

    componentDidUpdate = (prevProps) => {
        if(this.props.bgColourClass !== prevProps.bgColourClass) {
            // Sets active to false if colour is changed.
            this.props.setActive(false)
            return this.chooseColour()
        }
    }

      filledOrNot = () => {
          if (this.props.value === ALIVE_KEY) {
              return (
                <Card
                style={this.state.bgStyle}
                >                
              </Card>
              )
          } else if (this.props.value === DEAD_KEY) {
              return (
                <Card style={dead}
                >
              </Card>
              )
          }
      }



  render() {
    return  this.filledOrNot()
          

    }
}

export default Cell;
