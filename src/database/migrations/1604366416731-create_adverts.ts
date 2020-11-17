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
            name: "pet_name",
            type: "varchar",
          },
          {
            name: "age",
            type: "integer",
            length: "3",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "species",
            type: "varchar",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "user_id",
            type: "integer",
          },
          {
            name: "created_at",
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

// Nome animal,
// idade(meses),
// cidade,
// espécie,
// descrição,
// fotos,
// id do usuario,
// data criacao
