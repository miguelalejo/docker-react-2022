import axios from 'axios';
import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

class App extends Component {


  constructor(props) {
    super(props);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileUpload = this.onFileUpload.bind(this);
    this.state = {
      selectedFiles: ''
    }
}

  // On file select (from the pop up)
  onFileChange(e) {

    // Update the state
    this.setState({ selectedFiles: e.target.files });

  };

  generateRandom(){
    const min = 1;
    const max = 10000;
    var randomPart = +min + Math.random() * (max - min);
    return  Date.now()+randomPart;
  }

  // On file upload (click the upload button)
  onFileUpload (e) {
    e.preventDefault();
    var idTransacction = this.generateRandom();
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
        headers: { "Content-Type": "multipart/form-data" }});

    }

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
    axios.put("https://functions-framework-python-pcqrvbtxdq-uc.a.run.app/", formDataPub, {
      headers: { "Content-Type": "multipart/form-data" }});

  };

  // File content to be displayed after
  // file upload is complete
  fileData() {    
    var dom_content = [];
    for (const key of Object.keys(this.state.selectedFiles)) {
      console.log(key);
      var selectedFile = this.state.selectedFiles[key];
      if (selectedFile) {

        dom_content.push(
          <div id={key}>
            <h2>File Details:</h2>

            <p>File Name: {selectedFile.name}</p>


            <p>File Type: {selectedFile.type}</p>


           

          </div>
        );
      } else {
        dom_content.push (
          <div>
            <br />
            <h4>Choose before Pressing the Upload button</h4>
          </div>
        );
      }
    }
    return (
      <div> 
          {dom_content}
      </div>
  );


  };

  render() {

    return (
      <div>
        <h1>
          GeeksforGeeks
        </h1>
        <h3>
          File Upload using React!
        </h3>
        <div>
          <input type="file" onChange={this.onFileChange} multiple accept="text/xml" />
          <button onClick={this.onFileUpload}>
            Upload!
          </button>
        </div>
        <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/table">table</Link>
      </nav>
      <Outlet />
        {this.fileData()}
        
      </div>
    );
  }
}

export default App;