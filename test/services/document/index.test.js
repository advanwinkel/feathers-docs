'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('document service', function() {
  it('registered the documents service', () => {
    assert.ok(app.service('documents'));
  });
});
