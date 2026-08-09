-- CreateEnum
CREATE TYPE "EstadoContenido" AS ENUM ('PENDIENTE', 'EN_PROCESO', 'LISTO');

-- CreateEnum
CREATE TYPE "TipoMaterial" AS ENUM ('PROGRAMA', 'BIBLIOGRAFIA');

-- CreateEnum
CREATE TYPE "TipoRecurso" AS ENUM ('PLANEACION', 'PRESENTACION', 'GUIA_LECTURA', 'EXAMEN', 'PREGUNTAS_DIDACTICAS');

-- CreateTable
CREATE TABLE "Curso" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "carpeta" TEXT NOT NULL,
    "estado" "EstadoContenido" NOT NULL DEFAULT 'PENDIENTE',
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unidad" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "objetivo" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Unidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sesion" (
    "id" TEXT NOT NULL,
    "unidadId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "fecha" TIMESTAMP(3),
    "objetivo" TEXT,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referencia" (
    "id" TEXT NOT NULL,
    "unidadId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "archivo" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Referencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Material" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "tipo" "TipoMaterial" NOT NULL,
    "nombre" TEXT NOT NULL,
    "rutaAbsoluta" TEXT NOT NULL,
    "tamanioBytes" INTEGER,
    "detectadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecursoGenerado" (
    "id" TEXT NOT NULL,
    "tipo" "TipoRecurso" NOT NULL,
    "cursoId" TEXT NOT NULL,
    "unidadId" TEXT,
    "sesionId" TEXT,
    "titulo" TEXT NOT NULL,
    "nombreArchivo" TEXT NOT NULL,
    "contenido" BYTEA NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecursoGenerado_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Curso_slug_key" ON "Curso"("slug");

-- AddForeignKey
ALTER TABLE "Unidad" ADD CONSTRAINT "Unidad_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sesion" ADD CONSTRAINT "Sesion_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referencia" ADD CONSTRAINT "Referencia_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecursoGenerado" ADD CONSTRAINT "RecursoGenerado_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "Curso"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecursoGenerado" ADD CONSTRAINT "RecursoGenerado_unidadId_fkey" FOREIGN KEY ("unidadId") REFERENCES "Unidad"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecursoGenerado" ADD CONSTRAINT "RecursoGenerado_sesionId_fkey" FOREIGN KEY ("sesionId") REFERENCES "Sesion"("id") ON DELETE SET NULL ON UPDATE CASCADE;
