var Filter = require('broccoli-filter')
var sibilant = require('sibilant')

module.exports = SibilantFilter
SibilantFilter.prototype = Object.create(Filter.prototype)
SibilantFilter.prototype.constructor = SibilantFilter
function SibilantFilter (inputTree, options) {
  if (!(this instanceof SibilantFilter)) return new SibilantFilter(inputTree, options)
  Filter.call(this, inputTree, options)
  options = options || {}
  this.bare = options.bare
}

SibilantFilter.prototype.extensions = ['sibilant']
SibilantFilter.prototype.targetExtension = 'js'

SibilantFilter.prototype.processString = function (string) {
  var sibilantOptions = { }
  try {
    return sibilant.translateAll(string, sibilantOptions)
  } catch (err) {
    err.line = err.location && err.location.first_line
    err.column = err.location && err.location.first_column
    throw err
  }
}
