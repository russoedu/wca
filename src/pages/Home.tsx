import FileDrop, {FileDropError} from "../components/FileDrop";
import Modal from "../components/Modal";
import './Home.css'

export default function () {
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

  function onDropRejected (error: FileDropError) {
    console.log(error)
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
    <Modal message='hellor' show={true} title='Olar' setShow='vamo'></Modal>
    </>
  )
}