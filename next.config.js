//const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");

// module.exports = withSass({
//   cssModules: true,
// })

module.exports = withCSS({
  cssLoaderOptions: {
    url: false,
  },
});
