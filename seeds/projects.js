const projects = require('../projects')

exports.seed = function(knex, Promise) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert(
        projects
      );
    });
};
