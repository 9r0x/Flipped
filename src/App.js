import React, { Component } from 'react';
import $ from 'jquery';
import SparkL from "./components/SparkL";
import LiuLiShuo from "./components/LiuLiShuo";


class App extends Component {
    constructor(){
        super();
        this.state={
            data : [],
            datab : [],
            heartdisP: "none",
            moodColor: "#000000",
            loveP: false,
            loved: false
        };
    }

    getData(){
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

    getDatab(){
        $.ajax(
            {
                url: 'http://flipped.adolphlwq.xyz/data/heartstrength?limit=200',
                dataType: 'json',
                cache: false,
                success: function(data){
                    let hearts = data.message;
                    this.setState({datab : hearts.map(heart => heart.heart_strength).reverse()});
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
        this.getData();this.getDatab();
        // let D=0.7;
        // this.setState({moodColor:this.rgbToHex(Math.round(255*D),0,Math.round(255*(1-D)))});
    },50);}

    changeLoveP(c){
        if (c.fluency>90 && c.overall>95){this.setState({loveP:true,loved:true});};
        setTimeout(()=>{this.setState({loveP:false})},1000);}

    handleAddResult(myResult){
        this.setState({result:myResult},this.changeLoveP(myResult));
    }

    render() {
        let url='http://i2.kiimg.com/1949/133536db7cf69048.gif';
        var divStyle;
        if (this.state.loved) {
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
                <SparkL data={this.state.data} loveP={this.state.loveP} color={'#BC607C'}/>
                <SparkL data={this.state.datab} loveP={this.state.loveP} color={'#6A4F8F'}/>
              </div>
              < LiuLiShuo addResult={this.handleAddResult.bind(this)} />
            </div>
        );
    }
}

export default App;
