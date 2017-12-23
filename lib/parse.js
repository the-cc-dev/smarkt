var assert = require('assert')
var yaml = require('js-yaml')
var xtend = require('xtend')

var utils = require('./utils')

module.exports = parse

function parse (str) {
  assert.equal(typeof str, 'string', 'smarkt: arg1 str must be type string')

  return str
    .split('\n----')
    .filter(str => str)
    .reduce(function (result, field) {
      var data = field
        .replace(/^\s+|\s+$/g, '')
        .split(/:([^]+)/)
        .filter(str => str.trim() !== '')

      if (data.length >= 2) {
        if (data[1].trim().charAt(0) !== '-') {
          result[data[0].toLowerCase()] = utils.setBool(data[1].trim())
        } else {
          result = xtend(result, utils.keysToLowerCase(yaml.safeLoad(field)))
        }
      }

      return result
    }, { })
}