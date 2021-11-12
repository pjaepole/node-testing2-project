const character = [
  { name: 'tanjiro' },
  { name: 'nezuko' },
  { name: 'zenitsu' },
  { name: 'inousuke' },
]


exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('demon')
    .truncate()
    .then(function() {
      return knex('demon').insert(character);
    });
};
