import { createSignal, Match, Show, Switch } from 'solid-js';
import { createStore } from 'solid-js/store'
import { Analysis } from '../components/Analysis';
import { FileDrop } from '../components/FileDrop'
import Modal from '../components/Modal'
import { SolidDropzoneError } from '../components/SolidDropzone';
import { WhatsappFile } from '../converter/WhatsappFile';
// import { File } from '../Converter/File'
import './Home.css'

export default function () {
  const [whatsapp, setWhatsapp] = createStore(new WhatsappFile())
  const [modalMessage, setModalMessage] = createSignal('error')
  const [modalTitle, setModalTitle] = createSignal('File upload error')
  const [showModal, setShowModal] = createSignal(false)

  async function onDropAccepted (file: WhatsappFile) {
    setWhatsapp(file)
    
    // const file = new File(await fileData.text(), fileData.name)
    // if (file.loaded) {
    //   onSetFile(file)
    // } else {
    //   setDropClass('drop-out')
    //   setError(file.error)
    // }
  }

  function onDropRejected (error: string) {
    setModalMessage(error)
    setShowModal(true)
  }

  return (
    <>
      <Switch>
        <Match when={!whatsapp.loaded}>
          <h1 class="title">Load a chat export text file to start.</h1>
          <FileDrop
            onSuccess={onDropAccepted}
            onError={onDropRejected}
          ></FileDrop>
        </Match>
        <Match when={whatsapp.loaded}>
          <h1 class="title">Processing the chat file</h1>
          <Analysis file={whatsapp}></Analysis>
          <button class="button is-large is-link" onclick={() => setWhatsapp(new WhatsappFile())}>load another one</button>
        </Match>
      </Switch>
      <Modal message={modalMessage} show={showModal} title={modalTitle} setShow={setShowModal}></Modal>
    </>
  )
}