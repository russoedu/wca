import cliProgress from 'cli-progress'

export class Progress {
  #bar
  #current
  #max
  constructor (message, max) {
    const repeat = 45 - message.length
    const options = {
      format: `${message}${'.'.repeat(repeat)} [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`,
    }
    this.#bar = new cliProgress.SingleBar(options, cliProgress.Presets.shades_classic)
    this.#bar.start(max, 0)
    this.#current = 0
    this.#max = max
  }

  update () {
    this.#current += 1
    this.#bar.update(this.#current)
    if (this.#max === this.#current) {
      this.#bar.stop()
    }
  }

  endProgress () {
    this.#bar.update(this.#max)
  }
}
