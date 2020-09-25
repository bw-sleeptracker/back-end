exports.up = function (knex) {
  return knex.schema

    .createTable("users", tbl => {
      tbl.uuid('id').notNullable().unique().primary();
      tbl.string("username", 256).notNullable().unique().index();
      tbl.string('email', 256).notNullable();
      tbl.string("password", 256).notNullable();
      tbl.boolean('admin').defaultTo(false);
      tbl.double("recommended_hours").defaultTo(8);
    })

    .createTable("month_log", tbl => {
      tbl.uuid("id").notNullable().unique().primary();
      tbl.text('month_of_year').notNullable();
      tbl.double('average_hours_slept');
      tbl.double("average_quality");
      tbl.uuid("users_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable("week_log", tbl => {
      tbl.uuid("id").notNullable().unique().primary();
      tbl.string('week_of_year').notNullable();
      tbl.double('average_hours_slept');
      tbl.double("average_quality")
      tbl.uuid("users_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable("day_log", tbl => {
      tbl.uuid('id').notNullable().unique().primary();
      tbl.date("date").notNullable();
      tbl.time("bedtime").notNullable();
      tbl.time("wake_time");
      tbl.double("total_hours_slept");
      tbl.double("average_quality").notNullable();
      tbl.boolean('completed').defaultTo(false);
      tbl.uuid("users_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })

    .createTable("quality_log", tbl => {
      tbl.uuid("id").notNullable().unique().primary();
      tbl.integer("wake_score").notNullable();
      tbl.integer("day_score").notNullable();
      tbl.integer("bedtime_score").notNullable();
      tbl.uuid("day_log_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("day_log")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users, week_log,' +
    ' month_log, day_log, quality_log');
};
