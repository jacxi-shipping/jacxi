-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "arrivalPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "containerPhotos" TEXT[] DEFAULT ARRAY[]::TEXT[];
