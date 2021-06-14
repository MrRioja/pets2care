import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFavorites1623616521949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "favorites",
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
            name: "advertId",
            type: "integer",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "favoriteAdvert",
            columnNames: ["advertId"],
            referencedTableName: "adverts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "favoriteUser",
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
    await queryRunner.dropTable("favorites");
  }
}
