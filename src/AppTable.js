import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './AppTable.css';
import Container from 'react-bootstrap/Container';
 
function TableData() {
    const [data, getData] = useState([])
    const URL = 'https://fnservicefunctionfra-pcqrvbtxdq-uc.a.run.app/';
 
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
             <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Rerpote Procesados</h1>
           
          </Container>
          <div className="d-grid gap-2">
            <a className="btn btn-warning" href="/" role="button">Cargar Archivos</a>
          </div>
          <hr />
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>#</th>
                <th>Gruop Id</th>
                <th>Id Tans</th>
                <th>RUC</th>
                <th>Fecha</th>
                <th>Reporte Excel</th>
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
                        <td><a href={"https://fnfastapi-pcqrvbtxdq-uc.a.run.app/reportes/"+item.idTran} download>descargar</a></td>
                    </tr>
                ))}
            </tbody>
          </Table> 
        </Container>      
           
            
        </div>
    );
}
 
export default TableData;