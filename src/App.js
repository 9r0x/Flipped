import React, { Component } from 'react';
import $ from 'jquery';
const ProgressBar = require('react-progress-bar-plus');
var Sparkline = require('react-sparkline');


class App extends Component {
 constructor(){
        super();
        this.state={
            data : [],
            getData: 0,
            heartdisP: "none",
            moodColor: "#000000"
        };
    }

    getTodos(){
        $.ajax(
            {
                url: 'http://flipped.adolphlwq.xyz/fake',
                dataType: 'json',
                cache: false,
                success: function(data){this.setState({getData:data.data});}.bind(this),
                error:function(xhr,status,err){
                    console.log(err);
                }
            });
    }


    getR(min, max) {
        return Math.random() * (max - min) + min;
    }

    componentToHex(c) {
        var hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    }

    rgbToHex(r, g, b) {
        return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    }
    componentDidMount(){setInterval(()=>{
        this.getTodos();
        let data = this.state.data.slice();
        // let D = (this.state.getData+50.0)/100;
        let D = 0.5;
        data.push(this.state.getData);
        if(data.length>10) {data.splice(0,1);}
        this.setState({data:data,moodColor:this.rgbToHex(Math.round(255*D),0,Math.round(255*(1-D)))});
                                        },500);}



    render() {
        const heartStyle = {
            display: this.state.heartdisP
        };
        return (
            <div>
              <h1 className="page-header">Hello,single dog! <small>This is a flipped website!</small></h1>
              <ProgressBar percent={70}/>
              <Sparkline  width={1500} height={400}  strokeColor={this.state.moodColor}  strokeWidth='5px' data={this.state.data} />
              <p style={heartStyle}></p>
            </div>
        );
    }
}

export default App;
