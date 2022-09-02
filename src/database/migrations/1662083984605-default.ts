import { MigrationInterface, QueryRunner } from "typeorm";

export class default1662083984605 implements MigrationInterface {
    name = 'default1662083984605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_bfc00203f5eb4caa1c0ea94b002"`);
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_0597fe5ab2363ed386be0371720"`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_0597fe5ab2363ed386be0371720" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_bfc00203f5eb4caa1c0ea94b002" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_bfc00203f5eb4caa1c0ea94b002"`);
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_0597fe5ab2363ed386be0371720"`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_0597fe5ab2363ed386be0371720" FOREIGN KEY ("user_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_bfc00203f5eb4caa1c0ea94b002" FOREIGN KEY ("post_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
