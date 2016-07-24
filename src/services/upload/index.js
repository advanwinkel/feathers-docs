'use strict';

const hooks = require('./hooks');

// feathers-blob service
const blobService = require('feathers-blob');
// Here we initialize a FileSystem storage,
// but you can use feathers-blob with any other
// storage service like AWS or Google Drive.
const fs = require('fs-blob-store');
const blobStorage = fs(__dirname + '/../../../uploads');

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/uploads', blobService({Model: blobStorage}));

  // Get our initialize service to that we can bind hooks
  const uploadService = app.service('/uploads');

  // Set up our before hooks
  uploadService.before(hooks.before);

  // Set up our after hooks
  uploadService.after(hooks.after);
};

module.exports.Service = blobService;
