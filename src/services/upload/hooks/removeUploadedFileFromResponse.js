'use strict';

// src/services/upload/hooks/removeUploadedFileFromResponse.js
//
// We don't want the response for upload to contain the file, since we only need the filename (hook.result.id)

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {

    delete hook.result.uri;

    hook.removeUploadedFileFromResponse = true;
  };
};
