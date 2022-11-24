const Helper = require('../../helper')

class Controller {
    #scenes = {};
    #users = {};
    #bot;
    #defaultReject (msg) {};

    constructor(bot, ...args) {
        this.#bot = bot;
        args.forEach( scene => {
            this.#scenes[scene.name] = {
                onEnter: scene.onEnter,
                onQuery: scene.onQuery
            }
        });
    };

    async enter ( name, id, msg ) {
        this.#users[id] = this.#scenes[name];
        await Helper.wait(0.3);
        this.#users[id].onEnter(msg);
    };

    on () {
        console.log('Scenes listener is ready ...');
        this.#bot.on('message', msg => {
            if (this.#users[msg.from.id]) {
                const response = this.#users[msg.from.id].onQuery(msg);

                if (response.flag) this.#replaceScene(response.name, response.id, msg);
                else {
                    if (response.brokeDown) return this.#brokeDown(response.id);

                    if (response.defaultReject) return this.#defaultReject(msg);
                }
            }
        })
    };

    async #replaceScene ( name, id, msg ) {
        this.#users[id] = this.#scenes[name];
        await Helper.wait(0.3);
        this.#users[id].onEnter(msg);
    };

    #brokeDown ( id ) {
        this.#users[id] = undefined;
    };
}

module.exports = Controller;