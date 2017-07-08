import React, { Component } from 'react';
import $ from 'jquery';
import SparkL from "./components/SparkL";

class App extends Component {
    constructor(){
        super();
        this.state={
            data : [],
            getData: 0,
            heartdisP: "none",
            moodColor: "#000000",
            loveP: false
        };
    }

    getTodos(){
        $.ajax(
            {
                url: 'http://flipped.adolphlwq.xyz/data/heartbeat?limit=200',
                dataType: 'json',
                cache: false,
                success: function(data){
                    let hearts = data.message;
                    this.setState({data : hearts.map(heart => heart.heart_rate).reverse()});
                }.bind(this),
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
        // data.push(this.state.getData);
        // if(data.length>10) {data.splice(0,1);}
        this.setState({moodColor:this.rgbToHex(Math.round(255*D),0,Math.round(255*(1-D)))});
    },500);}


    render() {
        const heartStyle = {
            display: this.state.heartdisP
        };
        let url='http://i2.kiimg.com/1949/133536db7cf69048.gif';
        var divStyle;
        if (this.state.hover) {
            divStyle =
                {
                    backgroundImage: 'url('+url+')',
                    backgroundSize: 'cover'
                };
        }
        return (
            <div  style={divStyle}>
              <h1 className="page-header">Hello,single dog! <small>This is a flipped website!</small></h1>
              <div className="text-center">
                <SparkL data={this.state.data} loveP={this.state.loveP} moodColor={this.state.moodColor}/>
                </div>
              <div className="key"><p style={heartStyle}>NEWNEW</p></div>
            </div>
        );
    }
}

export default App;
