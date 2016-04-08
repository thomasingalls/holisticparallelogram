<<<<<<< 690da52687f82d262d434b5f2d41bcc486f8d096
/**
 * These rules enforce the Hack Reactor Style Guide:
 *   http://bookstrap.hackreactor.com/wiki/Style-Guide
 *
 * Visit this repo for more information:
 *   https://github.com/hackreactor-labs/eslint-config-hackreactor
 */

module.exports = {
  extends: './node_modules/eslint-config-hackreactor/index.js',
  parserOptions: {
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "experimentalObjectRestSpread": true
        }
  }
}

>>>>>>> Eslint file from previous rebase
