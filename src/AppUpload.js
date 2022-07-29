import axios from 'axios';
import React, { Component, useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import AppProgress from './AppProgressBar';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';



const ExampleToast = ({ children }) => {
  const [show, toggleShow] = useState(true);

  return (
    <>
      {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">React-Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};
class App extends Component {
  now = 10;
  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    this.updateStyle = this.updateStyle.bind(this);
    this.updateToast = this.updateToast.bind(this);
    this.now = 0;
    this.state = {
      selectedFiles: '',
      show: false,
      showToast: false,
      nFiles: 0,
      loadVal: 0,
      styleLoad: "secondary"
    }
  }

  // On file select (from the pop up)
  onFileChange(e) {
    // Update the state
    e.preventDefault();
    if(e.target.files.length>0){
      this.updateStyle("primary");
    } else {
      this.updateStyle("secondary");
    }
    this.updateToast(true);
    this.state.loadVal = 0;
    this.updateMessage(this.state.loadVal);
    this.setState({ selectedFiles: e.target.files });

  };


  generateRandom() {
    const min = 1;
    const max = 10000;
    var randomPart = +min + Math.random() * (max - min);
    return Date.now() + randomPart;
  }

  // On file upload (click the upload button)
  onFileUpload(e) {
    e.preventDefault();
    var idTransacction = this.generateRandom();
    
    var step = this.state.selectedFiles.length/100;
    var token = this.state.selectedFiles.length/100;
    var increment = 1;
    if(step<1){
      token = 100/this.state.selectedFiles.length;
      increment = token;
    }
    var index = 0;
    
    
    for (const key of Object.keys(this.state.selectedFiles)) { 
      // Create an object of formData
      console.log(key);
      var selectedFile = this.state.selectedFiles[key];
      const formData = new FormData();

      // Update the formData object
      formData.append(
        "fileBlob",
        selectedFile,
        selectedFile.name
      );

      formData.append(
        "fileName",
        selectedFile.name
      );

      formData.append(
        "idTransaction",
        idTransacction
      );

      // Details of the uploaded file
      console.log(selectedFile);

      // Request made to the backend api
      // Send formData object
      axios.post("https://functions-framework-python-pcqrvbtxdq-uc.a.run.app/", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if(index>step){
        this.state.loadVal = this.state.loadVal + increment;
        this.updateMessage(this.state.loadVal);
        step = step+token;
        console.log(step);
      }
      index = index + increment;
      
      
      console.log(this.state.loadVal);
    }

    this.updateMessage(100);
    this.updateStyle("success");
    
    const formDataPub = new FormData();


    formDataPub.append(
      "idTransaction",
      idTransacction
    );

    // Details of the uploaded file
    console.log("Sendpub");
    console.log(idTransacction);

    // Request made to the backend api
    // Send formData object
    axios.put("https://fnservicefunctionfra-pcqrvbtxdq-uc.a.run.app/", formDataPub, {
      headers: { "Content-Type": "multipart/form-data" }
    });

  };

  // File content to be displayed after
  // file upload is complete
  fileData() {
    
    var dom_content = [];
    this.state.nFiles = this.state.selectedFiles.length;
    for (const key of Object.keys(this.state.selectedFiles)) {
      console.log(key);
      var selectedFile = this.state.selectedFiles[key];
      if (selectedFile) {

        dom_content.push(
          <div id={key}>
            <p>{selectedFile.name}</p>
          </div>
        );
      } else {
        dom_content.push(
          <div>
            <br />
            <h4>Debe seleccionar un archivo</h4>
          </div>
        );
      }
    }
        
    return (
      <div>
        <Alert show={this.state.show} variant="primary">
          <Alert.Heading>Lista Archivos</Alert.Heading>
          {dom_content}
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => this.setState({ show: false })} variant="outline-success">
              Ocultar
            </Button>
          </div>
        </Alert>
        {!this.state.show && <Button onClick={() => this.setState({ show: true })}>Mostrar son {this.state.nFiles} archivos</Button>}
      </div>
    );
  };

  updateMessage(message) {
    this.setState({
      loadVal: message
    });
  }

  updateToast(show) {
    this.setState({
      showToast: show
    });
  }

  updateStyle(style) {
    this.setState({
      styleLoad : style
    });
  }


  render() {

    return (

      <div>
        <Container className="p-3">
          <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Cargar Archivos</h1>
            <h3>Seleccione los archivos en formato xml</h3>
          </Container>
          <div>
            <Form>
              <Form.Group controlId="formFile" className="mb-3" onChange={this.onFileChange}  >
                <Form.Control type="file" multiple accept="text/xml"  ></Form.Control>
              </Form.Group>
              <div className="d-grid gap-2">
                <br />
                <Outlet />
                {this.fileData()}
                <Button variant={this.state.styleLoad}  onClick={this.onFileUpload}>
                  Cargar y procesar!
                </Button>
              </div>
            </Form>
            
          </div>
          <div className="d-grid gap-2">
              <Toast onClose={() => this.setState({ showToast: false })} show={this.state.showToast}  >
              
                <Toast.Header >
                  <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                  <strong className="me-auto">Cargando</strong>
                  <small className="text-muted">{this.state.loadVal} %</small>
                </Toast.Header>
                <Toast.Body>Progreso
                  <AppProgress loadVal={this.state.loadVal}
                    updateMessage={this.updateMessage.bind(this)}></AppProgress>
                </Toast.Body>
                
              </Toast>
              </div>

          <br />
          <div className="d-grid gap-2">
            <a className="btn btn-warning" href="/table" role="button">Ver Reporte</a>
          </div>
        </Container>
        <br />



      </div>

    );
  }
}

export default App;