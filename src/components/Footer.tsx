import { onMount, createSignal } from 'solid-js';

import './Footer.css'

export default function () {
  const [date, setDate] = createSignal('2021')
  onMount(() => {
    const yearNow = new Date().getFullYear()
    if (yearNow !== 2021) {
      setDate(`2021-${yearNow}`)
    }
  })
  return (
    <div class="footer" aria-label="footer">
      <a href="https://about.me/russoedu" target="_blank" class="copyright">
        © {date} Eduardo Russo
      </a>
    </div>
  )
}