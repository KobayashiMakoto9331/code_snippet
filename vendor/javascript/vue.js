import{initCustomFormatter as o,warn as e}from"@vue/runtime-dom";export*from"@vue/runtime-dom";function initDev(){o()}"production"!==process.env.NODE_ENV&&initDev();const compile=()=>{"production"!==process.env.NODE_ENV&&e('Runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".')};export{compile};

