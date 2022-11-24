const Scene = require('../scene.api/scene')

class Main extends Scene {
    #bot;

    constructor(bot) {
        super('main');
        this.#bot = bot;

        this.onEnter = msg => {
            const chatId = msg.chat.id;
        
            this.#bot.sendMessage(chatId, `Hello, send me ur name`);
        };

        this.onQuery = msg => {
            const chatId = msg.chat.id;
        
            this.#bot.sendMessage(chatId, `Nice to meet u ${msg.text}!`);
        
            return this.brokeDown(msg.from.id);
        }
    }
}

module.exports = Main;