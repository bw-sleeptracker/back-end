exports.up = function (knex) {
    return knex.schema
  
      .createTable("users", tbl => {
        tbl.uuid('id').notNullable().unique().primary();
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
        tbl.boolean('admin').defaultTo(false);

      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("users");
  };
