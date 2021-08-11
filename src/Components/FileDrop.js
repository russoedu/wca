import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDropzone } from 'react-dropzone'
import { File } from '../Converter/File'
import './FileDrop.css'
import { Modal } from 'react-bootstrap'

export default function FileDrop ({ onSetFile }) {
  const [dropClass, setDropClass] = useState('leave')
  const [failureMessage, setFailureMessage] = useState('')
  const [showFailure, setShowFailure] = useState(false)

  async function onDropAccepted (acceptedFiles) {
    setShowFailure(false)
    const fileData = acceptedFiles[0]
    console.log(fileData)
    const file = new File(await fileData.text(), fileData.name)
    if (file.loaded) {
      onSetFile(file)
    } else {
      setFailureMessage(file.error)
      setShowFailure(true)
    }
  }

  const onDropRejected = useCallback(error => {
    const code = error[0].errors[0].code
    switch (code) {
      case 'too-many-files':
        setFailureMessage('<p>Please choose only one chat file at once</p>')
        setShowFailure(true)
        break
      case 'file-invalid-type':
        setFailureMessage('<p>Please choose a .txt file to be analised</p>')
        setShowFailure(true)
        break
      default:
        setFailureMessage('<p>Sorry, an unknown error occoured</p>')
        setShowFailure(true)
        break
    }
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
      <Modal
        show={showFailure}
        onHide={() => setShowFailure(!showFailure)}
        keyboard={false}
        centered
        id='modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>ERROR</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div dangerouslySetInnerHTML={{ __html: failureMessage }} />
        </Modal.Body>
      </Modal>
    </>
  )
}

FileDrop.propTypes = {
  onSetFile: PropTypes.func.isRequired,
}
