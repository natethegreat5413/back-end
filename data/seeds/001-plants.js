exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const plants = [
    {
      id: 1,
      user_id: 1,
      nickname: "the one by the window",
      species: "rosebud",
      h2o_frequency: 3,
      image_url: ''
    },
    {
      id: 2,
      user_id: 1,
      nickname: "Steve",
      species: "fern",
      h2o_frequency: 5,
      image_url: ''
    },
    {
      id: 3,
      user_id: 2,
      nickname: "Sgt. Angle",
      species: "Japanese Peace Lilly",
      h2o_frequency: 1,
      image_url: ''
    },
    {
      id: 4,
      user_id: 2,
      nickname: "Taco",
      species: "pirahna plant",
      h2o_frequency: 7,
      image_url: ''
    },
    {
      id: 5,
      user_id: 3,
      nickname: "giant plant",
      species: "not sure",
      h2o_frequency: 1,
      image_url: ''
    },
    
  ];

  return knex("plants").insert(plants);
};

