
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
          email: 'siyami.avci@gmail.com',
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
          first_name: 'Andy',
          last_name: 'Murray',
          email: 'andy@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Wimbledon',
          pic_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/220px-Tennis_Racket_and_Balls.jpg',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 3,
          first_name: 'Novak',
          last_name: 'Djokovic',
          email: 'novak@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Monte Carlo',
          pic_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/220px-Tennis_Racket_and_Balls.jpg',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 4,
          first_name: 'Stan',
          last_name: 'Wawrinka',
          email: 'stan@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Basel',
          pic_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Tennis_Racket_and_Balls.jpg/220px-Tennis_Racket_and_Balls.jpg',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 5,
          first_name: 'Roger',
          last_name: 'Federer',
          email: 'federer@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Basel',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 6,
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
          id: 7,
          first_name: 'Milos',
          last_name: 'Raonic',
          email: 'raonic@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Toronto',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 8,
          first_name: 'Kei',
          last_name: 'Nishikori',
          email: 'kei@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Tokyo',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 9,
          first_name: 'Marin',
          last_name: 'Cilic',
          email: 'cilic@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Zagrep',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 10,
          first_name: 'Dominic',
          last_name: 'Thiem',
          email: 'thiem@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Vienna',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        },
        {
          id: 11,
          first_name: 'Grigor',
          last_name: 'Dimitrov',
          email: 'dimitrov@atp.com',
          hashed_password: '$2a$12$OyrPPu1MZZAowBhHuuBRfeBBsXpCsrTFbWlWPHjgDEUpQamVSa4vC',
          ntrp_rating: 'Open',
          home_court: 'Varna',
          pic_url: 'http://www.atpworldtour.com/-/media/tennis/players/head-shot/vibrant/federer-headshot15.png',
          admin: false,
          created_at: new Date('2017-01-29 14:26:16 UTC'),
          updated_at: new Date('2017-01-29 14:26:16 UTC')
        }
      ])

    })
    .then(() => {
      return knex.raw(
        "SELECT setval('players_id_seq', (SELECT MAX(id) FROM players));"
      );
    });
};
