import Vue from 'vue/dist/vue.common';
import VueSlideUpDown from 'vue-slide-up-down'

class Auth {
    constructor() {
        if (window.location.href.indexOf('auth') > -1) {
            this.initScript();
        }
    }
    initScript() {
        window.vm = new Vue({
            el: "#Auth",
            components: {
                VueSlideUpDown
            },
            data: {
            },
            computed: {
               
            },
            methods: {
              
            },
            mounted() {
            },
            created() {}
        });
    }
}

export default Auth;