import chalk from 'chalk'
import fs from 'fs'
import inquirer from 'inquirer'

/**
 * Terminal Kit simplified class
 */
export class Terminal {
  /**
   * Display the interface to select a file and returns the file path
   * @returns {Promise<string|error>}
   */
  static async getPath () {
    console.log(chalk.blue.bold('_chat.txt not found'))
    const choices = fs.readdirSync('./').filter(file => file.match(/.*?(\.txt|\.zip)/))
    const promptOptions = {
      type: 'list',
      name: 'file',
      message: 'Please choose the chat export file (.txt) or package (.zip) to continue:',
      choices,
    }

    return inquirer
      .prompt(promptOptions)
      .then(answers => {
        return answers.file
      })
      .catch(error => {
        chalk.red(error)
      })
  }
}
