import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'
export default class TeachersController {
  /**
   * Afficher la liste des enseignants
   */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom et le prénom
    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')
    dd(teachers)
    // Appel de la vue
    return view.render('pages/home', { teachers })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}
  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}
  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}
  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}
  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
