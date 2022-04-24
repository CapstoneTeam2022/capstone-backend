-- CreateTable
CREATE TABLE "LabResult" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "filledDate" TIMESTAMP(3) NOT NULL,
    "result" TEXT NOT NULL,
    "isAbnormal" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "invReqId" INTEGER NOT NULL,
    "filledById" INTEGER NOT NULL,

    CONSTRAINT "LabResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_filledById_fkey" FOREIGN KEY ("filledById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabResult" ADD CONSTRAINT "LabResult_invReqId_fkey" FOREIGN KEY ("invReqId") REFERENCES "InvestigationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
