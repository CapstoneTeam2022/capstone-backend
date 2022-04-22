-- CreateTable
CREATE TABLE "InvestigationRequest" (
    "id" SERIAL NOT NULL,
    "note" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,
    "requestorId" INTEGER NOT NULL,
    "vitalsId" INTEGER NOT NULL,

    CONSTRAINT "InvestigationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationRequest_vitalsId_key" ON "InvestigationRequest"("vitalsId");

-- AddForeignKey
ALTER TABLE "InvestigationRequest" ADD CONSTRAINT "InvestigationRequest_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationRequest" ADD CONSTRAINT "InvestigationRequest_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationRequest" ADD CONSTRAINT "InvestigationRequest_vitalsId_fkey" FOREIGN KEY ("vitalsId") REFERENCES "Vitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
