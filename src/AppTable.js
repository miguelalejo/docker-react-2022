import React, { useState, useEffect } from 'react';
import './AppTable.css';
 
function TableData() {
    const [data, getData] = useState([])
    const URL = 'https://functions-framework-python-pcqrvbtxdq-uc.a.run.app/';
 
    useEffect(() => {
        fetchData()
    }, [])
 
 
    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                getData(response);
            })
 
    }
 
    return (
        <div>
        
            <h1>How to display JSON data to table in React JS</h1>
            <table className="table">
            <thead>
              <tr>
                <th>Nro.</th>
                <th>Gruop Id</th>
                <th>Id Tans</th>
                <th>RUC</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
                {data.map((item, i) => (
                    <tr key={i}>
                         <td>{i}</td>
                        <td>{item.groupId}</td>
                        <td>{item.idTran}</td>
                        <td>{item.ruc}</td>
                        <td>{item.date}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          
          
 
        </div>
    );
}
 
export default TableData;