import { Contact } from './Contact'
import { Message } from './Message'
import { WhatsappFile } from './WhatsappFile'

export enum DateFormat {
  DAY_MONTH_YEAR = 'DAY_MONTH_YEAR',
  MONTH_DAY_YEAR = 'MONTH_DAY_YEAR',
}

/**
 * Whatsapp messages manipulation class
 */
export class Whatsapp {
  #content: string[] = []
  #dateFormat: DateFormat = DateFormat.DAY_MONTH_YEAR
  #file: WhatsappFile
  #messageRegEx: RegExp = /(\[\d{2}\/\d{2}\/\d{4},\s\d{2}:\d{2}:\d{2}\])\s/gm
  contentSplitRegex: RegExp = /\[(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})\]\s(.+?):\s([\s\S]+)/
  contacts = {}
  #messagesData: string[] = []
  messages: (Message | null)[] = []
  chartDataByDay: object[] = []
  chartDataByMonth: object[] = []
  chartDataByYear: object[] = []
  resultCallbacks
  contactReplacements: string[] = []
  constructor (
    file:WhatsappFile,
    resultCallbacks: {
      onReplaceLineBreaks: (current: number, max: number) => Promise<void>,
      onSplitMessages: (current: number, max: number) => Promise<void>,
      onFormatMessages: (current: number, max: number) => Promise<void>,
      onSetChartContacts?: (current: number, max: number) => Promise<void>,
      onSetMessagesForChartByDay?: (current: number, max: number) => Promise<void>,
      onSetMessagesForChartByMonth?: (current: number, max: number) => Promise<void>,
      onSetMessagesForChartByYear?: (current: number, max: number) => Promise<void>
    }
  ) {
    this.#file = file
    this.resultCallbacks = resultCallbacks
  }

  async setData () {
    this.replaceLineBreaks()
    await this.splitMessages()
    await this.formatMessages()
    // this.setChartContacts(onSetChartContacts)
    // this.setMessagesForChartByDay(onSetMessagesForChartByDay)
    // this.setMessagesForChartByMonth(onSetMessagesForChartByMonth)
    // this.setMessagesForChartByYear(onSetMessagesForChartByYear)
    return 0
  }

  /**
   * Read the file and replace line breaks. Set the content to #content
   * @param {import('./File.js').File} file The chat export file path
   */
  replaceLineBreaks () {
    this.resultCallbacks.onReplaceLineBreaks(0, 1)
    this.#content = this.#file.content.replace(/\r\n/, '\n').replace(/\r/, '\n').split('\n')
    this.resultCallbacks.onReplaceLineBreaks(1, 1)
  }

  /**
   * Set each message as a string and set it as a #messagesData entry
   * Read each line and put them as a string entry. If the line does not match
   * the #messageRegEx, includes in the previus entry with a line break
   */
  async splitMessages () {
    return new Promise<void>((resolve, reject) => {
      // 
        this.#content.forEach((message, i) => {
          setTimeout(() => { 
            this.resultCallbacks.onSplitMessages(i + 1, this.#content.length)
            if (message.match(this.#messageRegEx)) {
              this.#messagesData.push(message)
            } else {
              // Join the lines that are continuation of the previus message
              this.#messagesData[i - 1] += `\n${message}`
            }
            if (i + 1 === this.#content.length) {
              resolve()
            }
          }, 1)
        })
    })    
  }

  formatMessages () {
    return new Promise<void>((resolve, reject) => {
      this.#setDateFormat()
      
      // Replace each entry by the Message instance and remove the null entries
      this.#messagesData.forEach((message, i) => {
        setTimeout(() => {
          this.resultCallbacks.onFormatMessages(i + 1, this.#messagesData.length)
          const split = this.contentSplitRegex.exec(message)
          if (split) {
            const date = this.#dateFormat === DateFormat.DAY_MONTH_YEAR
            ? `${split[1]}/${split[2]}/${split[3]} ${split[4]}:${split[5]}:${split[6]}`
            : `${split[2]}/${split[1]}/${split[3]} ${split[4]}:${split[5]}:${split[6]}`
            
            const contact: Contact = new Contact(split[7])
            
            if (!this.contactReplacements.find(c => c === contact.name)) {
              this.contactReplacements.push(contact.name)
            }
            const content = split[8]
            if (content) {
              this.messages.push(new Message(date, contact, content))
            }
          }
          if (i + 1 === this.#messagesData.length) {
            resolve()
          }
        }, 1)
      })
  
      // if (this.#messagesData.length === 0) {
      //   throw new Error('Failed to read messages from the file')
      // }
    })
  }

  // /**
  //  * Create the contacts list for the charts
  //  */
  // setChartContacts (onSetChartContacts) {
  //   if (this.messages.length === 0) {
  //     console.log('setMessages must be executed before setChartContacts')
  //     throw (new Error())
  //   }
  //   const percentage = Number((this.messages.length / 100).toFixed())
  //   let i = 0
  //   this.messages.forEach(message => {
  //     if (i % percentage === 0) {
  //       onSetChartContacts()
  //     }
  //     i++
  //     const contact = message.contact.replace(/\s/g, '_') + '_'
  //     if (!this.contacts[contact + '_Chars']) {
  //       this.contacts[contact + 'Chars'] = 0
  //       this.contacts[contact + 'Messages'] = 0
  //     }
  //   })
  //   onSetChartContacts(100)
  // }

  // /**
  //  * Creates the chart data by day
  //  */
  // setMessagesForChartByDay (onSetMessagesForChartByDay) {
  //   const percentage = Number((this.messages.length / 100).toFixed())
  //   let j = 0
  //   this.messages.forEach(message => {
  //     if (j % percentage === 0) {
  //       onSetMessagesForChartByDay()
  //     }
  //     j++
  //     const contact = message.contact.replace(/\s/g, '_') + '_'
  //     const splitted = message.date.split(' ')
  //     const date = splitted[0]

  //     const i = this.chartDataByDay.findIndex(m => m.date === date)
  //     if (i < 0) {
  //       const data = {
  //         date,
  //         ...this.contacts,
  //       }
  //       data[contact + 'Chars'] = message.chars
  //       data[contact + 'Messages'] = 1

  //       this.chartDataByDay.push(data)
  //     } else {
  //       this.chartDataByDay[i][contact + 'Chars'] += message.chars
  //       this.chartDataByDay[i][contact + 'Messages'] += 1
  //     }
  //   })
  //   onSetMessagesForChartByDay(100)
  // }

  // /**
  //  * Creates the chart data by month
  //  */
  // setMessagesForChartByMonth (onSetMessagesForChartByMonth) {
  //   const percentage = Number((this.messages.length / 100).toFixed())
  //   let j = 0
  //   const monthRegEx = /\d{2}\/(\d{2}\/\d{4})/
  //   this.messages.forEach(message => {
  //     if (j % percentage === 0) {
  //       onSetMessagesForChartByMonth()
  //     }
  //     j++
  //     const contact = message.contact.replace(/\s/g, '_') + '_'
  //     const splitted = message.date.split(' ')
  //     const date = splitted[0].replace(monthRegEx, '$1')

  //     const i = this.chartDataByMonth.findIndex(m => m.date === date)
  //     if (i < 0) {
  //       const data = {
  //         date,
  //         ...this.contacts,
  //       }
  //       data[contact + 'Chars'] = message.chars
  //       data[contact + 'Messages'] = 1

  //       this.chartDataByMonth.push(data)
  //     } else {
  //       this.chartDataByMonth[i][contact + 'Chars'] += message.chars
  //       this.chartDataByMonth[i][contact + 'Messages'] += 1
  //     }
  //   })
  //   onSetMessagesForChartByMonth(100)
  // }

  // /**
  //  * Creates the chart data by month
  //  */
  // setMessagesForChartByYear (onSetMessagesForChartByYear) {
  //   const percentage = Number((this.messages.length / 100).toFixed())
  //   let j = 0
  //   const yearRegEx = /\d{2}\/\d{2}\/(\d{4})/
  //   this.messages.forEach(message => {
  //     if (j % percentage === 0) {
  //       onSetMessagesForChartByYear()
  //     }
  //     j++
  //     const contact = message.contact.replace(/\s/g, '_') + '_'
  //     const splitted = message.date.split(' ')
  //     const date = splitted[0].replace(yearRegEx, '$1')

  //     const i = this.chartDataByYear.findIndex(m => m.date === date)
  //     if (i < 0) {
  //       const data = {
  //         date,
  //         ...this.contacts,
  //       }
  //       data[contact + 'Chars'] = message.chars
  //       data[contact + 'Messages'] = 1

  //       this.chartDataByYear.push(data)
  //     } else {
  //       this.chartDataByYear[i][contact + 'Chars'] += message.chars
  //       this.chartDataByYear[i][contact + 'Messages'] += 1
  //     }
  //   })
  //   onSetMessagesForChartByYear(100)
  // }

  /**
   * Read all messages to try and identify the date format
   * Changes this.#dateFormat to 'm' if any date has the second element bigger than 12,
   * meaning the day is the second element, not the first
   */
  #setDateFormat (): void {
    for (const message of this.#messagesData) {
      const split = this.contentSplitRegex.exec(message)
      if (!!split && Number(split[2]) > 12) {
        this.#dateFormat = DateFormat.MONTH_DAY_YEAR
        break
      }
    }
  }
}
