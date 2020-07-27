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
  Card,
  CardBody,
} from "reactstrap";

// core components

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        alive: false
    };
  }


  render() {
    return (
            <div style={{width: '0.5rem', marginLeft: "0.25rem", marginRight: "0.25rem"}}>
              <Card className="card-chart custom-card-layout" 
                style={{width: "1rem", height: "1rem", border: "black solid 1px"}} 
                onClick={() => console.log("hi")}>
                
                <CardBody>
                </CardBody>
              </Card>
            </div>
        )
    }
}

export default Cell;
