-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_usersId_fkey`;

-- AlterTable
ALTER TABLE `projects` MODIFY `usersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_usersId_fkey` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
