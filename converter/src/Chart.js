import { chartBase } from './chart-base.js'

class Chart {
  #chartData = null
  constructor (chartData) {
    this.html = chartBase
    this.#chartData = chartData
    this.#addChartData()
    this.#addSeries()
  }

  /**
   * Replace CHART_DATA for the data on the final HTML
   */
  #addChartData () {
    const chartDataRegEx = /CHART_DATA/g

    this.html = this.html.replace(chartDataRegEx, JSON.stringify(this.#chartData))
  }

  /**
   * Replace CHART_SERIES by all the needed series on the final HTML
   */
  #addSeries () {
    const seriesRegEx = /CHART_SERIES/
    const messagesRegEx = /(.+?)_Messages$/g
    let series = ''
    const items = this.#chartData[0]
    for (const key in items) {
      const messagesExec = messagesRegEx.exec(key)

      if (key !== 'date' && messagesExec) {
        const charsKey = messagesExec[1] + '_Chars'
        const name = messagesExec[1].replace(/_/g, ' ')
        const s = `series${key}`
        series += `const ${s} = chart.series.push(new am4charts.LineSeries());
      ${s}.dataFields.valueY = "${key}";
      ${s}.dataFields.categoryX = "date";
      ${s}.strokeWidth = 2;
      ${s}.minBulletDistance = 10;
      ${s}.tooltipText = "${name}: {valueY} msgs, {${charsKey}} chars";
      ${s}.tooltip.pointerOrientation = "vertical";
      ${s}.tooltip.background.cornerRadius = 20;
      ${s}.tooltip.background.fillOpacity = 0.5;
      ${s}.tooltip.label.padding(12, 12, 12, 12);
      ${s}.name = "${name}";
      ${s}.tensionX = 0.7
      chart.scrollbarX.series.push(${s});

      `
      }
    }

    this.html = this.html.replace(seriesRegEx, series)
  }
}

export { Chart }
