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

// VARIABLES ======================================
// ================================================
var re = new RegExp(/{[A-Za-z]+}/gi)

// READY ==========================================
// ================================================
goTranslate('it').then(result => {
  writeResult('./dist/', 'phrases', result)
})

// FUNCTIONS ======================================
// ================================================
async function goTranslate(lang) {
  var obj = {}
  
  for(const p in phrases) {
    let str = phrases[p]
    let trx = await translate(str, lang)  
    obj[phrases[p]] = trx
  }

  return obj
}

// UTILITIES ======================================
// ================================================
function writeResult(dir, filename, data) {
  fs.writeFile(`${dir}/${filename}.json`, JSON.stringify(data, null, 2), err => {
    if(err) throw err
    console.log(`${filename}.json was saved into ${dir}.`)
  })
}