-- CreateTable
CREATE TABLE "HealthCenter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,

    CONSTRAINT "HealthCenter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HealthCenter_email_key" ON "HealthCenter"("email");

-- AddForeignKey
ALTER TABLE "HealthCenter" ADD CONSTRAINT "HealthCenter_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
