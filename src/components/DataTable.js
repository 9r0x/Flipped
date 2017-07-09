import React, { Component } from 'react';
import DataItem from "./DataItem";

class DataTable extends Component {

    render() {
        let dataItems;
        {
            dataItems = this.props.hr.map((hr,count) => {
                return(
                    <DataItem key={count} count ={count} hr={Math.round(hr)} hs={Math.round(this.props.hs[count]/5)} lls={Math.round(this.props.lls[count])} />
                );
            });
        }

        return (
            <div className="Datas">
              <table>
                <tbody>
                  <tr>
                    <td  style={{fontSize: 50}}><strong>心动值:</strong> </td>
                    <td  style={{fontSize: 50}}><strong>心率-</strong> </td>
                    <td  style={{fontSize: 50}}><strong>心强-</strong> </td>
                    <td  style={{fontSize: 50}}><strong>流利说-</strong> </td>
                    <td  style={{fontSize: 50}}><strong>总积分</strong> </td>
                  </tr>
                  {dataItems}
                  </tbody>
              </table>
            </div>
        );
    }
}

export default DataTable;
