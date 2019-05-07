
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('projects_test', function(table){
      table.increments('id').primary()
      table.string('project_name')
      table.timestamps(true, true)
    }),

    knex.schema.createTable('palettes_test', function(table) {
      table.increments('id').primary()
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('projects.id')
      table.string('color_one')
      table.string('color_two')
      table.string('color_three')
      table.string('color_four')
      table.string('color_five')
      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects_test'),
    knex.schema.dropTable('palettes_test')
  ])
};
