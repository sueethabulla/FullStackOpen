/* eslint-disable @typescript-eslint/no-explicit-any */
import { SafePatient, Gender } from '../types'

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String
}

export const toNewPatient = (body: Omit<SafePatient, 'id'>): Omit<SafePatient, 'id'> => {
  const { name, dateOfBirth, gender, occupation } = body

  if (!name || !isString(name)) {
    throw new Error('Missing field: name')
  }

  if (!dateOfBirth || !isString(dateOfBirth)) {
    throw new Error('Missing field: dateOfBirth')
  }

  if (!gender || !isString(gender) || !Object.values(Gender).includes(gender)) {
    throw new Error('Missing field: gender')
  }

  if (!occupation || !isString(occupation)) {
    throw new Error('Missing field: occupation')
  }

  const newPatient: Omit<SafePatient, 'id'> = {
    name,
    dateOfBirth,
    gender,
    occupation,
  }
  return newPatient
}
