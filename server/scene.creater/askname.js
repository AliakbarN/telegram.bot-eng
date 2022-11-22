const Scene = require('../scene.api/scene');

class NameScene extends Scene {
    #bot;

    constructor(bot) {
        super('name');
        this.#bot = bot;

        this.onEnter = msg => {
            const chatId = msg.chat.id;
        
            bot.sendMessage(chatId, `Hello, I'm ur personal bot. Let's get acquainted, Please send me ur name`);
        };

        this.onQuery = msg => {
            console.log('query func');
            const chatId = msg.chat.id;
        
            bot.sendMessage(chatId, `Hello ${msg.text}!`);
        
            return this.jumpToAnotherScene('age', msg.from.id);
        };
    }
}

module.exports = NameScene;