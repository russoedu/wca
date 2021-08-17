import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Analysis } from '../Components/Analysis'
import FileDrop from '../Components/FileDrop'
import WModal from '../Components/WModal'
import { Whatsapp } from '../Converter/Whatsapp'
import './Home.css'

export function Home () {
  const [whatsapp, setWhatsapp] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [showModal, setShowModal] = useState(false)

  function onSetFile (f) {
    setWhatsapp(new Whatsapp(f))
  }

  function onError (message, title) {
    setWhatsapp(false)
    setShowModal(true)
    setModalTitle(title)
    setModalMessage(message)
  }

  return (
    <>
      { whatsapp
        ? <>
          <Row>
            <h1>File is set</h1>
          </Row>
          <Analysis whatsapp={whatsapp} onError={onError}></Analysis>
        </>
        : <Row id='file-drop'>
          <h1>
            Load a chat export text file to start.
          </h1>
          <FileDrop onSetFile={onSetFile} onError={onError}></FileDrop>
        </Row>
      }
      <WModal message={modalMessage} title={modalTitle} show={showModal} setShow={setShowModal} />
    </>
  )
}
