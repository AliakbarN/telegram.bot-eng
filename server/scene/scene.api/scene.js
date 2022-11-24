class Scene {
    name;
    onEnter ( msg ) {};
    onQuery ( msg ) {};

    constructor( name ) {
        this.name = name;
    };

    jumpToAnotherScene ( name, id ) {
        return { name, id, flag: true };
    };

    defaultReject ( id ) {
        return { id, flag: false, defaultReject: true };
    };

    brokeDown ( id ) {
        return { id, flag: false, brokeDown: true };
    };
}

module.exports = Scene;