# GPT-Logic

The purpose of this package is to translate the natural language generated by OpenAI's GPT models or any other large language models into JavaScript data types like booleans and objects.

## Getting started

Install the package from NPM

```bash
npm i gpt-logic
```

## How to use

Import the package

```JavaScript
const GPTLogic = require('gpt-logic');
```

Instantiate a GPTLogic object

```JavaScript
const gptLogic = new GPTLogic('YOUR_PROVIDER', 'MODEL_NAME', 'CREDENTIAL');
```

### Providers and models

Currently, the following providers and models are supported:

-   OpenAI
-   -   gpt-3.5-turbo
-   -   gpt-4

## Call functions

This example calls the `isTrue` function:

```Javascript
const call = async () => {
    const result = await gptLogic.isTrue(`The earth is flat`);
    console.log(JSON.stringify(result));
};
call();
```

And you will expect the following response:

```json
{ "hasDetermined": true, "result": false }
```

### Available functions

-   isTrue
-   getNumbers
