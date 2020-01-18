import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#ffffff",
        secondary: "#eeeeee",
        accent: "#1d324a",
        error: "#e36666",
        warn: "#fffb7d"
      }
    }
  }
})
