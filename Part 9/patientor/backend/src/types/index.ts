export interface Diagnosis {
  code: string
  name: string
  lating?: string
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export interface Entry {}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn?: string
  gender: Gender
  occupation: string
  entries: Entry[]
}

export type SafePatient = Omit<Patient, 'ssn'>
