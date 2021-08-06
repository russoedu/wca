import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { File } from '../Converter/File'
import './FileDrop.css';

export function FileDrop() {
  const [dropClass, setDropClass] = useState('leave')
  const history = useHistory()
  const onDropAccepted = useCallback(async acceptedFiles => {
    const content = await acceptedFiles[0].text()
    /**
     * @type {File}
     */
    const file = new File(content)
    console.log(file)
    history.push({
      pathname: '/analysis',
      state: { file }
    })
    
  }, [history])
  const onDropRejected = () => {
    console.log('error loading');
  }
  const onDragEnter = useCallback(() => {
    setDropClass('enter')
  }, [])

  const onDragLeave = useCallback(() => {
    setDropClass('leave')
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({ onDropAccepted, accept: '.txt', maxFiles: 1, onDropRejected, onDragEnter, onDragLeave })

  return (
    <>
      <p>
        Load a chat export text file to start.
      </p>
      <div id='drop-zone' className={dropClass} {...getRootProps()}>
        <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Click or drag 'n' drop here</p>
          }
      </div>
    </>
  );
}