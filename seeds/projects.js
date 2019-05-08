const projects = require('../projects')

const createProjects = (knex, project) => {
  return knex('projects')
    .insert(
      {
        project_name: project.project_name
      },
      'id'
    )
    .then(project_id => {
      let palettesPromises = []
      project.palettes.forEach(palette => {
        palettesPromises.push(
          createPalette(knex, {
            project_id: project_id[0],
            color_one: palette.color_one,
            color_two: palette.color_two,
            color_three: palette.color_three,
            color_four: palette.color_four,
            color_five: palette.color_five
          })
        )
      })
      return Promise.all(palettesPromises)
    })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}

exports.seed = (knex, Promise) => {
  return knex('palettes')
    .del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectsPromises = []
      projects.forEach(project => {
        projectsPromises.push(createProjects(knex, project))
      })
      return Promise.all(projectsPromises) 
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
}