-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "countryCode" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "verifiedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "OtpAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "countryCode" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Contact_mobile_idx" ON "Contact"("mobile");

-- CreateIndex
CREATE INDEX "Contact_verifiedAt_idx" ON "Contact"("verifiedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_countryCode_mobile_key" ON "Contact"("countryCode", "mobile");

-- CreateIndex
CREATE INDEX "OtpAttempt_countryCode_mobile_idx" ON "OtpAttempt"("countryCode", "mobile");

-- CreateIndex
CREATE INDEX "OtpAttempt_expiresAt_idx" ON "OtpAttempt"("expiresAt");
