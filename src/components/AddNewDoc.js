import React, { useState, useEffect } from "react"
import Axios from "axios"
import "../components/AddNewDoc.css"

export const AddNewDoc = ({ documentList, setDocumentList }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [date, setDate] = useState("")
  const [content, setContent] = useState("")

  //adds new record to db
  const submitDoc = () => {
    if (title === "" || author === "" || date === "" || content === "") {
      alert("Fill in all the fields")
      return
    } else {
      Axios.post("http://localhost:3001/api/insert", {
        title: title,
        author: author,
        date: date,
        content: content
      })
    }
    // once hit submit will load real time
    setDocumentList([...documentList, { title, author, date, content }])
    setTitle("")
    setAuthor("")
    setDate("")
    setContent("")
  }

  return (
    <div className="add-documents">
      <h2>Add New Documents</h2>
      <div className="form">
        <label htmlFor="title">
          Title:
          <input type="text" name="title" id="title" onChange={e => setTitle(e.target.value)} />
        </label>
        <label htmlFor="author">
          Author:
          <input type="text" name="author" id="author" onChange={e => setAuthor(e.target.value)} />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="text"
            name="date"
            placeholder="DD/MM/YYYY"
            id="date"
            onChange={e => setDate(e.target.value)}
          />
        </label>
        <label htmlFor="content">
          Content:
          <textarea
            type="textarea"
            name="content"
            id="content"
            onChange={e => setContent(e.target.value)}
          />
        </label>
        <button onClick={submitDoc}>Submit</button>
      </div>
    </div>
  )
}
