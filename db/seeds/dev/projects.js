
exports.seed = function(knex, Promise) {
 
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          title: 'Project 1'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { color1: '#000000', color2: '#ffffff', color3: '#dddddd', color4: '#111111', color5: '#333333', project_id: project[0] },
            { color1: '#efefef', color2: '#dfdfdf', color3: '#eeeeee', color4: '#222222', color5: '#444444', project_id: project[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
};
