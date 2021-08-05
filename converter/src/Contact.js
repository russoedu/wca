import chalk from 'chalk'
import fs from 'fs'

/**
 * Contact cleanup class
 */
export class Contact {
  /**
   * @type {{ original: 'phone or name', replacement: 'new name' }[]}
   */
   #replacement = null

   /**
    * Load the contacts replacement file
    */
   constructor () {
     try {
       const file = fs.readFileSync('./replacement.json').toString()

       this.#replacement = JSON.parse(file)
     } catch (error) {
       console.log(chalk.red('No replacement file found. A replacement file will be created with the contacts so you can make replacements in the results and join phone numbers.'))
     }
   }

   /**
    * Replace unwanted chars for their UTF8 versions and remove control chars
    * @param {string} contact The riginal contact found on the exported chat
    * @returns {string}
    */
   static clean (contact) {
     const clean = contact
       .replace(/\s/g, ' ')
       .replace(/‑/g, '-')
       .replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '')
       .replace(String.fromCharCode(8234), '')
       .replace(String.fromCharCode(8236), '')
     return clean
   }

   /**
    * Replace the contact by the replacement version in the replacement file
    * @param {string} contact The clean contact
    * @returns {string|false}
    */
   replace (contact) {
     if (!this.#replacement) {
       return false
     }
     const replacement = this.#replacement.filter(r => r.original === contact)
     if (replacement.length > 0) {
       const replaced = replacement[0].replacement
       const clean = Contact.#finalCleanup(replaced)
       return clean
     }
     return contact
   }

   /**
    * Remove commas and periods from the contact names
    * @param {string} contact The replced contact
    * @returns {string}
    */
   static #finalCleanup (contact) {
     const clean = contact
       .replace(/,/g, '')
       .replace(/\./g, '')
     return clean
   }

   /**
    * Save a JSON file for replacement
    * @param {string[]} contacts List of contacts
    */
   static saveReplacements (contacts) {
     const json = contacts.map(contact => ({
       original: contact,
       replacement: contact,
     }))

     const result = JSON.stringify(json, null, 4)

     fs.writeFileSync('./replacement.json', result)

     console.log(chalk.green('"replacement.json" file created.\nTo change the names on the results, update the "replacement" data on each contact and execute the app again.'))
   }
}
