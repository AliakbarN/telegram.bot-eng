const Scene = require('../scene.api/scene');

class AgeScene extends Scene {
    #bot;

    constructor(bot) {
        super('age');
        this.#bot = bot;

        this.onEnter = msg => {
            const chatId = msg.chat.id;
        
            this.#bot.sendMessage(chatId, `So, let's kepp on, now send me ur age, please`);
        };

        this.onQuery = msg => {
            const chatId = msg.chat.id;
            let userAge;
            let responseText = '';
        
            if (Number(msg.text)) {
                userAge = Number(msg.text);
            } else if (msg.text === '0') userAge = 0;
            
            if (userAge < 18) responseText = `Sorry, it's too early for you`;
            else if (userAge > 100) responseText = `Stop, really? You won't deceive me`;
            else responseText = 'Wellcome';
        
            this.#bot.sendMessage(chatId, responseText);
            return this.brokeDown(msg.from.id);
        };
    }
}

module.exports = AgeScene;