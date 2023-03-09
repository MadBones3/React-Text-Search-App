import Axios from "axios"
import React, { useState, useEffect } from "react"
import "./App.css"
import { AddNewDoc } from "./components/AddNewDoc"
import { SearchForm } from "./components/SearchForm"

function App() {
  // State
  const [documentList, setDocumentList] = useState([])

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then(response => {
      setDocumentList(response.data)
    })
  }, [])

  return (
    <div className="App">
      <SearchForm />
      <div className="row">
        <div className="col">
          <div className="document-list">
            <h2>View all the Documents</h2>
            {documentList.map(val => {
              return (
                <div className="single-doc">
                  <h3>{val.title}</h3>
                  <span>{val.author} </span>
                  <span>{val.date}</span>
                  <p>{val.content}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="col">
          <AddNewDoc documentList={documentList} setDocumentList={setDocumentList} />
        </div>
      </div>
    </div>
  )
}

export default App
