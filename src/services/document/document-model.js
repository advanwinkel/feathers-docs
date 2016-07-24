'use strict';

// document-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const document = sequelize.define('documents', {
    title: {
      type: Sequelize.STRING,
      allowNull: false        
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true
    },
    text: {
      type: Sequelize.STRING,
      allowNull: true
    },
    sentBy: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    fileName: {
      type: Sequelize.STRING,
      allowNull: false 
    }  
  }, {
    freezeTableName: true
  });

  document.sync();

  return document;
};
