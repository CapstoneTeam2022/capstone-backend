-- CreateTable
CREATE TABLE "LabTest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "normalRange" TEXT NOT NULL,
    "measuredIn" TEXT NOT NULL,
    "testCategory" TEXT NOT NULL,
    "invReqId" INTEGER NOT NULL,

    CONSTRAINT "LabTest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LabTest" ADD CONSTRAINT "LabTest_invReqId_fkey" FOREIGN KEY ("invReqId") REFERENCES "InvestigationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
