import fs from 'fs'
import csvStringify from 'csv-stringify'

const folder = './WhatsappConversion/'
/**
 * File manipulation class
 */
class File {
  /**
   * Create a file intance
   * @param {object[]} acceptedFiles The chat export path
   */
  constructor (content, name) {
    const messageRegEx = /(\[\d{2}\/\d{2}\/\d{4},\s\d{2}:\d{2}:\d{2}\])\s/gm
    const exec = messageRegEx.exec(content)
    if (!exec) {
      this.loaded = false
      this.error = `<p>"${name}" was not recognised as a Whatsap chat export. Please make sure the file text looks like:</p>
<pre>
[23/02/2014, 21:37:37] ‎You were added
[24/02/2014, 00:11:31] ‪+44 0 9999-999-999: I'm in!
[24/02/2014, 00:27:35] ‪Paul: LOL
[24/02/2014, 00:29:42] Francis: Who is this?
[24/02/2014, 00:29:53] Carl: Where's Johnny?
</pre>`
    } else {
      this.content = content
      this.loaded = true
    }
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
