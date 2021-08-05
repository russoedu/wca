import { Whatsapp } from './Whatsapp.js'
import { File } from './File.js'
import { Chart } from './Chart.js'
import { Progress } from './Progress.js'
import chalk from 'chalk'

async function WhatsappChatConverter () {
  const file = await File.getChatFile()

  if (file.loaded) {
    try {
      const whatsapp = new Whatsapp(file)
      const chartByDay = new Chart(whatsapp.chartDataByDay)
      const chartByMonth = new Chart(whatsapp.chartDataByMonth)
      const chartByYear = new Chart(whatsapp.chartDataByYear)
      const jsonProgress = new Progress('Saving JSON files', 4)
      File.saveJson(whatsapp.messages, 'result.json')
      jsonProgress.update()
      File.saveJson(whatsapp.chartDataByDay, 'result-day.json')
      jsonProgress.update()
      File.saveJson(whatsapp.chartDataByMonth, 'result-month.json')
      jsonProgress.update()
      File.saveJson(whatsapp.chartDataByYear, 'result-year.json')
      jsonProgress.update()

      const htmlProgress = new Progress('Saving HTML files', 3)
      File.saveHtml(chartByDay.html, 'chart-day.html')
      htmlProgress.update()
      File.saveHtml(chartByMonth.html, 'chart-month.html')
      htmlProgress.update()
      File.saveHtml(chartByYear.html, 'chart-year.html')
      htmlProgress.update()

      const csvProgress = new Progress('Saving CSV files', 1)
      await File.saveCsv(whatsapp.messages)
      csvProgress.update()

      console.log(chalk.green('All files saved in the WhatsappConversion folder'))
    } catch (error) {
      console.log(chalk.red.bold(`An error occurred:\n${error}`))
    }
  }
}

WhatsappChatConverter()
