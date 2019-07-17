# quicktranslate
Ultralight phrase translation using Google Translate API

### Starting Out
Before anything else, you'll need to setup your own Google Cloud project and get an API key. Once you have that, create a `variables.env` file at the root of this repo and add it as the value of `GOOGLE_API=`.

### Usage
Clone the repo, and then `npm install`. Any version of Node greater than 7 works, but you could just as easily `nvm use` in the repo's root and `.nvmrc` will take care of that for you.
You can see a very simple demonstration by running `npm start` in your console, which will:
* import the phrases found in `./src/sample.js` (which is just a basic JavaScript array)
* translate each phrase in the array to a target language (pass the [ISO-639-1 Code](https://cloud.google.com/translate/docs/languages) as an argument on line 20 of `app.js`)
* write a new file in `./dist` as a JavaScript object with original phrases as the keys and translated phrases as values

### Sample
**Here's the sample output in 🇮🇹🍕 Italian 🍕🇮🇹:**
```
{
  "I'd like to order a large pizza, please.": "Mi piacerebbe ordinare una pizza grande, per favore.",
  "Do you have jalapeños?": "Hai jalapeños?",
  "Yes, extra anchovies.": "Sì, acciughe extra."
}
```
