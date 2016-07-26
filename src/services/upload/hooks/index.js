'use strict';

const removeUploadedFileFromResponse = require('./removeUploadedFileFromResponse');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;


exports.before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [removeUploadedFileFromResponse()],
  update: [],
  patch: [],
  remove: []
};
