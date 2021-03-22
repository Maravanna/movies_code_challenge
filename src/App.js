import React from 'react';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import { DisplayList } from "./DisplayList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from "react-bootstrap";

const rootApi = 'https://api.themoviedb.org/3'

function App() {
  const [data, setData] = useState({ results: [] })
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState({ results: [] })
  const [rating, setRating] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`${rootApi}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`);
      const data = await res.json()
      console.log(data)
      setData(data)
    }

    fetchData()
  }, [])

  async function handleSearch(e) {
    setSearchQuery(e.target.value)
    if (!e.target.value) return

    const res = await fetch(`${rootApi}/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${e.target.value}`);
    const data = await res.json()

    setSearchResult(data)
  }

  function handleRatingFilter(item) {
    rating === item ? setRating(0) : setRating(item)
  }

  function filterRating(item) {
    if (rating === 0) return true
    return item.vote_average <= rating && item.vote_average >= rating - 2
  }

  const moviesList = searchQuery ? searchResult.results : data.results
  const filteredMovies = moviesList.filter(filterRating)

  return (
    <div>
      <div style={{ backgroundColor: "grey" }}>
        <Container>
          <Row>
            <Col lg={3}></Col>
            <Col lg={6} className="text-center mt-3 mb-3">
              <div className="input-group">
                <input className="form-control rounded-left" placeholder="Search for a movie..." type="text" onChange={handleSearch} value={searchQuery} />
                <span className="input-group-append bg-white rounded-right"><span className="input-group-text bg-transparent"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span></span>
                
              </div>
            </Col>
            <Col lg={3} className="mt-4 mb-2">
              {[2, 4, 6, 8, 10].map(item => {
                const color = item > rating ? 'white' : 'yellow'
                return <FontAwesomeIcon icon={faStar} key={item} style={{ fontSize: '20px', color: color }} onClick={() => handleRatingFilter(item)} />
              })}
            </Col>
          </Row>
        </Container>
      </div>

      <DisplayList movies={filteredMovies} />
    </div>
  );

}



export default App;
