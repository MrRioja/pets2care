import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createAdverts1604366416731 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "adverts",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "birthDate",
            type: "date",
          },
          {
            name: "gender",
            type: "varchar",
          },
          {
            name: "type",
            type: "varchar",
          },
          {
            name: "breed",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "vaccinated",
            type: "boolean",
          },
          {
            name: "dewormed",
            type: "boolean",
          },
          {
            name: "castrated",
            type: "boolean",
          },
          {
            name: "deficit",
            type: "boolean",
          },
          {
            name: "userId",
            type: "integer",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adverts");
  }
}
