import React, { Component } from 'react';
import $ from 'jquery';
var Sparkline = require('react-sparkline');


class HeartCanvas extends Component {
    constructor(){
        super();
        this.state={
            data : [],
            getData: 0,
            heartdisP: "none"
        };
    }

    getTodos(){
        $.ajax(
            {
                url: 'http://flipped.adolphlwq.xyz/fake',
                dataType: 'json',
                cache: false,
                success: function(data){this.setState({getData:data.data})}.bind(this),
                error:function(xhr,status,err){
                    console.log(err);
                }
            });
    }


    getR(min, max) {
        return Math.random() * (max - min) + min;
    }
    componentDidMount(){setInterval(()=>{
        this.getTodos();
        console.log(this.state.getData);
        let data = this.state.data.slice();
        data.push(this.state.getData);
        if(data.length>10) {data.splice(0,1);}
        this.setState({data:data},()=>{console.log(this.state.data);});
                                        },500);}

    render() {
        const heartStyle = {
            display: this.state.heartdisP
        };
        return (
            <div>
              <h1 className="page-header">Hello,single dog! <small>This is a flipped website!</small></h1>
              <Sparkline width={1500} height={400}  strokeColor='blue'  strokeWidth='5px' data={this.state.data} />
              <p style={heartStyle}></p>
            </div>
        );
    }
}

export default HeartCanvas;
