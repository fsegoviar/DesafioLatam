export enum IdentityUser {
  RUT = 'RUT',
  CI = 'CI',
  PASAPORTE = 'Pasaporte'
}

export enum LevelEnglish {
  BASICO = 'Básico',
  INTERMEDIO = 'Intermedio',
  AVANZADO = 'Avanzado'
}

export enum LevelEducation {
  SCHOOL_COMPLETED = 'Escolar Completa',
  TECNICAL = 'Técnico Completa',
  POSTGRADE = 'Postgrado Completa',
  HIGHSCHOOL = 'Universitaria Completa'
}

export enum LaborSituation {
  STUDENT = 'Estudiante',
  UNEMPLOYED = 'Desempleado',
  INDEPENDENT = 'Independiente',
  FULL_TIME_CONTRACT = 'Contrato tiempo completo',
  PARTIAL_TIME_CONTRACT = 'Contrato medio tiempo',
  PENSIONER = 'Pensionado'
}

export interface IdentitUserType {
  id: number;
  description: IdentityUser;
}

export interface LevelEnglishUser {
  id: number;
  description: LevelEnglish;
}

export interface LevelEducationUser {
  id: number;
  description: LevelEducation;
}

export interface LaborSituationUser {
  id: number;
  description: LaborSituation;
}
