
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {
          id: 1,
          first_name: 'Siyami',
          last_name: 'Avci',
          email: 'siyami@gmail.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: '3.5',
          home_court: 'Redmond - GrassLawn',
          pic_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/220px-Tennis_Racket_and_Balls.jpg',
          admin: true,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 2,
          first_name: 'Rafa',
          last_name: 'Nadal',
          email: 'rafa@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Roland Garros',
          pic_url: 'http://e1.365dm.com/15/04/16-9/20/rafael-nadal-monte-carlo-masters_3290861.jpg?20150415123640',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          first_name: 'Andre',
          last_name: 'Aggasi',
          email: 'andre@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Las Vegas',
          pic_url: 'http://www.optimumtennis.net/wp-content/uploads/2015/03/andre-agassi-backhand.jpg',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ]);
    });
};
