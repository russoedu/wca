import React, { useState, useCallback } from 'react'
import { Analysis } from '../Components/Analysis'
import FileDrop from '../Components/FileDrop'
import './Home.css'

export function Home () {
  const [file, setFile] = useState({ loaded: false })

  const onSetFile = f => {
    console.log(f)
    setFile(f)
  }

  const onError = useCallback(() => {
    setFile({ loaded: false })
  }, [])

  return (
    <>
      { file.loaded
        ? <>
          <h1>File is set</h1>
          <Analysis file={file} onError={onError}></Analysis>
        </>
        : <>
          <h1>
            Load a chat export text file to start.
          </h1>
          <FileDrop onSetFile={onSetFile}></FileDrop>
        </>
      }
    </>
  )
}
