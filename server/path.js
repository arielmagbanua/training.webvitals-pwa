const path = require('path');

// refers to the root directory or main module.
module.exports = path.dirname(process.mainModule.filename);
