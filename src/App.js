import './App.css';
import Editor from "@monaco-editor/react";
import { useState } from 'react';
import Select from "react-select";
import { languageOptions } from '/home/oem/Desktop/Projects/cshare/frontend/src/constants/languageConstants.js';
import monacoThemes from "monaco-themes/themes/themelist";
import 'bootstrap/dist/css/bootstrap.min.css';
import { defineTheme } from './lib/defineTheme.js';
import axios from 'axios';
// import { customStyles } from './constants/themes';

function App() {

  const [value, setValue] = useState("");
  const [theme, settheme] = useState("cobalt");
  const [language, setlanguage] = useState(languageOptions[0]);
  const [processing, setprocessing] = useState(false);
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("No output");
  const [response, setresponse] = useState({});
  const [state, setstate] = useState("Compile and Execute")
  const [showResults,setshowResults] = useState(false);
  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    axios.request(options)
      .then((response) => {
        console.log("Inside check status");
        console.log(response);

        const status = response.data.status?.id;
        if (status === 1 || status === 2) {
          setTimeout(() => {
            checkStatus(token);
          }, 2000);
          return;
        }
        else {
          setstate("Compile and Execute")
          setprocessing(false);
          setshowResults(true);
          console.log(response);
          const newResponse = {
            memory: response.data.memory,
            status: response.data.status.description,
            time: response.data.time,
          }
          console.log(newResponse);
          setresponse(newResponse);
          setoutput(atob(response.data.stdout));
          console.log("Compiled Successfully");
          return;
        }

      }).catch((error) => {
        console.error(error);
      })
  }
  const handleCompile = () => {
    setstate("Processing")
    setprocessing(true);
    setshowResults(false);
    setoutput("");
    const formData = {
      language_id: language.id,
      source_code: btoa(value),
      stdin: btoa(input)
    }
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    }

    axios.request(options).then((response) => {
        console.log(response);
        checkStatus(response.data.token);
      })
      .catch((err) => {
        console.error(err);
      })

  }
  const handleEditorChange = (value) => {
    setValue(value);
  }

  const handleThemeChange = (theme) => {
    console.log(theme.value)
    if (["light", "vs-dark"].includes(theme.value)) {
      settheme(theme);
    } else {
      defineTheme(theme.value).then((_) => settheme(theme));
    }
  }

  return (
    <div className='App'>
    <div className="center">
      <h1><em>Oditor</em></h1>
    </div>
    {/* <div className="container">
      <div className="row justify-content-start">
        <div className="col-4">
          <div className='giveborder'>
          <Select
            placeholder="Select language"
            options={languageOptions}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => { setlanguage(selectedOption) }}
          /></div>
        </div>
        <div className="col-4">
        <div className='giveborder'>
          <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
              label: themeName,
              value: themeId,
              key: themeId,
            }))}
            value={theme}
            // styles={customStyles}
            onChange={handleThemeChange}
          />
          </div>
        </div>
      </div>
      </div> */}
      <br></br>
      <div className="container-fluid">


        <div className="row justify-content-left">

        <div className="col-2">
      {/* <div className="row justify-content-left"> */}
        {/* <div className="col-6"> */}
        <label className="underline"><em>Language:</em></label>
          <div className='giveborder'>
          <Select
          // styles={customStyles}
            placeholder="Select language"
            options={languageOptions}
            defaultValue={languageOptions[0]}
            onChange={(selectedOption) => { setlanguage(selectedOption) }}
          /></div>
          
        {/* </div> */}
        {/* <div className="col-6"> */}

        <br></br>
        <br></br>
        <label className="underline"><em>Theme:</em></label>
        <div className='giveborder'>
          <Select
            placeholder={`Select Theme`}
            // options={languageOptions}
            options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
              label: themeName,
              value: themeId,
              key: themeId,
            }))}
            value={theme}
            // styles={customStyles}
            onChange={handleThemeChange}
          />
          {/* </div> */}
        </div>
        
        <img src="https://camo.githubusercontent.com/bb27b9c1df90df738e91a54665d3adb08f60583fad2f266ffbde14508e6dc918/68747470733a2f2f692e70696e696d672e636f6d2f6f726967696e616c732f65342f32362f37302f65343236373032656466383734623138316163656431653266613563366364652e676966" className="card card-img-top bottom" alt="Just a pick" />
      {/* </div> */}
      </div>

          <div className="col-8">
          <div className='giveborder'>
            <Editor
              height="85vh"
              width={`100%`}
              language={language?.value || "javascript"}
              value={value}
              theme={theme.value}
              defaultValue="// some comment"
              onChange={handleEditorChange}
            />
            </div>
          </div>

          <div className='col-2'>
            <div className="row justify-content-right">


              <div className="form-group">
                <label>Custom Input:</label>
                <textarea className="form-control dark-mode" id="exampleFormControlTextarea1" rows="5"
                  value={input}
                  onChange={(e) => { setinput(e.target.value) }}
                  placeholder="Custom Input">

                </textarea>
              </div>
            </div>
            <br></br>
            {/* <div> */}
            <div className="card">
            <div className="card-body">
                <pre className="card-text">{output}</pre>
              </div>
              {showResults && <div className="card-body">
                <hr></hr>
                <p className="card-text">Status : {response?.status}</p>
                <p className="card-text">Time taken: {response?.time}</p>
                <p className="card-text">Memory: {response?.memory}</p>
              </div>}
            </div>
            {/* </div> */}
            <br></br>
            <button type="button" className="btn btn-info" onClick={handleCompile}>{state}</button>
            

          </div>
          {/* </div> */}
        </div>

      </div>
    
    </div>
  );
}

export default App;
