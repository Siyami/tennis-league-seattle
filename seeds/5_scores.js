
exports.seed = function(knex) {
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert([
        {
          id: 1,
          player_id: 1,
          opponent: 'Andre Aggasi',
          result: 'Won',
          first_set1: '6',
          first_set2: '4',
          second_set1: '5',
          second_set2: '7',
          tie_break1: '10',
          tie_break2: '8',
          score_date: '2017-03-20',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 2,
          player_id: 3,
          opponent: 'Rafa Nadal',
          result: 'Won',
          first_set1: '6',
          first_set2: '1',
          second_set1: '6',
          second_set2: '2',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-22',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          player_id: 2,
          opponent: 'Siyami Avci',
          result: 'Won',
          first_set1: '6',
          first_set2: '4',
          second_set1: '7',
          second_set2: '5',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-24',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ]);
    });
};
