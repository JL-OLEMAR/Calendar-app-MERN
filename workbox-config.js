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
