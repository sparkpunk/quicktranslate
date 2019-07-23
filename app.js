// NODE ENVIRONMENT VARIABLES
require('dotenv').config({ path: 'variables.env' })

// NODE MODULES ===================================
// ================================================
const fs = require('fs')
const translate = require('translate')
      translate.key = process.env.GOOGLE_API

// IMPORTS ========================================
// ================================================
var { phrases } = require('./src/sample-sm')

// phrases = Object.entries(phrases).map(phrase => { return phrase })

// VARIABLES ======================================
// ================================================
var vars_re = new RegExp(/\{[A-Za-z0-9]+.+?\}/gi)
var open_re = new RegExp(/\<[A-Za-z0-9]+([-][A-Za-z0-9]+)?\s?[A-Za-z0-9]+([-][A-Za-z0-9]+)?(.+?)\>/gi)
var close_re = new RegExp(/\<\/([A-Za-z0-9]+[-])?[A-Za-z0-9]+\>/gi)
// READY ==========================================
// ================================================
goTranslate('it').then(result => {
  writeResult('./dist/', 'phrases', result)
})

// FUNCTIONS ======================================
// ================================================
async function goTranslate(lang) {
  var obj = {}
  var ind = 0
  
  for(const p in phrases) {
    let str = phrases[p]

    let var_temps = str.match(vars_re)
    let open_tags = str.match(open_re)
    let close_tags = str.match(close_re)
    
    if(open_tags) {
      open_tags.forEach((match, index) => {
        str = str.replace(open_tags[index], `DUMMYOPENER${index} `)
      })
      close_tags.forEach((match, index) => {
        str = str.replace(close_tags[index], `DUMMYCLOSER${index} `)
      })
    }

    if(var_temps) {
      var_temps.forEach((match, index) => {
        str = str.replace(var_temps[index], `DUMMYTEMPLATE${index} `)
      })
    }

    // TRANSLATE DIS BITCH!
    let trx = await translate(str, lang)
    
    if(open_tags) {
      open_tags.forEach((match, index) => {
        trx = trx.replace(`DUMMYOPENER${index}`, open_tags[index].trim())
      })
      close_tags.forEach((match, index) => {
        trx = trx.replace(`DUMMYCLOSER${index}`, close_tags[index].trim())
      })
    }

    if(var_temps) {
      var_temps.forEach((match, index) => {
        trx = trx.replace(`DUMMYTEMPLATE${index}`, var_temps[index].trim())
      })
    }

    obj[ind] = trx
    ind++
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