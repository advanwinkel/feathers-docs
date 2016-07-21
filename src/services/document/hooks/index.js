'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [
    auth.queryWithCurrentUser({ idField: 'id', as: 'sentBy' })
  ],
  get: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ],
  create: [
    auth.associateCurrentUser({ idField: 'id', as: 'sentBy' })
  ],
  update: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ],
  patch: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ],
  remove: [
    auth.restrictToOwner({ idField: 'id', ownerField: 'sentBy' })
  ]
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
