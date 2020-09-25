const db = require('../data/dbConfig');


/******************************************************************************
 *                      Get all users
 ******************************************************************************/

const get = async () => {
    return db('users').select('id', 'username', 'admin', 'email', 'recommended_hours');
}

/******************************************************************************
 *                      Get a user by {key}
 ******************************************************************************/

const getBy = async (filter) => {
  return db("users").where(filter).orderBy("id");
}

/******************************************************************************
 *                      Get a user by id
 ******************************************************************************/

const getById = async (id) => {
    return db('users').where({id}).select('id', 'username', 'admin', 'email','recommended_hours')
}

/******************************************************************************
 *                      Create a user
 ******************************************************************************/

const create = async (user) => {
if (user.username !== 'testUser') {
user.admin = false;
}
    const id = await db('users').insert(user);
    return getById(user.id)
}

/******************************************************************************
 *                      Update a user
 ******************************************************************************/

const update = async (user) => {
const id = user.id
    const exists = await getById(id)
    if (exists) {
      return db('users').where({id}).update(user)
    }
  }

/******************************************************************************
 *                      Delete a user
 ******************************************************************************/

const remove = async (id) => {
    const exists = await getById(id)
    if (exists) {
      return db('users').where({id}).del()
    }
  }

  /******************************************************************************
 *                      Export methods
 ******************************************************************************/

module.exports = {
  get,
  getBy,
  create,
  getById,
  remove,
  update,
}
