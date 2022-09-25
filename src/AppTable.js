import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import './AppTable.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class TableData extends Component {
  constructor(props) {
    super(props);
    this.onLoadTable = this.onLoadTable.bind(this);

    this.state = {
      data: [],
      isFetching: true,
      show: false,
    }
  }

  onLoadTable(e) {
    // Update the state    
    this.fetchData();
    this.setState({ show: true });
  };

  componentDidMount() {
    this.fetchData();
    this.timer = setInterval(() => this.fetchData(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  fetchData = async () => {
    this.setState({ isFetching: true });
    var URL = 'https://ser-topic-proces-bill-ihed6msnea-uc.a.run.app/';
    axios.get(URL)
      .then(response => {
      
        this.state.data = response.data.slice(0, 100);

        console.log("Axios");
        console.log(this.state.data);
      })
      .catch(e => {
        console.log(e);
        this.setState({ isFetching: false });
      });
  };



  render() {


    return (
      <div>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Rerpote Procesados</h1>

          </Container>

          <br />
          <Alert show={this.state.show} variant="primary">
            <div className="d-flex justify-content-end">
              <Button onClick={() => this.setState({ show: false })} variant="outline-success">
                Ocultar
              </Button>
            </div>
            <Alert.Heading>Reportes Generados</Alert.Heading>

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
                {this.state.data.map((item, i) => (
                  <tr key={i}>
                    <td>{i}</td>
                    <td>{item.groupId}</td>
                    <td>{item.idTran}</td>
                    <td>{item.ruc}</td>
                    <td>{item.date}</td>
                    <td><a href={"https://ser-fatapi-repos-ihed6msnea-uc.a.run.app/reportes/" + item.idTran} download>descargar</a></td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />

          </Alert>
          {!this.state.show && <div className="d-grid gap-2"> <Button onClick={this.onLoadTable}>Mostrar Reportes</Button> </div>}
          <hr />
          <div className="d-grid gap-2">
            <a className="btn btn-warning" href="/" role="button">Regresar Cargar Archivos</a>
          </div>
        </Container>

      </div>

    );

  }
}

export default TableData;