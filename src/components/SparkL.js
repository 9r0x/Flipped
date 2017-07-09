import React, { Component } from 'react';
var Sparkline = require('react-sparkline');


class SparkL extends Component {

    render() {
        if(this.props.loveP){
            return (<div className="shake"> <Sparkline width={1000} height={200}  strokeColor={this.props.color}  strokeWidth='5px' data={this.props.data} circleDiameter={7}/></div>);}
        else{return( <div> <Sparkline width={1000} height={200}  strokeColor={this.props.color}  strokeWidth='5px' data={this.props.data} circleDiameter={7}/></div>);}
    }
}


export default SparkL;
