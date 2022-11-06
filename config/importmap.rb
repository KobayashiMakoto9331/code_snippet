# Pin npm packages by running ./bin/importmap
pin "application", preload: true

# ./bin/importmap pin "vue/dist/vue.esm-browser.js" --download
pin "vue", to: "vue--dist--vue.esm-browser.js.js" # @3.2.41

# ./bin/importmap pin axios --download
pin "axios", to: "https://ga.jspm.io/npm:axios@0.21.4/index.js"
pin "#lib/adapters/http.js", to: "https://ga.jspm.io/npm:axios@0.21.4/lib/adapters/xhr.js"
pin "process", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.24/nodelibs/browser/process-production.js"

# ./bin/importmap pin vue-router@4 --download
pin "vue-router" # @4.1.6
pin "@vue/devtools-api", to: "@vue--devtools-api.js" # @6.4.5
pin "@vue/reactivity", to: "@vue--reactivity.js" # @3.2.41
pin "@vue/runtime-core", to: "@vue--runtime-core.js" # @3.2.41
pin "@vue/runtime-dom", to: "@vue--runtime-dom.js" # @3.2.41
pin "@vue/shared", to: "@vue--shared.js" # @3.2.41

pin_all_from "app/javascript/controllers", under: "controllers"
