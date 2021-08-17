import { Modal } from 'react-bootstrap'
import './WModal.css'

export default function WModal ({ message, title, show, setShow }) {
  return (
    <Modal
        show={show}
        onHide={() => setShow(!show)}
        keyboard={false}
        centered
        id='modal'
      >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </Modal.Body>
    </Modal>
  )
}
