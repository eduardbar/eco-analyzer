-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Analysis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productTitle" TEXT NOT NULL,
    "ecoScore" REAL NOT NULL,
    "summary" TEXT NOT NULL,
    "carbonFootprint" REAL NOT NULL,
    "waterUsage" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Analysis" ("carbonFootprint", "createdAt", "ecoScore", "id", "productTitle", "summary", "updatedAt", "userId", "waterUsage") SELECT "carbonFootprint", "createdAt", "ecoScore", "id", "productTitle", "summary", "updatedAt", "userId", "waterUsage" FROM "Analysis";
DROP TABLE "Analysis";
ALTER TABLE "new_Analysis" RENAME TO "Analysis";
CREATE TABLE "new_MaterialAnalysis" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "materialName" TEXT NOT NULL,
    "sustainabilityScore" REAL NOT NULL,
    "notes" TEXT NOT NULL,
    "analysisId" INTEGER NOT NULL,
    CONSTRAINT "MaterialAnalysis_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MaterialAnalysis" ("analysisId", "id", "materialName", "notes", "sustainabilityScore") SELECT "analysisId", "id", "materialName", "notes", "sustainabilityScore" FROM "MaterialAnalysis";
DROP TABLE "MaterialAnalysis";
ALTER TABLE "new_MaterialAnalysis" RENAME TO "MaterialAnalysis";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
