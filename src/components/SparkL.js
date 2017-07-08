import React, { Component } from 'react';
import $ from 'jquery';
var Sparkline = require('react-sparkline');


class SparkL extends Component {

    render() {
        if(this.props.loveP){
            return (<div className="shake"> <Sparkline width={1400} height={200}  strokeColor={this.props.moodColor}  strokeWidth='5px' data={this.props.data} circleDiameter={10}/></div>);}
        else{return( <div> <Sparkline width={1400} height={200}  strokeColor={this.props.moodColor}  strokeWidth='5px' data={this.props.data} circleDiameter={10}/></div>);}
    }
}


export default SparkL;
