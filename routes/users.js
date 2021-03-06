const express = require('express');
const { 
   getUsers,
   getUser,
   createUser,
   updateUser,
   deleteUser 
} = require('../controllers/users')

const User = require('../models/User');

const router = express.Router({ mergeParams: true}); //marging the url params 

const advancedResults = require('../middleware/advancedResult');
const { protect, authorize } = require('../middleware/auth')

// anything below this will use "what is inside"
router.use(protect);
router.use(authorize('admin'))

router.route('/').get(advancedResults(User), getUsers).post(createUser)

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

module.exports = router