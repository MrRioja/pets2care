import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDonations1623811927542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "donations",
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
            name: "userId",
            type: "integer",
          },
          {
            name: "ownerId",
            type: "integer",
          },
          {
            name: "advertId",
            type: "integer",
          },
          {
            name: "accepted",
            type: "boolean",
            default: false,
            isNullable: true,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "advert",
            columnNames: ["advertId"],
            referencedTableName: "adverts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "user",
            columnNames: ["userId"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "owner",
            columnNames: ["ownerId"],
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
    await queryRunner.dropTable("donations");
  }
}
