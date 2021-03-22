import React from 'react';
import { useState } from "react";
import { Col } from "react-bootstrap";

export function DisplayMovie({ movie }) {
  const [expanded, setExpanded] = useState(false)
  return (<><Col className="m-0 mt-5 mx-auto z-depth-3 shadow-sm mx-5" xs={{ span: 10, offset: 1 }} md={6} lg={3}>
    <div style={{ textAlign: "center" }} className="mx-auto" onClick={() => {
      setExpanded(!expanded)
    }}>
      {movie.poster_path ?
        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${movie.poster_path}`} alt="" /> :
        <img style={{width: '220px', height: '330px'}} src={`https://bpsvalidator.eosarabia.net/static/media/noImageFound.bdd113c4.png`} alt="" />
      }

    </div>
    <h5 className="mt-2" style={{ textAlign: "center" }}>{movie.original_title}</h5>
    {expanded &&
      <span>
        <p className="text-justify"><b>Description: </b>{movie.overview}</p>
        <p className="text-justify"><b>Vote Average: </b>{movie.vote_average}</p>
      </span>}
  </Col>

  </>
  )
}