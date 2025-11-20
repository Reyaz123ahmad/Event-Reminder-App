const express = require('express');
const eventController = require('../controllers/eventController.js');
const {auth} = require('../middleware/auth.js');
const { validateRequest, validateParams, validateQuery } = require('../middleware/validation.js');
const { eventSchema, idSchema, eventQuerySchema } = require('../utils/validators.js');

const router = express.Router();

router.use(auth);

router.post('/', eventController.createEvent);
router.get('/', validateQuery(eventQuerySchema), eventController.getEvents);
router.get('/stats', eventController.getStats);
router.get('/upcoming', eventController.getUpcomingEvents);
router.get('/:id', validateParams(idSchema), eventController.getEvent);
router.put('/:id', validateParams(idSchema), validateRequest(eventSchema), eventController.updateEvent);
router.delete('/:id', validateParams(idSchema), eventController.deleteEvent);

module.exports = router;
