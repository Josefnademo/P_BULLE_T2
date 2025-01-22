/*
|--------------------------------------------------------------------------
| Le fichier des routes
|--------------------------------------------------------------------------
|
| Le fichier des routes a pour but de définir toutes les routes HTTP.
|
*/
import TeachersController from '#controllers/teachers_controller'
import router from '@adonisjs/core/services/router'
router.get('/', [TeachersController, 'index']).as('home')
// Route permettant de voir les détails d'un enseignant
router.get('/teacher/:id/show', [TeachersController, 'show']).as('teacher.show')
// Route permettant d'afficher le formulaire permettant la mise à jourd'un enseignant
router.get('/teacher/:id/edit', [TeachersController, 'edit']).as('teacher.edit')
// Route permettant la modification de l'enseignant
router.post('/teacher/:id/update', [TeachersController, 'update']).as('teacher.update')
