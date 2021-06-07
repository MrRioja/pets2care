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
            default: false,
          },
          {
            name: "dewormed",
            type: "boolean",
            default: false,
          },
          {
            name: "castrated",
            type: "boolean",
            default: false,
          },
          {
            name: "deficit",
            type: "boolean",
            default: false,
          },
          {
            name: "isActive",
            type: "boolean",
            default: true,
          },
          {
            name: "isSpotlight",
            type: "boolean",
            default: false,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "userId",
            type: "integer",
          },
          {
            name: "cep",
            type: "varchar",
          },
          {
            name: "street",
            type: "varchar",
          },
          {
            name: "number",
            type: "varchar",
          },
          {
            name: "complement",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "neighborhood",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
        ],
        foreignKeys: [
          {
            name: "UserAdvert",
            columnNames: ["userId"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("adverts");
  }
}
