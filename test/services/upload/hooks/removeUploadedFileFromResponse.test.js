'use strict';

const assert = require('assert');
const removeUploadedFileFromResponse = require('../../../../src/services/upload/hooks/removeUploadedFileFromResponse.js');

describe('upload removeUploadedFileFromResponse hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    removeUploadedFileFromResponse()(mockHook);

    assert.ok(mockHook.removeUploadedFileFromResponse);
  });
});
