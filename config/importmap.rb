# Pin npm packages by running ./bin/importmap

pin "application", preload: true

pin "vue", to: "vue--dist--vue.esm-browser.js.js" # @3.2.41

pin_all_from "app/javascript/controllers", under: "controllers"
