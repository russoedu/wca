import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { File } from '../Converter/File'
import './FileDrop.css'

export function FileDrop () {
  const [dropClass, setDropClass] = useState('leave')
  const history = useHistory()

  const onDropAccepted = useCallback(async acceptedFiles => {
    const content = await acceptedFiles[0].text()
    const file = new File(content)
    history.push({
      pathname: '/analysis',
      state: { file },
    })
  }, [history])

  const onDropRejected = useCallback(error => {
    const code = error[0].errors[0].code
    let message = ''
    switch (code) {
      case 'too-many-files':
        message = 'Only one file at once'
        break
      case 'file-invalid-type':
        message = 'Only .txt files can be analised'
        break
      default:
        message = 'Some error occoured'
        break
    }
    console.error(message)
  }, [])

  const onDragEnter = useCallback(() => {
    setDropClass('enter')
  }, [])

  const onDragLeave = useCallback(() => {
    setDropClass('leave')
  }, [])

  const dropOptions = {
    accept: '.txt',
    maxFiles: 1,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragLeave,
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropOptions)

  return (
    <>
      <div id='drop-zone' className={dropClass} {...getRootProps()}>
        <input {...getInputProps()} />
          {
            isDragActive
              ? <p>Drop the files here ...</p>
              : <p>Click or drag 'n' drop here</p>
          }
      </div>
    </>
  )
}
