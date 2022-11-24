const Scene = require('../scene.api/scene')
const httpRequestSaveWord = require('../../httprequests/saveWord.post')
const WordModel = require('../../db/models/word')

class SaveWord extends Scene {
    #bot;

    constructor(bot) {
        super('saveWord');
        this.#bot = bot;

        this.onEnter = msg => {
            const chatId = msg.chat.id;

            this.#bot.sendMessage(chatId, `Rules: \n
            You can send one word in one message or
            many words in one message by dividing 
            words with wite space or comma`);
            this.#bot.sendMessage(chatId, `So, send me words`);
        };

        this.onQuery = async (msg) => {
            const chatId = msg.chat.id;
            const wordText = msg.text.toLowerCase();

            if (wordText.trim() === 'stop') {
                this.#bot.sendMessage(chatId, 'Bye!');
                return this.brokeDown(msg.from.id);
            }

            let responseText = '';

            const responseFromApi = await httpRequestSaveWord.post(wordText);
            const requestStatus = responseFromApi.status;

            switch(requestStatus) {
                case 200:
                    responseText = 'The word has been seved';
                    const word = new WordModel({ word: wordText });
                    const responseFromDb = await word.save();
                    break;
                case 203:
                    responseText = 'Sorry, the word is incorrect\nPerhaps you meant :\n';

                    for (let i = 0; i < responseFromApi.data.length; i++) {
                        responseText += `${responseFromApi.data[i]}\n`;
                    }

                    break;
                case 209:
                    responseText = 'The word has alredy been saved';
                    break;
            };

            this.#bot.sendMessage(chatId, responseText);
        };
    }
}

module.exports = SaveWord