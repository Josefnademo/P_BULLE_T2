import Teacher from '#models/teacher'
import type { HttpContext } from '@adonisjs/core/http'
import { dd } from '@adonisjs/core/services/dumper'

export default class TeachersController {
  /**
   * Afficher la liste des enseignants
   */
  async index({ view }: HttpContext) {
    //
    // Récupérer la liste des enseignants triés par ordre alphabétique sur le nom

    const teachers = await Teacher.query().orderBy('lastname', 'asc').orderBy('firstname', 'asc')
    // Appel de la vue
    return view.render('pages/errors/home', { teachers })
  }

  /**
   * Afficher le formulaire pour créer un nouvel enseignant
   */
  async create({ view }: HttpContext) {
    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')
    // Appel de la vue
    return view.render('pages/teachers/create', { title: "Ajout d'unenseignant", sections })
  }

  /**
   * Gérer la soumission du formulaire pour la création d'un enseignant
   */
  async store({ request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)
    // Création du nouvel enseignant
    await Teacher.create({ gender, firstname, lastname, nickname, origine, sectionId })
    // Afficher un message à l'utilisateur
    session.flash('success', 'Le nouvel enseignant a été ajouté avecsuccès !')
    // Rediriger vers la homepage
    return response.redirect().toRoute('home')
  }

  async show({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut afficher les détails
    // On veut également pouvoir afficher la section de l'enseignant
    const teacher = await Teacher.query().where('id', params.id).preload('section').firstOrFail()
    // Afficher la vue
    return view.render('pages/show.edge', { title: "Détail d'un enseignant", teacher })
  }

  /**
   * editer
   */
  /**
   * Afficher le formulaire permettant la mise à jour d'un enseignant
   */
  async edit({ params, view }: HttpContext) {
    // Sélectionner l'enseignant dont on veut mettre à jour desinformations
    const teacher = await Teacher.findOrFail(params.id)
    // Récupération des sections triées par le nom
    const sections = await Section.query().orderBy('name', 'asc')
    // Afficher la vue
    return view.render('pages/teachers/edit.edge', {
      title: 'Modifier un enseignant',
      teacher,
      sections,
    })
  }

  /**
   * Gérer la soumission du formulaire pour la mise à jour d'un enseignant
   */
  async update({ params, request, session, response }: HttpContext) {
    // Validation des données saisies par l'utilisateur
    const { gender, firstname, lastname, nickname, origine, sectionId } =
      await request.validateUsing(teacherValidator)
    // Sélectionner l'enseignant dont on veut mettre à jour des informations
    const teacher = await Teacher.findOrFail(params.id)
    // Si un enseignant correspond à l'id
    if (teacher) {
      // Met à jour les infos de l'enseignant
      await teacher.merge({ gender, firstname, lastname, nickname, origine, sectionId }).save()
    }
    // Afficher un message à l'utilisateur
    session.flash('success', "L'enseignant a été mis à jour avec succès!")
    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
  /**
   * Delete record
   */
  async destroy({ params, session, response }: HttpContext) {
    // Sélectionne l'enseignant à supprimer
    const teacher = await Teacher.findOrFail(params.id)
    // Supprime l'enseignant
    await teacher.delete()
    // Afficher un message à l'utilisateur
    session.flash('success', "L'enseignant a été supprimé avec succès !")
    // Redirige l'utilisateur sur la home
    return response.redirect().toRoute('home')
  }
}
