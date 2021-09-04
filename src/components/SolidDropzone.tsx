import { onMount, createSignal } from 'solid-js';
import './SolidDropzone.css'

export enum SolidDropzoneError {
  INVALID_TYPE = 'INVALID_TYPE',
  FILE_TOO_LARGE = 'FILE_TOO_LARGE',
  FILE_TOO_SMALL = 'FILE_TOO_SMALL',
  TOO_MANY_FILES = 'TOO_MANY_FILES',
}

let inputRef: HTMLInputElement 
let dragDivRef: HTMLInputElement

export function SolidDropzone ({
  normalClass,
  draggingClass,
  normalText = null,
  draggingText = null,
  maxFiles = 1,
  accept,
  minSize = 0,
  maxSize,
  onDropAccepted,
  onDropRejected,
  }: {
    normalText?: string | null,
    draggingText?: string | null,
    draggedText?: string | null
    normalClass: string,
    draggingClass: string,
    draggedClass: string,
    maxFiles?: number,
    accept: string | string[],
    minSize?: number,
    maxSize?: number,
    onDropAccepted: (acceptedFiles: File[]) => Promise<void>,
    onDropRejected: (error: SolidDropzoneError) => void,
  }) {

  const [dropClass, setDropClass] = createSignal(normalClass)

  /**
   * Set the event listeners for input and keydown and set the multiple attribute into the input element
   */
  onMount(() => {
    inputRef.addEventListener('input', onDrop, { passive: true })
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        openFileDialog()
      }
    })
    if (maxFiles > 1) {
      inputRef.setAttribute('multiple', '')
    }
  })

  /**
   * Changes the DIV class to the "dragging class"
   * @param e {DragEvent}
   */
  function onDragging (e: DragEvent): void {
    preventDefault(e)
    setDropClass(draggingClass)
  }

  /**
   * Changes the DIV class to the "normal class"
   * @param e {DragEvent}
   */
  function onDragLeave (e: DragEvent): void {
    preventDefault(e)
    setDropClass(normalClass)
  }

  /**
   * Retrieves the files both from the drag event or from the input change event.
   * Performs all the checks on the selected files and if any of them fails, calls "onDropRejected" with the error code.
   * If all the checks pass, calls "onDropAccepted" with the array of files
   * @param e {DragEvent}
   */
  function onDrop (e: DragEvent | Event): void {
    let files: File[]
    if (e instanceof DragEvent) {
      preventDefault(e)
      onDragLeave(e)
      files = Object.values(e.dataTransfer ? e.dataTransfer.files : [])
    } else {
      files = inputRef.files ? Object.values(inputRef.files) : []
    }
    if (files.length > maxFiles) {
      onDropRejected(SolidDropzoneError.TOO_MANY_FILES)
      return
    }
    if (files.find(f => !f.name.match(new RegExp((typeof accept === 'string'? accept : accept.join('|')), 'gi')))) {
      onDropRejected(SolidDropzoneError.INVALID_TYPE)
      return
    }
    if (!!minSize && files.find(f => f.size < minSize)) {
      onDropRejected(SolidDropzoneError.FILE_TOO_SMALL)
      return
    }
    if (!!maxSize && files.find(f => f.size > maxSize)) {
      onDropRejected(SolidDropzoneError.FILE_TOO_LARGE)
      return
    }
    onDropAccepted(files)
  }

  /**
   * Prevents the default behaviour of loading the file and avoids the event propagation
   * @param e {DragEvent}
   */
  function preventDefault(e: DragEvent) {
    e.stopPropagation()
    e.preventDefault()
    
  }

  /**
   * Opens the file dialog
   */
  function openFileDialog (): void {
    inputRef.value = ''
    inputRef.click()
  }

  const normalTextAfter = !!normalText ? `.${normalClass}::after { content: "${normalText}"; }` : ''
  const draggingTextAfter = !!draggingText ? `.${draggingClass}::after { content: "${draggingText}"; }` : ''

  return (
    <>
      {/* Set the inner text of the drop area using ::after to avoid any issues with dragging over a child */}
      <style>
        {normalTextAfter}
        {draggingTextAfter}
      </style>
      <div
        id="drop-zone"
        class={dropClass()}
        aria-label="drop your file here or click"
        ondragover={onDragging}
        ondragstart={onDragging}
        ondragenter={onDragging}
        ondragend={onDragLeave}
        ondragleave={onDragLeave}
        onclick={openFileDialog}
        ondrop={onDrop}
        ref={dragDivRef}
      >
        <input
          id="drop-zone-hidden-input"
          ref={inputRef}
          accept={typeof accept === 'string' ? accept : accept.join(',')}
          type="file"
          autocomplete="off"
          tabindex="-1"
        >
        </input>
      </div>
    </>
  )
}