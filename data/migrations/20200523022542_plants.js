exports.up = function (knex) {
    return knex.schema
        .createTable('users', (users) => {
            users.increments();

            users.string('username', 255).notNullable().unique();

            users.string('email', 255).notNullable().unique();

            users.string('password', 255).notNullable();
        })
        .createTable('plants', (plants) => {
            plants.increments();
            plants
                .integer('user_id')
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            plants.string('nickname').notNullable().unique();
            plants.string('species').notNullable();
            plants.integer('h2o_frequency').notNullable();
            plants.string('image_url');
            plants.date('isWatered')
        });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('plants').dropTableIfExists('users');
};
