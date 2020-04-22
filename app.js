// NODE ENVIRONMENT VARIABLES
require('dotenv').config({ path: 'variables.env' })

// NODE MODULES ===================================
// ================================================
const fs = require('fs')
const translate = require('translate')
      translate.key = process.env.GOOGLE_API

// IMPORTS ========================================
// ================================================
var { phrases } = require('./src/sample')
var { languages } = require('./src/languages')

var language_codes = Object.keys(languages)
var language_names = Object.values(languages)
// VARIABLES ======================================
// ================================================
var sentence = "Live many years, for the foolishest thing a man can do in this life is to let himself die."
// READY ==========================================
// ================================================
goTranslate(language_codes).then(data => {
  var obj = {}
  var substitutes = Object.keys(data)

  for(const l in language_codes) {
    var lang_code = language_codes[l]
    var lang_name = language_names[l]
    var local_sentence = `<p id='quote' data='${lang_name}' class='book-quote inline'>${sentence}</p>`
    
    substitutes.forEach(substitute => {
      var substitute_REGX = new RegExp('\\b' + substitute + '\\b', 'g')
      var translation = data[substitute][lang_code]
      var trx_with_bg = background_gradient(translation)

      local_sentence = local_sentence.replace(substitute_REGX, trx_with_bg)
    })

    local_sentence = local_sentence.replace(/\<\/span\>\<\/span\>\./g, '.</span></span>')
    local_sentence = local_sentence.replace(/\<\/span\>\<\/span\>\,/g, ',</span></span>')
    local_sentence = local_sentence.replace(/\<\/span\>\<\/span\>\;/g, ';</span></span>')

    obj[lang_name] = local_sentence
  }

  writeResult('./dist/', 'phrases', obj)
})

// FUNCTIONS ======================================
// ================================================
async function goTranslate(arr) {
  var obj = {}

  phrases.forEach(phrase => {
    obj[phrase] = {}
    obj[phrase]['en'] = phrase
  })

  var phr_str = phrases.join('\n')

  for(const l in arr) {
    var lang = arr[l]
    var trx_str = await translate(phr_str, lang)


    var trx_arr = trx_str.split('\n')
    var phr_arr = phr_str.split('\n')

    trx_arr.forEach((trx, ind) => {
      obj[phr_arr[ind]][lang] = trx
    })
  }

  return obj
}

// UTILITIES ======================================
// ================================================
function writeResult(dir, filename, data) {
  fs.writeFile(`${dir}/${filename}.json`, `var languages = ${JSON.stringify(data, null, 2)}`, err => {
    if(err) throw err
    console.log(`${filename}.json was saved into ${dir}.`)
  })
}

function background_gradient(str) {
  return `<span class='spectrum-bg'><span class='inline reversed'>${str}</span></span>`
}