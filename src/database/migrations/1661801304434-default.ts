import { MigrationInterface, QueryRunner } from "typeorm";

export class default1661801304434 implements MigrationInterface {
    name = 'default1661801304434'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "updatedAt" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "createdAt" character varying NOT NULL`);
    }

}
