class Helper {
    static wait ( time ) {
        return new Promise( (resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, time * 1000);
        })
    };

    static async logWithDelay (text, time) {
        await this.wait(time);
        console.log(text);
    }
};

module.exports = Helper;