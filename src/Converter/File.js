import fs from 'fs'
import csvStringify from 'csv-stringify'
import chalk from 'chalk'

const folder = './WhatsappConversion/'
/**
 * File manipulation class
 */
class File {
  /**
   * Create a file intance
   * @param {object[]} acceptedFiles The chat export path
   */
  constructor (content) {
    this.content = content
    this.loaded = true
    console.log(chalk.green.bold('file loaded'))
  }

  /**
   * Convert the array to JSON and save the file
   * @param {import('./Message.js').Message[]} data
   * @param {string} name
   */
  static saveJson (data, name) {
    fs.writeFileSync(folder + name, JSON.stringify(data, null, 2))
  }

  static saveHtml (html, name) {
    fs.writeFileSync(folder + name, html)
  }

  /**
   * Convert the array to CSV and save the file
   * @param {import('./Message.js').Message[]} data
   * @returns {Promise<true|Error>}
   */
  static async saveCsv (data) {
    const options = {
      delimiter: ',',
      quoted: true,
      header: true,
      columns: [
        'date',
        'contact',
        'content',
        'chars',
      ],
    }

    return new Promise((resolve, reject) => {
      csvStringify(data, options, (err, output) => {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          fs.writeFileSync(folder + 'result.csv', output)
          resolve(true)
        }
      })
    })
  }
}

export { File }
