exports.seed = function(knex) {
  return knex('scores').del()
    .then(function () {
      return knex('scores').insert([
        {
          id: 1,
          player_id: 2,
          league_id: 1,
          opponent: 'Dominic Thiem',
          result: 'Won',
          first_set1: '6',
          first_set2: '1',
          second_set1: '4',
          second_set2: '6',
          tie_break1: '7',
          tie_break2: '3',
          score_date: '2017-03-20',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 2,
          player_id: 2,
          league_id: 1,
          opponent: 'Grigor Dimitrov',
          result: 'Won',
          first_set1: '6',
          first_set2: '4',
          second_set1: '6',
          second_set2: '4',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-22',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          player_id: 2,
          league_id: 1,
          opponent: 'Kei Nishikori',
          result: 'Won',
          first_set1: '6',
          first_set2: '1',
          second_set1: '6',
          second_set2: '2',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-21',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 4,
          player_id: 3,
          league_id: 1,
          opponent: 'Stan Wawrinka',
          result: 'Won',
          first_set1: '5',
          first_set2: '7',
          second_set1: '6',
          second_set2: '1',
          tie_break1: '7',
          tie_break2: '2',
          score_date: '2017-03-22',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 5,
          player_id: 3,
          league_id: 1,
          opponent: 'Milos Raonic',
          result: 'Won',
          first_set1: '6',
          first_set2: '3',
          second_set1: '6',
          second_set2: '3',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-24',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 6,
          player_id: 6,
          league_id: 1,
          opponent: 'Marin Cilic',
          result: 'Won',
          first_set1: '6',
          first_set2: '4',
          second_set1: '6',
          second_set2: '3',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-25',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 7,
          player_id: 2,
          league_id: 1,
          opponent: 'Dominic Thiem',
          result: 'Lost',
          first_set1: '4',
          first_set2: '6',
          second_set1: '2',
          second_set2: '6',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-27',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 8,
          player_id: 3,
          league_id: 1,
          opponent: 'Nick Kyrgios',
          result: 'Lost',
          first_set1: '2',
          first_set2: '6',
          second_set1: '5',
          second_set2: '7',
          tie_break1: '',
          tie_break2: '',
          score_date: '2017-03-28',
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores));"
      );
    });
};
