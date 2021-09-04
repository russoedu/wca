import { createSignal } from 'solid-js';
import { FileDrop } from '../components/FileDrop'
import Modal from '../components/Modal'
import { SolidDropzoneError } from '../components/SolidDropzone';
import { WhatsappFile } from '../converter/WhatsappFile';
// import { File } from '../Converter/File'
import './Home.css'

export default function () {
  const [modalMessage, setModalMessage] = createSignal('error')
  const [modalTitle, setModalTitle] = createSignal('File upload error')
  const [showModal, setShowModal] = createSignal(false)

  async function onDropAccepted (file: WhatsappFile) {
    console.log(file);
    
    
    // const file = new File(await fileData.text(), fileData.name)
    // if (file.loaded) {
    //   onSetFile(file)
    // } else {
    //   setDropClass('drop-out')
    //   setError(file.error)
    // }
  }

  function onDropRejected (error: string) {
    console.log(error)
    setModalMessage(error)
    setShowModal(true)
  }
  return (
    <>
    <FileDrop
      onSuccess={onDropAccepted}
      onError={onDropRejected}
    ></FileDrop>
    <Modal message={modalMessage} show={showModal} title={modalTitle} setShow={setShowModal}></Modal>
    </>
  )
}