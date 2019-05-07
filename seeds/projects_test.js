const mockProjects = require('../mockProjectsData');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects_test').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects_test').insert(mockProjects);
    });
};
