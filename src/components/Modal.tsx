import { onMount } from 'solid-js';
import './Modal.css'
declare type ModalOptions = {
  message: () => string,
  title: () => string,
  show: () => boolean,
  setShow: (v: boolean | ((prev: boolean) => boolean)) => boolean,
}
export default function ({ message, title, show, setShow }: ModalOptions) {
  /**
   * Set the event listeners for input and keydown and set the multiple attribute into the input element
   */
   onMount(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Enter' || e.code === 'KeyX' || e.code === 'Space') {
        hideModal()
      }
    })
  })

  function hideModal () {
    setShow(false)
  }

  return (
    <div class={show() ? 'modal is-active' : 'modal'}>
      <div class="modal-background" onclick={hideModal}></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{title}</p>
        </header>
        <section class="modal-card-body">
          {message}
        </section>
      </div>
      <button class="modal-close is-large" aria-label="close" onclick={hideModal}></button>
    </div>
  )
}