const { getOpenAIConfiguration } = require('./providers/openai');
const { trimTrailingPunctuation } = require('./utils/utils');

class GPTLogic {
    constructor(provider, model, apiKey, maxReturnToken) {
        this.provider = provider;
        this.model = model;
        this.apiKey = apiKey;
        this.maxReturnToken = maxReturnToken;
    }

    // Methods
    async isTrue(statement) {
        if (this.provider.toLowerCase() === 'openai') {
            // OpenAI
            const openai = getOpenAIConfiguration(this.apiKey);
            const config = {
                model: this.model,
                max_tokens: this.maxReturnToken || 50,
                messages: [
                    {
                        role: 'user',
                        content: `${statement} +
                            \ndetermine if this statement is true or false? Be objective. If you can determine, return only "true" or "false". it's ok if you can't determine`,
                    },
                ],
            };
            try {
                const completion = await openai.createChatCompletion(config);
                let response = completion.data.choices[0].message.content;
                console.log(response);
                response = trimTrailingPunctuation(response);
                console.log(response);

                if (response.toLowerCase() === 'true') {
                    return {
                        hasDetermined: true,
                        result: true,
                    };
                } else if (response.toLowerCase() === 'false') {
                    return {
                        hasDetermined: true,
                        result: false,
                    };
                } else {
                    return {
                        hasDetermined: false,
                        context: response,
                    };
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }
            }
        }
    }

    async getNumber(question) {
        if (this.provider.toLowerCase() === 'openai') {
            // OpenAI
            const openai = getOpenAIConfiguration(this.apiKey);
            const config = {
                model: this.model,
                max_tokens: this.maxReturnToken || 50,
                messages: [
                    {
                        role: 'user',
                        content: `${question} +
                            \nbe objective. return only 1 Arabic number without separator. say "I don't know "if don't know`,
                    },
                ],
            };
            try {
                const completion = await openai.createChatCompletion(config);
                const response = completion.data.choices[0].message.content;
                console.log(response);
                let extractNumbers = [];
                if (response.match(/(\d+(\.\d+)?)/g)) {
                    extractNumbers = response
                        .match(/(\d+(\.\d+)?)/g)
                        .map(Number);
                }
                if (extractNumbers.length === 1) {
                    return {
                        hasResult: true,
                        singleNumber: true,
                        result: extractNumbers[0],
                    };
                } else if (extractNumbers.length > 1) {
                    return {
                        hasResult: true,
                        singleNumber: false,
                        results: extractNumbers,
                    };
                } else {
                    return {
                        hasResult: false,
                        context: response,
                    };
                }
            } catch (error) {
                if (error.response) {
                    console.log(error.response.status);
                    console.log(error.response.data);
                } else {
                    console.log(error.message);
                }
            }
        }
    }
}

module.exports = GPTLogic;
