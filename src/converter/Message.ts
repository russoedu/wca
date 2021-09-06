import GraphemeSplitter from 'grapheme-splitter'
import { Contact } from './Contact'

/**
 * Whatsapp message class
 */
class Message {
  date: string
  contact: Contact
  content: string
  chars: number
  /**
   *
   * @param {string} date The message date
   * @param {string} contact The name (or phone number)
   * @param {string} [content=null] The message itself
   * @param {number} [chars=null] The number of chars of the message
   * @instance { date: string, contact:string, chars: number, content?:string }
   */
  constructor (date: string, contact: Contact, content: string = '', chars = null) {
    const splitter = new GraphemeSplitter()
    this.date = date
    this.contact = contact
    this.content = content
    this.chars = chars || splitter.countGraphemes(content)
  }
}

export { Message }
