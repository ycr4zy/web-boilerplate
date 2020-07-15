import Auth from "./views/auth";

class Main {
    constructor() {
        new Auth();
    }
}

window.onload = function() {
    // Essa função eu fiz como padrão para ele do browser enviar mensagem ao servidor diretamente.
    if ('alt' in window) {
        alt.emitServer = (event, ...args) => {
            alt.emit('client/browser/emitServer', event, ...args);
        };
    }
    new Main();
};