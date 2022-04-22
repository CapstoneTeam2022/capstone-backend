-- CreateTable
CREATE TABLE "Vitals" (
    "id" SERIAL NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "pulse" DOUBLE PRECISION NOT NULL,
    "respiratoryRate" DOUBLE PRECISION NOT NULL,
    "bloodPressure" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "spo2Level" DOUBLE PRECISION NOT NULL,
    "heartRate" DOUBLE PRECISION NOT NULL,
    "requestedDate" TIMESTAMP(3) NOT NULL,
    "filledDate" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "requestedById" INTEGER NOT NULL,
    "filledById" INTEGER NOT NULL,

    CONSTRAINT "Vitals_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_filledById_fkey" FOREIGN KEY ("filledById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vitals" ADD CONSTRAINT "Vitals_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
