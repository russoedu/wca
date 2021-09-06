class Format {
  static plural (count, text, displayNumber = true, irregularPlural = null) {
    let plural = irregularPlural === null ? `${text}s` : irregularPlural
    plural = count === 1 ? text : plural

    return `${displayNumber ? `${count} ` : ''}${plural}`
  }
}

export { Format }
