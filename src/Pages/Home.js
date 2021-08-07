import React from 'react'
import { FileDrop } from '../Components/FileDrop'
import './Home.css'

export function Home (props) {
  return (
    <>
      <h1>
        Load a chat export text file to start.
      </h1>
      <FileDrop></FileDrop>
    </>
  )
}
