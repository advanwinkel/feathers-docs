'use strict';

const service = require('feathers-sequelize');
const document = require('./document-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: document(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/documents', service(options));

  // Get our initialize service to that we can bind hooks
  const documentService = app.service('/documents');

  // Set up our before hooks
  documentService.before(hooks.before);

  // Set up our after hooks
  documentService.after(hooks.after);
};
