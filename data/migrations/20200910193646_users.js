exports.up = function (knex) {
  return knex.schema

    .createTable("users", tbl => {
      tbl.uuid('id').notNullable().unique().primary();
      tbl.string("username", 256).notNullable().unique().index();
      tbl.string('email', 256).notNullable().unique();
      tbl.string("password", 256).notNullable();
      tbl.boolean('admin').defaultTo(false);
      tbl.double("recommended_hours")
    })

    .createTable("aggregate_data", tbl => {
      tbl.uuid("id").notNullable().unique().primary()
      tbl.integer('average_hours_slept');

      tbl.integer("data")
      tbl.timestamp("week")
    })

    .createTable("sleep_log", tbl => {
      tbl.uuid('id').notNullable().unique().primary();
      tbl.date("date").notNullable();
      tbl.text("bedtime").notNullable();
      tbl.text("wake_time").notNullable();
      tbl.integer("average_quality").notNullable();
      tbl.uuid("users_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
      tbl.uuid("aggregate_data_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("aggregate_data")

    })

    .createTable("quality_log", tbl => {
      tbl.uuid("id").notNullable().unique().primary();
      tbl.integer("wake_score").notNullable();
      tbl.integer("day_score").notNullable();
      tbl.integer("bedtime_score").notNullable();
      tbl.uuid("sleep_log_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("sleep_log")
    })

};

exports.down = function (knex) {

};
