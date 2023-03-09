import React, { useState, useEffect, useRef } from "react"
import Axios from "axios"
import "../components/SearchForm.css"
import Mark from "mark.js"

export const SearchForm = () => {
  // State
  const [searchResults, setSearchResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchDone, setSearchDone] = useState(false)
  const searchResultsRef = useRef(null)

  const handleInput = e => {
    setSearchQuery(e.target.value)
  }

  const handleSearch = e => {
    e.preventDefault()
    if (searchQuery === "") {
      alert("Fill in all the search field")
      return
    } else {
      // Search from database
      Axios.get(`http://localhost:3001/api/search?q=${searchQuery}`)
        .then(response => {
          setSearchResults(response.data)
          setSearchDone(true)
        })
        .catch(error => console.log(error))
    }
  }

  const handleReset = () => {
    setSearchQuery("")
    setSearchResults([])
    setSearchDone(false)
  }

  // Highlight the search text
  useEffect(() => {
    if (searchDone) {
      // Mark.js library
      const highlighted = new Mark(searchResultsRef.current)
      highlighted.mark(searchQuery)
    }
  }, [searchDone, searchQuery])

  return (
    <div className="search-area">
      <h1>Text Search App</h1>
      <div className="form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            name="search_query"
            id="search"
            value={searchQuery}
            onChange={handleInput}
          />
          <button>Search</button>
        </form>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div className="search-results" ref={searchResultsRef}>
        {searchDone && (
          <div className="search-results-title-area">
            <h2>Displaying Search results of: {searchQuery}</h2>{" "}
            <p>{searchResults.length} posts were found</p>
          </div>
        )}
        {searchResults.map(result => (
          <div className="single-result" key={result.id}>
            <h3 dangerouslySetInnerHTML={{ __html: result.title }} />
            <span>{result.author} </span>
            <span>{result.date}</span>
            <p dangerouslySetInnerHTML={{ __html: result.content }} />
          </div>
        ))}
      </div>
    </div>
  )
}
