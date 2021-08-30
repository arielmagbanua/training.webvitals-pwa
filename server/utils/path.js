const path = require('path');

// refers to the root directory or main module.
module.exports = path.dirname(require.main.filename);
