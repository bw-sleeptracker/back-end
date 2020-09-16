require("dotenv").config();

const pgConnection = process.env.DATABASE_URL || "postgresql://postgres@localhost/auth";
// if using a local postgres server, please create the database manually, Knex will not create it autmatically

module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/db.db3",
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      },
    },
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  testing: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: ':memory:',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

production: {
    client: "pg",
  	useNullAsDefault: true,
  	connection: {
		host: `${process.env.DB_HOST}`,
		user: `${process.env.DB_USER}`,
		password: `${process.env.DB_PASSWORD}`,
		database: `${process.env.DB_NAME}`
  	},
  	migrations: {
  		directory: "./data/migrations",
  	},
  	seeds: {
  		directory: "./data/seeds",
  	}
  }
};
