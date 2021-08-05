import fs from 'fs'
import { Terminal } from './Terminal.js'
import csvStringify from 'csv-stringify'
import chalk from 'chalk'
import AdmZip from 'adm-zip'

const folder = './WhatsappConversion/'
/**
 * File manipulation class
 */
class File {
  /**
   * Create a file intance
   * @param {string} filePath The chat export path
   * @param {boolean} isZip Flag for zip files
   */
  constructor (filePath, isZip = false) {
    try {
      fs.mkdirSync(folder)
    } catch (error) {
      // Folder already exists
    }
    if (isZip) {
      const zip = new AdmZip(filePath)
      const zipEntries = zip.getEntries() // an array of ZipEntry records

      zipEntries.forEach(zipEntry => {
        if (zipEntry.entryName === '_chat.txt') {
          this.content = (zipEntry.getData().toString())
        }
      })
      if (!this.content) {
        console.log(chalk.red('Error loading file:\nNo "_chat.txt" found in the zip'))
        return { loaded: false }
      }
      // outputs the content of some_folder/my_file.txt
      // extracts the specified file to the specified location
      // zip.extractEntryTo(/* entry name */ '../chat.txt', /* target path */ '.', /* maintainEntryPath */ false, /* overwrite */ true)
      // extracts everything
    } else {
      try {
        /**
         * @type string
         */
        this.content = fs.readFileSync(filePath).toString()
      } catch (error) {
        console.log(chalk.red(`Error loading file:\n${error}`))
        return { loaded: false }
      }
    }
    this.loaded = true
    console.log(chalk.green.bold(`${filePath} loaded`))
  }

  /**
   * Load a new file
   * First try to load witht the default name and if not found, display the interface to load a file
   * @returns {Promise<File|Error>}
   */
  static async getChatFile () {
    /**
     * @type {string[]}
     */
    const content = fs.readdirSync('./')
    let filePath = content.find(dir => dir === '_chat.txt')

    if (filePath) {
      console.log(chalk.bold('_chat.txt found'))
    } else {
      filePath = await Terminal.getPath()
    }
    return (new File(filePath, !!filePath.match(/.*?\.zip/)))
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
