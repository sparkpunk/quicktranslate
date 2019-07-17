# quicktranslate
Ultralight phrase translation using Google Translate API

### Starting Out
Before anything else, you'll need to setup your own Google Cloud project and get an API key. Once you have that, create a `variables.env` file at the root of this repo and add it as the value of `GOOGLE_API=`.

### Usage
Clone the repo, and then `npm install`.
You can see a very simple demonstration by running `npm start` in your console, which will:
* import the phrases found in `./src/sample.js` (which is just a basic JavaScript array)
* translate each phrase in the array to a target language (pass the [ISO-639-1 Code](https://cloud.google.com/translate/docs/languages) as an argument on line 20 of `app.js`)
* write a new file in `./dist` as a JavaScript object with original phrases as the keys and translated phrases as values

**Here's the sample output in 🇮🇪 Irish 🇮🇪:**
```
{
  "I'd like to order a large pizza, please.": "Ba mhaith liom pizza mór a ordú, le do thoil.",
  "Do you have jalapeños?": "An bhfuil jalapeños agat?",
  "Yes, extra anchovies.": "Sea, ainseabhaithe breise."
}
```
