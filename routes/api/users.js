const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  // updateUserInfo
} = require('../../controllers/userController') 

router.route('/')
  .get(getAllUsers)
  .post(createUser)
// router.route('/updateUserInfo')
//   .put(updateUserInfo)
router.route('/:id')
  .put(updateUser)
  .delete(deleteUser)
  .get(getUser)
module.exports = router