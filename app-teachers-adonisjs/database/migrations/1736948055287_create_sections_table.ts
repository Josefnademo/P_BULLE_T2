import { BaseSchema } from '@adonisjs/lucid/schema'
export default class extends BaseSchema {
  protected tableName = 't_section'
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }
  async down() {
    this.schema.dropTable(this.tableName)
  }
}
//La migration pour les sections