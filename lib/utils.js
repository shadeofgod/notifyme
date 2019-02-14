function isNumericInt(text) {
  return text && typeof text === 'string' && text.split('').every(ch => isNumericChar(ch))
}

function isNumericChar(ch) {
  const code = typeof ch === 'string' ? ch.charCodeAt(0) : ch;
  return code >= 48 && code <= 57;
}

module.exports = {
  isNumericInt
}