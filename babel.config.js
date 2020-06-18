module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  // 按需打包element ui
  "plugins": [
    [
      "component", // babel-plugin-component
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
