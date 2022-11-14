const { defineConfig } = require("@vue/cli-service");
(module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/api",
        changerOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  outputDir: "../backend/public",
}),
  defineConfig({
    transpileDependencies: true,

    pluginOptions: {
      vuetify: {
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
      },
    },
  });
