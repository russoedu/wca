import { createSignal } from 'solid-js';
import FileDrop, { FileDropError } from '../components/FileDrop'
import Modal from '../components/Modal'
import './Home.css'

export default function () {
  const [modalMessage, setModalMessage] = createSignal('error')
  const [modalTitle, setModalTitle] = createSignal('File upload error')
  const [showModal, setShowModal] = createSignal(false)
  async function onDropAccepted (acceptedFiles: File[]) {
    console.log(acceptedFiles)
    // const fileData = acceptedFiles[0]
    // const file = new File(await fileData.text(), fileData.name)
    // if (file.loaded) {
    //   onSetFile(file)
    // } else {
    //   setDropClass('drop-out')
    //   setError(file.error)
    // }
  }

  function onDropRejected (error: FileDropError | string) {
    console.log(error)
    if (error === FileDropError.INVALID_TYPE) {
      setModalMessage('The selected file is not a Whatsapp message export. Please select a .txt file')
    } else if (error === FileDropError.TOO_MANY_FILES) {
      setModalMessage('Please select a single file.')
    }
    setShowModal(true)
  }
  return (
    <>
    <h1 class="title">
      Load a chat export text file to start.
    </h1>
    <FileDrop
      normalText="Click or drag 'n' drop here"
      draggingText="Just drop :)"
      draggedText="done"
      normalClass="drop-normal"
      draggingClass="drop-dragging"
      draggedClass="drop-dragged"
      accept='.txt'
      onDropAccepted={onDropAccepted}
      onDropRejected={onDropRejected}
      maxFiles={1}
    ></FileDrop>
    <Modal message={modalMessage} show={showModal} title={modalTitle} setShow={setShowModal}></Modal>
    </>
  )
}