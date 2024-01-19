Generate markdown content according to these rules:
1. Context elements are given by sections named "context:{{tag}}" serving as auxiliary information, never include in generated content
2. Constants are given by sections named "const:{{key}}" serving as parameters, using JSON or plain UTF-8
3. Contents is given by sections named "content" serving as the input data, asking for generated output data

A Section starts with '⫻' on a new line - then '{name}/{type}' - a colon - 'place/index' - and its data...
1. 'name' being a keyword or token: ['const','content','context']
2. 'type' being optional information: format, encoding, component type
3. data as indicated
4. a few empty lines until the end of the section



⫻content
{"type":"element","tag":"h1","props":{"id":"async-components-async-components"},"children":[{"type":"text","value":"Async Components {#async-components}"}]}
{"type":"element","tag":"h2","props":{"id":"basic-usage-basic-usage"},"children":[{"type":"text","value":"Basic Usage {#basic-usage}"}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's needed. To make that possible, Vue has a "},{"type":"element","tag":"a","props":{"href":"/api/general#defineasynccomponent"},"children":[{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"defineAsyncComponent"}]}]},{"type":"text","value":" function:"}]}
{"type":"element","tag":"pre","props":{"className":["language-js"],"code":"import { defineAsyncComponent } from 'vue'\n\nconst AsyncComp = defineAsyncComponent(() => {\n  return new Promise((resolve, reject) => {\n    // ...load component from server\n    resolve(/* loaded component */)\n  })\n})\n// ... use `AsyncComp` like a normal component\n","language":"js","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"import { defineAsyncComponent } from 'vue'\n\nconst AsyncComp = defineAsyncComponent(() => {\n  return new Promise((resolve, reject) => {\n    // ...load component from server\n    resolve(/* loaded component */)\n  })\n})\n// ... use `AsyncComp` like a normal component\n"}]}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"As you can see, "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"defineAsyncComponent"}]},{"type":"text","value":" accepts a loader function that returns a Promise. The Promise's "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"resolve"}]},{"type":"text","value":" callback should be called when you have retrieved your component definition from the server. You can also call "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"reject(reason)"}]},{"type":"text","value":" to indicate the load has failed."}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"element","tag":"a","props":{"href":"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import","rel":["nofollow"]},"children":[{"type":"text","value":"ES module dynamic import"}]},{"type":"text","value":" also returns a Promise, so most of the time we will use it in combination with "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"defineAsyncComponent"}]},{"type":"text","value":". Bundlers like Vite and webpack also support the syntax (and will use it as bundle split points), so we can use it to import Vue SFCs:"}]}
{"type":"element","tag":"pre","props":{"className":["language-js"],"code":"import { defineAsyncComponent } from 'vue'\n\nconst AsyncComp = defineAsyncComponent(() =>\n  import('./components/MyComponent.vue')\n)\n","language":"js","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"import { defineAsyncComponent } from 'vue'\n\nconst AsyncComp = defineAsyncComponent(() =>\n  import('./components/MyComponent.vue')\n)\n"}]}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"The resulting "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"AsyncComp"}]},{"type":"text","value":" is a wrapper component that only calls the loader function when it is actually rendered on the page. In addition, it will pass along any props and slots to the inner component, so you can use the async wrapper to seamlessly replace the original component while achieving lazy loading."}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"As with normal components, async components can be "},{"type":"element","tag":"a","props":{"href":"/guide/components/registration#global-registration"},"children":[{"type":"text","value":"registered globally"}]},{"type":"text","value":" using "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"app.component()"}]},{"type":"text","value":":"}]}
{"type":"element","tag":"pre","props":{"className":["language-js"],"code":"app.component('MyComponent', defineAsyncComponent(() =>\n  import('./components/MyComponent.vue')\n))\n","language":"js","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"app.component('MyComponent', defineAsyncComponent(() =>\n  import('./components/MyComponent.vue')\n))\n"}]}]}
{"type":"element","tag":"div","props":{"className":["options-api"]},"children":[{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"You can also use "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"defineAsyncComponent"}]},{"type":"text","value":" when "},{"type":"element","tag":"a","props":{"href":"/guide/components/registration#local-registration"},"children":[{"type":"text","value":"registering a component locally"}]},{"type":"text","value":":"}]},{"type":"element","tag":"pre","props":{"className":["language-vue"],"code":"<script>\nimport { defineAsyncComponent } from 'vue'\n\nexport default {\n  components: {\n    AdminPage: defineAsyncComponent(() =>\n      import('./components/AdminPageComponent.vue')\n    )\n  }\n}\n</script>\n\n<template>\n  <AdminPage />\n</template>\n","language":"vue","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"<script>\nimport { defineAsyncComponent } from 'vue'\n\nexport default {\n  components: {\n    AdminPage: defineAsyncComponent(() =>\n      import('./components/AdminPageComponent.vue')\n    )\n  }\n}\n</script>\n\n<template>\n  <AdminPage />\n</template>\n"}]}]}]}
{"type":"element","tag":"div","props":{"className":["composition-api"]},"children":[{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"They can also be defined directly inside their parent component:"}]},{"type":"element","tag":"pre","props":{"className":["language-vue"],"code":"<script setup>\nimport { defineAsyncComponent } from 'vue'\n\nconst AdminPage = defineAsyncComponent(() =>\n  import('./components/AdminPageComponent.vue')\n)\n</script>\n\n<template>\n  <AdminPage />\n</template>\n","language":"vue","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"<script setup>\nimport { defineAsyncComponent } from 'vue'\n\nconst AdminPage = defineAsyncComponent(() =>\n  import('./components/AdminPageComponent.vue')\n)\n</script>\n\n<template>\n  <AdminPage />\n</template>\n"}]}]}]}
{"type":"element","tag":"h2","props":{"id":"loading-and-error-states-loading-and-error-states"},"children":[{"type":"text","value":"Loading and Error States {#loading-and-error-states}"}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Asynchronous operations inevitably involve loading and error states - "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"defineAsyncComponent()"}]},{"type":"text","value":" supports handling these states via advanced options:"}]}
{"type":"element","tag":"pre","props":{"className":["language-js"],"code":"const AsyncComp = defineAsyncComponent({\n  // the loader function\n  loader: () => import('./Foo.vue'),\n\n  // A component to use while the async component is loading\n  loadingComponent: LoadingComponent,\n  // Delay before showing the loading component. Default: 200ms.\n  delay: 200,\n\n  // A component to use if the load fails\n  errorComponent: ErrorComponent,\n  // The error component will be displayed if a timeout is\n  // provided and exceeded. Default: Infinity.\n  timeout: 3000\n})\n","language":"js","meta":""},"children":[{"type":"element","tag":"code","props":{"__ignoreMap":""},"children":[{"type":"text","value":"const AsyncComp = defineAsyncComponent({\n  // the loader function\n  loader: () => import('./Foo.vue'),\n\n  // A component to use while the async component is loading\n  loadingComponent: LoadingComponent,\n  // Delay before showing the loading component. Default: 200ms.\n  delay: 200,\n\n  // A component to use if the load fails\n  errorComponent: ErrorComponent,\n  // The error component will be displayed if a timeout is\n  // provided and exceeded. Default: Infinity.\n  timeout: 3000\n})\n"}]}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"If a loading component is provided, it will be displayed first while the inner component is being loaded. There is a default 200ms delay before the loading component is shown - this is because on fast networks, an instant loading state may get replaced too fast and end up looking like a flicker."}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"If an error component is provided, it will be displayed when the Promise returned by the loader function is rejected. You can also specify a timeout to show the error component when the request is taking too long."}]}
{"type":"element","tag":"h2","props":{"id":"using-with-suspense-using-with-suspense"},"children":[{"type":"text","value":"Using with Suspense {#using-with-suspense}"}]}
{"type":"element","tag":"p","props":{},"children":[{"type":"text","value":"Async components can be used with the "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"<Suspense>"}]},{"type":"text","value":" built-in component. The interaction between "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"<Suspense>"}]},{"type":"text","value":" and async components is documented in the "},{"type":"element","tag":"a","props":{"href":"/guide/built-ins/suspense"},"children":[{"type":"text","value":"dedicated chapter for "},{"type":"element","tag":"code","props":{"className":""},"children":[{"type":"text","value":"<Suspense>"}]}]},{"type":"text","value":"."}]}