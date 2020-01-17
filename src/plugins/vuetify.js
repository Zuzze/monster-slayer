import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#eeeeee",
        accent: "#02aab0",
        error: "rgb(227, 102, 102)",
        warn: "#fffb7d"
      }
    }
  }
})
