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

src_keys = Object.keys(phrases).map(phrase => {
  return phrase
})

// VARIABLES ======================================
// ================================================
var openTag_re = new RegExp(/\<[A-Za-z0-9]+([-][A-Za-z0-9]+)?\s?[A-Za-z0-9]+([-][A-Za-z0-9]+)?(.+?)\>/gi)
var closeTag_re = new RegExp(/\<\/([A-Za-z0-9]+[-])?[A-Za-z0-9]+\>/gi)
var templateStr_re = new RegExp(/\{[A-Za-z0-9]+\}/gi)

// READY ==========================================
// ================================================
goTranslate('it').then(result => {
  writeResult('./dist/', 'phrases', result)
})

// FUNCTIONS ======================================
// ================================================
async function goTranslate(lang) {
  var obj = {}
  
  for(const p in src_keys) {
    let src_key = src_keys[p]

    let str = phrases[src_key]['en-us']
    let elem_openTag = str.match(openTag_re)
    let elem_closeTag = str.match(closeTag_re)
    let template_strs = str.match(templateStr_re)
    
    // // DON'T TRANSLATE HTML ELEMENTS OR VARIABLES
    str = elem_openTag ? subOut(elem_openTag, str, 'OPENER')      : str
    str = elem_closeTag ? subOut(elem_closeTag, str, 'CLOSER')    : str
    str = template_strs ? subOut(template_strs, str, 'TEMPLATE')  : str
    
    // // TRANSLATE DIS BITCH!
    let trx = await translate(str, lang)
    
    // // REPLACE DUMMY TEXT WITH ORIGINAL HTML ELEMENTS & VARIABLES
    trx = elem_openTag ? subIn(elem_openTag, trx, 'OPENER')     : trx
    trx = elem_closeTag ? subIn(elem_closeTag, trx, 'CLOSER')   : trx
    trx = template_strs ? subIn(template_strs, trx, 'TEMPLATE') : trx

    obj[src_key] = {}
    obj[src_key]['en-us'] = str
    obj[src_key][lang] = trx
  }

  return obj
}

// UTILITIES ======================================
// ================================================
function subOut(arr, str, lead) {
  str = str
  arr.forEach((item, index) => {
    str = str.replace(arr[index], `DUMMY${lead}${index}`)
  })
  return str
}

function subIn(arr, str, lead) {
  str = str
  arr.forEach((item, index) => {
    str = str.replace(`DUMMY${lead}${index}`, arr[index])
  })
  return str
}

function writeResult(dir, filename, data) {
  fs.writeFile(`${dir}/${filename}.json`, JSON.stringify(data, null, 2), err => {
    if(err) throw err
    console.log(`${filename}.json was saved into ${dir}.`)
  })
}