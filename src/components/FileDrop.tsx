import { SolidDropzone, SolidDropzoneError } from './SolidDropzone'
import { WhatsappFile } from '../converter/WhatsappFile'
import './FileDrop.css'
let i = 0
export function FileDrop ({
  onSuccess,
  onError
}: {
  onSuccess: (file: WhatsappFile) => Promise<void>,
  onError: (error: string) => void
}) {
  async function onDropAccepted (acceptedFiles: File[]) {
    console.log(i++)
    const fileData = acceptedFiles?.[0]
    
    const file = new WhatsappFile(await fileData.text(), fileData.name)
    if (file.loaded) {
      onSuccess(file)
    } else {
      console.log(i++)
      onError(file.error)
    }
  }

  function onDropRejected (error: SolidDropzoneError) {
    console.log(i++)
    
    if (error === SolidDropzoneError.INVALID_TYPE) {
      onError('<p>The selected file is not a Whatsapp message export.</p><p>Please select a .txt file that is usually called "_chat.txt"</p>')
    } else if (error === SolidDropzoneError.TOO_MANY_FILES) {
      onError('<p>Please select a single file to analyse.</p><p>Usually the file is called "_chat.txt"</p>')
    } else {
      onError('<p>An unknown error ocourred</p><p>Please reload the page and try again</p>')
    }
  }
  return (
    <>
    <h1 class="title">
      Load a chat export text file to start.
    </h1>
    <SolidDropzone
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
    ></SolidDropzone>
    </>
  )
}