
exports.seed = function(knex) {
  return knex('leagues').del()
    .then(function () {
      return knex('leagues').insert([
        {
          id: 1,
          league_name: 'Spring-2017',
          starts_at: '3/20/2017',
          ends_at: '6/4/2017',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 2,
          league_name: 'Summer-2017',
          starts_at: '6/5/2017',
          ends_at: '8/20/2017',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          league_name: 'Fall-2017',
          starts_at: '8/21/2017',
          ends_at: '10/22/2017',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ]);
    });
};
