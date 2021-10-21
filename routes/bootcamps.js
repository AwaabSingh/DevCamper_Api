const express = require('express');
const { getBootcamps,getBootcamp, createBootcamp, updateBootcamp, deleteBootcamp, getBootcampInRadius, bootcampPhotoUpload } = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp')
const advancedResults = require('../middleware/advancedResult')

// Include other resource router 
// getting a course for a certain bootcamp by id
const courseRouter = require('./courses')
const reviewRouter = require('./reviews')

const router = express.Router();   

const { protect, authorize  } = require('../middleware/auth')

router.route('/radius/:zipcode/:distance').get(getBootcampInRadius)

// Re-route into other resourse router 
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)

router
.route('/')
.get(advancedResults(Bootcamp, "courses"), getBootcamps)
.post(protect, authorize('publisher', 'admin'), createBootcamp)

router
.route('/:id')
.put(protect, authorize('publisher', 'admin'), updateBootcamp)
.get(getBootcamp)
.delete(protect, authorize('publisher', 'admin'),  deleteBootcamp)

router.route( '/:id/photo').put(protect, authorize('publisher', 'admin') ,bootcampPhotoUpload)


module.exports = router;