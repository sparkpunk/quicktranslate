# quicktranslate
Ultralight phrase translation using Google Translate API

### Starting Out
Before anything else, you'll need to setup your own Google Cloud project and get an API key. Once you have that, create a `variables.env` file at the root of this repo and add it as the value of `GOOGLE_API=`.

### Usage
Clone the repo, and then `npm install`. Any version of Node greater than 7 works, but you could just as easily `nvm use` in the repo's root and `.nvmrc` will take care of that for you.
You can see a very simple demonstration by running `npm start` in your console, which will:
* import the phrases found in `./src/sample.js` (which is just a basic JavaScript array)
* define your languages in `./src/languages.js` (another array)
* translate each phrase in the array to a target language (pass the [ISO-639-1 Code](https://cloud.google.com/translate/docs/languages) as an argument on line 20 of `app.js`)
* write a new file in `./dist` as a JavaScript object with original phrases as the keys and translated phrases as values

### Sample
**Here's the sample output in 🇮🇹🇩🇪🍕 Italian & German 🍕🇩🇪🇮🇹:**
```
{
  "doYouHaveJalapenos": {
    "en-us": "Do you have jalapeños?",
    "de": "Hast du Jalapeños?",
    "it": "Hai jalapeños?"
  },
  "orderPizza": {
    "en-us": "I'd like to order a {large_pizza}, please.",
    "de": "Ich möchte bitte eine {large_pizza} bestellen.",
    "it": "Vorrei ordinare un {large_pizza}, per favore."
  },
  "extraToppings": {
    "en-us": "Yes, please add <div ng-repeat=\"topping in $ctrl.getToppings()\"><span ng-bind=\"::topping.name\"></span></div>.",
    "de": "Ja, bitte <div ng-repeat=\"topping in $ctrl.getToppings()\"><span ng-bind=\"::topping.name\"></span></div> hinzufügen.",
    "it": "Sì, aggiungi <div ng-repeat=\"topping in $ctrl.getToppings()\"><span ng-bind=\"::topping.name\"></span></div>."
  }
}
```
