import { Contact } from './Contact.js'
import { Message } from './Message.js'

const dateFormat = {
  DAY_MONTH_YEAR: 0,
  MONTH_DAY_YEAR: 1,
}

/**
 * Whatsapp messages manipulation class
 */
export class Whatsapp {
  /**
   * @param {import('./WhtsappFile.js').WhatsappFile} file file The exported file
   */
  constructor (file) {
    this.content = ''
    this.messageRegEx = /(\[\d{2}\/\d{2}\/\d{4},\s\d{2}:\d{2}:\d{2}\])\s/gm
    this.contentSplitRegex = /\[(\d{2})\/(\d{2})\/(\d{4}),\s(\d{2}):(\d{2}):(\d{2})\]\s(.+?):\s([\s\S]+)/
    this.contacts = {}
    this.dateFormat = dateFormat.DAY_MONTH_YEAR

    /**
     * The list of messages
     * @type Message[]
     */
    this.messages = []

    /**
     * The list of messages formatted for the chart (daily messages)
     * @type {Object[]}
     */
    this.chartDataByDay = []

    /**
     * The list of messages formatted for the chart (monthly messages)
     * @type {Object[]}
     */
    this.chartDataByMonth = []
    /**
     * The list of messages formatted for the chart (yearly messages)
     * @type {Object[]}
     */
    this.chartDataByYear = []

    this.file = file
  }

  async setData ({ onSetBaseContent, onSetChatContent, onSplitMessages, onSetChartContacts, onSetMessagesForChartByDay, onSetMessagesForChartByMonth, onSetMessagesForChartByYear }) {
    this.setBaseContent(onSetBaseContent)
    this.setMessages(onSetChatContent, onSplitMessages)
    // this.setChartContacts(onSetChartContacts)
    // this.setMessagesForChartByDay(onSetMessagesForChartByDay)
    // this.setMessagesForChartByMonth(onSetMessagesForChartByMonth)
    // this.setMessagesForChartByYear(onSetMessagesForChartByYear)
    return 0
  }

  /**
   * Read the file and set the base content
   * @param {import('./File.js').File} file The chat export file path
   */
  setBaseContent (onSetBaseContent) {
    this.content = this.file.content.replace(/\r\n/, '\n').replace(/\r/, '\n').split('\n')
    onSetBaseContent(100)
  }

  /**
   * Set each message as a string as a Message entry
   */
  setMessages (onSetChatContent, onSplitMessages) {
    // Read each line and put them as a string entry. If the line does not match
    // the messageRegEx, includes in the previus entry with a line break
    let percentage = Number((this.content.length / 100).toFixed())
    // for (let i = 0; i < this.content.length; i++) {
    this.content.forEach((message, i) => {
      if (i % percentage === 0) {
        onSetChatContent(i)
      }
      // const message = this.content[i]
      if (message.match(this.messageRegEx)) {
        this.messages.push(message)
      } else {
        // Join the lines that are continuation of the previus message
        this.messages[i - 1] += `\n${message}`
      }
    })
    // }
    onSetChatContent(100)
    const contact = new Contact()
    const replacementsFileContent = []

    this.setDateFormat()

    percentage = Number((this.messages.length / 100).toFixed())
    let i = 0
    // Replace each entry by the Message instance and remove the null entries
    this.messages = this.messages
      .map(m => {
        if (i % percentage === 0) {
          onSplitMessages()
        }
        i++
        const split = this.contentSplitRegex.exec(m)
        if (!split) {
          return null
        }

        const date = this.dateFormat === dateFormat.DAY_MONTH_YEAR
          ? `${split[1]}/${split[2]}/${split[3]} ${split[4]}:${split[5]}:${split[6]}`
          : `${split[2]}/${split[1]}/${split[3]} ${split[4]}:${split[5]}:${split[6]}`

        let cont = Contact.clean(split[7])
        const content = split[8]

        const replaced = contact.replace(cont)

        if (!replaced && !replacementsFileContent.find(r => r === cont)) {
          replacementsFileContent.push(cont)
        } else if (replaced) {
          cont = replaced
        }
        return new Message(date, cont, content)
      })
      .filter(messsage => messsage != null)
    onSplitMessages(100)

    if (replacementsFileContent.length > 0) {
      Contact.saveReplacements(replacementsFileContent)
    }

    if (this.messages.length === 0) {
      throw new Error('Failed to read messages from the file')
    }
  }

  /**
   * Create the contacts list for the charts
   */
  setChartContacts (onSetChartContacts) {
    if (this.messages.length === 0) {
      console.log('setMessages must be executed before setChartContacts')
      throw (new Error())
    }
    const percentage = Number((this.messages.length / 100).toFixed())
    let i = 0
    this.messages.forEach(message => {
      if (i % percentage === 0) {
        onSetChartContacts()
      }
      i++
      const contact = message.contact.replace(/\s/g, '_') + '_'
      if (!this.contacts[contact + '_Chars']) {
        this.contacts[contact + 'Chars'] = 0
        this.contacts[contact + 'Messages'] = 0
      }
    })
    onSetChartContacts(100)
  }

  /**
   * Creates the chart data by day
   */
  setMessagesForChartByDay (onSetMessagesForChartByDay) {
    const percentage = Number((this.messages.length / 100).toFixed())
    let j = 0
    this.messages.forEach(message => {
      if (j % percentage === 0) {
        onSetMessagesForChartByDay()
      }
      j++
      const contact = message.contact.replace(/\s/g, '_') + '_'
      const splitted = message.date.split(' ')
      const date = splitted[0]

      const i = this.chartDataByDay.findIndex(m => m.date === date)
      if (i < 0) {
        const data = {
          date,
          ...this.contacts,
        }
        data[contact + 'Chars'] = message.chars
        data[contact + 'Messages'] = 1

        this.chartDataByDay.push(data)
      } else {
        this.chartDataByDay[i][contact + 'Chars'] += message.chars
        this.chartDataByDay[i][contact + 'Messages'] += 1
      }
    })
    onSetMessagesForChartByDay(100)
  }

  /**
   * Creates the chart data by month
   */
  setMessagesForChartByMonth (onSetMessagesForChartByMonth) {
    const percentage = Number((this.messages.length / 100).toFixed())
    let j = 0
    const monthRegEx = /\d{2}\/(\d{2}\/\d{4})/
    this.messages.forEach(message => {
      if (j % percentage === 0) {
        onSetMessagesForChartByMonth()
      }
      j++
      const contact = message.contact.replace(/\s/g, '_') + '_'
      const splitted = message.date.split(' ')
      const date = splitted[0].replace(monthRegEx, '$1')

      const i = this.chartDataByMonth.findIndex(m => m.date === date)
      if (i < 0) {
        const data = {
          date,
          ...this.contacts,
        }
        data[contact + 'Chars'] = message.chars
        data[contact + 'Messages'] = 1

        this.chartDataByMonth.push(data)
      } else {
        this.chartDataByMonth[i][contact + 'Chars'] += message.chars
        this.chartDataByMonth[i][contact + 'Messages'] += 1
      }
    })
    onSetMessagesForChartByMonth(100)
  }

  /**
   * Creates the chart data by month
   */
  setMessagesForChartByYear (onSetMessagesForChartByYear) {
    const percentage = Number((this.messages.length / 100).toFixed())
    let j = 0
    const yearRegEx = /\d{2}\/\d{2}\/(\d{4})/
    this.messages.forEach(message => {
      if (j % percentage === 0) {
        onSetMessagesForChartByYear()
      }
      j++
      const contact = message.contact.replace(/\s/g, '_') + '_'
      const splitted = message.date.split(' ')
      const date = splitted[0].replace(yearRegEx, '$1')

      const i = this.chartDataByYear.findIndex(m => m.date === date)
      if (i < 0) {
        const data = {
          date,
          ...this.contacts,
        }
        data[contact + 'Chars'] = message.chars
        data[contact + 'Messages'] = 1

        this.chartDataByYear.push(data)
      } else {
        this.chartDataByYear[i][contact + 'Chars'] += message.chars
        this.chartDataByYear[i][contact + 'Messages'] += 1
      }
    })
    onSetMessagesForChartByYear(100)
  }

  /**
   * Read all messages to try and identify the date format
   * Changes this.dateFormat to 'm' if any date has the second element bigger than 12,
   * meaning the day is the second element, not the first
   */
  setDateFormat () {
    for (const message of this.messages) {
      const split = this.contentSplitRegex.exec(message)
      if (!!split && split[2] > 12) {
        this.dateFormat = dateFormat.MONTH_DAY_YEAR
        break
      }
    }
  }
}
