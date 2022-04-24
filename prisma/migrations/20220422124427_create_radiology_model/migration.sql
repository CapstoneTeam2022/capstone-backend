-- CreateTable
CREATE TABLE "Radiology" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "focalArea" TEXT NOT NULL,
    "filledDate" TIMESTAMP(3) NOT NULL,
    "report" TEXT NOT NULL,
    "images" TEXT[],
    "comment" TEXT NOT NULL,
    "invReqId" INTEGER NOT NULL,
    "filledById" INTEGER NOT NULL,

    CONSTRAINT "Radiology_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Radiology" ADD CONSTRAINT "Radiology_filledById_fkey" FOREIGN KEY ("filledById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Radiology" ADD CONSTRAINT "Radiology_invReqId_fkey" FOREIGN KEY ("invReqId") REFERENCES "InvestigationRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
