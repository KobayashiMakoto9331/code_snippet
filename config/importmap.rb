# Pin npm packages by running ./bin/importmap
pin "application", preload: true

# ./bin/importmap pin "vue/dist/vue.esm-browser.js" --download
pin "vue", to: "vue--dist--vue.esm-browser.js.js"

# ./bin/importmap pin marked --download
pin "marked", to: "marked.js" # @3.0.8

# ./bin/importmap pin axios --download
pin "axios", to: "https://ga.jspm.io/npm:axios@0.21.4/index.js"
pin "#lib/adapters/http.js", to: "https://ga.jspm.io/npm:axios@0.21.4/lib/adapters/xhr.js"
pin "process", to: "https://ga.jspm.io/npm:@jspm/core@2.0.0-beta.24/nodelibs/browser/process-production.js"

# ./bin/importmap pin vue-router --download
pin "vue-router", to: "vue-router--dist--vue-router.esm-browser.js.js" # @4.1.6
pin "@vue/devtools-api", to: "@vue--devtools-api.js" # @6.4.5
pin "@vue/reactivity", to: "@vue--reactivity.js" # @3.2.45
pin "@vue/runtime-core", to: "@vue--runtime-core.js" # @3.2.45
pin "@vue/runtime-dom", to: "@vue--runtime-dom.js" # @3.2.45
pin "@vue/shared", to: "@vue--shared.js" # @3.2.45

# ./bin/importmap pin vuedraggable@next --download
pin "vuedraggable" # @4.1.0
pin "sortablejs" # @1.10.2
pin "@vue/compiler-core", to: "@vue--compiler-core.js" # @3.2.45
pin "@vue/compiler-dom", to: "@vue--compiler-dom.js" # @3.2.45

pin_all_from "app/javascript/controllers", under: "controllers"
