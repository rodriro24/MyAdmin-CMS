/*
  Warnings:

  - Added the required column `content` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Project" ("id", "userId") SELECT "id", "userId" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
PRAGMA foreign_key_check("Project");
PRAGMA foreign_keys=ON;
