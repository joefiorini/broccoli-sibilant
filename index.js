var Filter = require('broccoli-filter')
var sibilant = require('sibilant')

module.exports = SibilantFilter
SibilantFilter.prototype = Object.create(Filter.prototype)
SibilantFilter.prototype.constructor = SibilantFilter
function SibilantFilter (inputTree, options) {
  if (!(this instanceof SibilantFilter)) return new SibilantFilter(inputTree, options)
  Filter.call(this, inputTree, options)
  options = options || {}
  this.macros = options.macros;
}

SibilantFilter.prototype.extensions = ['sibilant']
SibilantFilter.prototype.targetExtension = 'js'

SibilantFilter.prototype.processString = function (string) {
  var sibilantOptions = { }
  try {

    if(this.macros) {
      this.macros.forEach(function(macro) {
        sibilant.include(macro)
      });
    }

    var str = sibilant.translateAll(string, sibilantOptions)
    return str
  } catch (err) {
    err.line = err.location && err.location.first_line
    err.column = err.location && err.location.first_column
    throw err
  }
}
