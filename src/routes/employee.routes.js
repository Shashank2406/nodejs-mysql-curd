const express = require('express')
const router = express.Router()
const employeeController = require('../controllers/employee.controller');
// // Retrieve all employees
// router.get('/', employeeController.findAll);
// // Create a new employee
// router.post('/', employeeController.create);
// // Retrieve a single employee with id
// router.get('/:id', employeeController.findById);
// // Update a employee with id
// router.put('/:id', employeeController.update);
// // Delete a employee with id
// router.delete('/:id', employeeController.delete);

router.route('/users')
  .post(employeeController.create)
  .get(employeeController.findAll);

router.route('/users/update/:id')
  .put(employeeController.updateUsers)
  .delete(employeeController.deleteUsers)
  .get(employeeController.idsearch);

router.route('/users/search/:reg')
  .get(employeeController.regexsearch);

router.route('/authenticate')
  .post(employeeController.authenticateUser)


router.route('/notes/:id')
  .put(employeeController.putNotes)
  .get(employeeController.getNotes)

router.route('/notes/:id/:noteId')
  .delete(employeeController.deleteNote)





module.exports = router