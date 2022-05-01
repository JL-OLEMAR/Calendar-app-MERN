# Calendar App

### Install Dependencies with ***pnpm***
```bash
pnpm install
```

### Run App
```bash
pnpm start
```

### Run Tests
For the test to run, I need the DB to be running. And have the `.env.test.local`
```bash
pnpm test
```
### Linter and Formatter with **Standard**
```bash
pnpm lint
```

## Add PWA
1) Install workbox-cli
```bash
pnpm install -g workbox-cli
```

2) Run workbox-cli
```bash
workbox wizard
```

3) Add script to the index.html
```html
<script>
  const isProduction = ('%NODE_ENV%' === 'production');
  if (isProduction && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
  }
</script>
```

1) Generate the SW manuall 
   - Create file for workbox configuration
   ```js
   module.exports = {
   globDirectory: 'build/',
   globPatterns: [
     '**/*.{json,ico,html,png,txt,css,js}'
   ],
   // ignoreURLParametersMatching: [
   //   /^utm_/,
   //   /^fbclid$/
   // ],
   swSrc: 'src/sw-template.js',
   swDest: 'build/sw.js'
   }
   ```

   - Create a file in the path `src/sw-template.js`
     - Import the workbox CDN.
     - Add strategies, routing, ... from the workbox.

   - Add a script for run workbox
   ```json
   {
     "pwa": "workbox injectManifest"
   }
   ```

