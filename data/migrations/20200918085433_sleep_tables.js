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

    .createTable("aggregate_month_data", tbl => {
      tbl.uuid("id").notNullable().unique().primary()
      tbl.integer('average_hours_slept');
      tbl.integer("data")
      tbl.timestamp("month")
    })

    .createTable("aggregate_week_data", tbl => {
      tbl.uuid("id").notNullable().unique().primary()
      tbl.integer('average_hours_slept');
      tbl.integer("data")
      tbl.timestamp("week")
      tbl.uuid("aggregate_month_data_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("aggregate_month_data")
    })


    .createTable("sleep_log", tbl => {
      tbl.uuid('id').notNullable().unique().primary();
      tbl.date("date").notNullable();
      tbl.dateTime("bedtime").notNullable();
      tbl.dateTime("wake_time");
      tbl.integer("total_hours_slept");
      tbl.integer("average_quality").notNullable();
      tbl.uuid("users_id")
        .unsigned()
        .notNullable()
        .references('id')
        .inTable("users")
      tbl.uuid("aggregate_week_data_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("aggregate_week_data")
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
  return knex.schema.dropTableIfExists('users, aggregate_week_data,' +
    ' aggregate_month_data, sleep_log, quality_log');
};
