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

var src_keys = Object.keys(phrases).map(phrase => { return phrase })

// VARIABLES ======================================
// ================================================
var openTag_re = new RegExp(/\<[A-Za-z0-9]+([-][A-Za-z0-9]+)?\s?[A-Za-z0-9]+([-][A-Za-z0-9]+)?(.*?)\>/gi)
var closeTag_re = new RegExp(/\<\/([A-Za-z0-9]+[-])?[A-Za-z0-9]+\>/gi)
var templates_re = new RegExp(/\{[A-Za-z0-9]+.*\}/gi)

// READY ==========================================
// ================================================
goTranslate(languages).then(result => {
  writeResult('./dist/', 'phrases', result)
})

// FUNCTIONS ======================================
// ================================================
async function goTranslate(languages) {
  var obj = {}
  
  for(const p in src_keys) {
    const src_key = src_keys[p]
    const str = phrases[src_key]['en-us']

    obj[src_key] = {}
    obj[src_key]['en-us'] = str

    var openTags = str.match(openTag_re)
    var closeTags = str.match(closeTag_re)
    var templates = str.match(templates_re)

    for(var i = 0; i < languages.length; i++) {
      let src = str

      // DON'T TRANSLATE HTML ELEMENTS OR VARIABLES
      src = openTags  ? subOut(openTags,  src, 'XXOPENXX')   : src
      src = closeTags ? subOut(closeTags, src, 'XXCLOSEXX')   : src
      src = templates ? subOut(templates, str, 'XXTEMPLATEXX') : src

      // // TRANSLATE DIS BITCH!
      let trx = await translate(src, languages[i])
      
      // REPLACE DUMMY TEXT WITH ORIGINAL HTML ELEMENTS & VARIABLES
      trx = openTags  ? subIn(openTags,  trx, 'XXOPENXX')   : trx
      trx = closeTags ? subIn(closeTags, trx, 'XXCLOSEXX')   : trx
      trx = templates ? subIn(templates, trx, 'XXTEMPLATEXX') : trx
    
      obj[src_key][languages[i]] = trx

    }
  }

  return obj
}

// UTILITIES ======================================
// ================================================
function subOut(arr, text, lead) {
  text = text
  arr.forEach((item, index) => {
    text = text.replace(arr[index], `${lead}${index}`)
  })
  return text
}

function subIn(arr, text, lead) {
  text = text
  arr.forEach((item, index) => {
    text = text.replace(`${lead}${index}`, arr[index])
  })
  return text
}

function writeResult(dir, filename, data) {
  fs.writeFile(`${dir}/${filename}.json`, JSON.stringify(data, null, 2), err => {
    if(err) throw err
    console.log(`${filename}.json was saved into ${dir}.`)
  })
}