import { createSignal, onMount } from 'solid-js';
import { Store } from 'solid-js/store';
import { Whatsapp } from '../converter/Whatsapp';
import { WhatsappFile } from '../converter/WhatsappFile';
import Progress from './Progress';
import { SolidDropzone, SolidDropzoneError } from './SolidDropzone'

export function Analysis ({ file }: { file: WhatsappFile }){
  const [lineBreaks, setLineBreaks] = createSignal(0)
  const [splitMessages, setSplitMessages] = createSignal(0)
  const [formattedMessages, setFormattedMessages] = createSignal(0)
  async function onReplaceLineBreaks (current: number, max: number) {
    // console.log(current, max);
    setLineBreaks(current / max * 100)
  }
  async function onSplitMessages (current: number, max: number) {
    // console.log(current, max);
    setSplitMessages(current / max * 100)
  }

  async function onFormatMessages (current: number, max: number) {
    // console.log(current, max);
    setFormattedMessages(current / max * 100)
  }

  const whatsap = new Whatsapp(file, {
    onReplaceLineBreaks,
    onSplitMessages,
    onFormatMessages,
  })

  onMount(async () => {
    setTimeout(function(){ 
        whatsap.setData()
    }, 100)
    // whatsap.setData()
  })
  return (
    <div>
      <Progress title="Replacing line breaks" value={lineBreaks}></Progress>
      <Progress title="Splitting the messages" value={splitMessages}></Progress>
      <Progress title="Formatting messages" value={formattedMessages}></Progress>
    </div>
  )
}