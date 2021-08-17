import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { File } from '../Converter/File'
import './FileDrop.css'

export default function FileDrop ({ onSetFile, onError }) {
  const [dropClass, setDropClass] = useState('drop-out')

  async function onDropAccepted (acceptedFiles) {
    const fileData = acceptedFiles[0]
    const file = new File(await fileData.text(), fileData.name)
    if (file.loaded) {
      onSetFile(file)
    } else {
      setDropClass('drop-out')
      setError(file.error)
    }
  }

  function onDropRejected (error) {
    setDropClass('drop-out')
    switch (error[0].errors[0].code) {
      case 'too-many-files':
        setError('<p>Please select only one chat file at once</p>')
        break
      case 'file-invalid-type':
        setError('<p>Please select a .txt file to be analised</p>')
        break
      default:
        setError('<p>Sorry, an unknown error occoured</p>')
        break
    }
  }

  function onDragEnter () {
    setDropClass('drop-in')
  }

  function onDragLeave () {
    setDropClass('drop-out')
  }

  const dropOptions = {
    accept: '.txt',
    maxFiles: 1,
    onDropAccepted,
    onDropRejected,
    onDragEnter,
    onDragLeave,
  }

  function setError (message) {
    onError(message, 'ERROR')
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone(dropOptions)

  return (
    <>
      <div id='drop-zone' className={dropClass} {...getRootProps()}>
        <input {...getInputProps()} />
        {
            isDragActive
              ? <p>Just drop :)</p>
              : <p>Click or drag 'n' drop here</p>
          }
      </div>
    </>
  )
}

FileDrop.propTypes = {
  onSetFile: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired
}
