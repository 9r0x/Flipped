import React, { Component } from 'react';

class DataItem extends Component {

    render() {
        return (
            <tr className="DataItem">
              <td  style={{fontSize: 50}}>{this.props.count+1}</td>
              <td  style={{fontSize: 50}}>{this.props.hr}</td>
              <td  style={{fontSize: 50}}>{this.props.hs}</td>
              <td  style={{fontSize: 50}}>{this.props.lls}</td>
              <td  style={{fontSize: 50}}>{this.props.hr*this.props.hs*this.props.lls}</td>
            </tr>
        );
    }}

export default DataItem;
