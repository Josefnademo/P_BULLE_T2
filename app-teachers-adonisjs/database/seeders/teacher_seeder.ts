import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Teacher from '#models/teacher'
export default class extends BaseSeeder {
  async run() {
    // Création d'enseignants
    await Teacher.createMany([
      {
        gender: 'M',
        firstname: 'Grégory',
        lastname: 'Charmier',
        nickname: 'GregLeBarbar',
        origine: "Plateforme de jeux d'échecs",
        sectionId: 1,
      },
      {
        gender: 'M',
        firstname: 'Xavier',
        lastname: 'Carrel',
        nickname: 'XCL',
        origine: 'Sigle ETML',
        sectionId: 1,
      },
      {
        gender: 'W',
        firstname: 'Aurélie',
        lastname: 'Curchod',
        nickname: 'ACD',
        origine: 'Sigle ETML',
        sectionId: 1,
      },
    ])
  }
}
