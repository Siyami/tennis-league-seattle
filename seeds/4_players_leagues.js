
exports.seed = function(knex) {
  return knex('players_leagues').del()
    .then(function () {
      return knex('players_leagues').insert([
        // {
        //   id: 1,
        //   player_id: 1,
        //   league_id: 1,
        //   created_at: new Date('2017-01-29 14:26:16 UTC'),
        //   updated_at: new Date('2017-01-29 14:26:16 UTC')
        // },
        {
          id: 2,
          player_id: 2,
          league_id: 1,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          player_id: 3,
          league_id: 1,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 4,
          player_id: 1,
          league_id: 2,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 5,
          player_id: 2,
          league_id: 3,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ]);
    });
};
