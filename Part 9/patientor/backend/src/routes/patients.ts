import express from 'express'
import patientsService from '../services/patients'
import { SafePatient } from '../types'
import { toNewPatient } from '../utils/patients'

const router = express.Router()

router.get('/', (_req, res) => {
  res.json(patientsService.getEntries()).end()
})

router.post('/', (req, res) => {
  const newPatient: Omit<SafePatient, 'id'> = toNewPatient(req.body as Omit<SafePatient, 'id'>)
  const savedPatient = patientsService.addEntry(newPatient)

  if (savedPatient) {
    res.json(savedPatient)
  } else {
    res.status(500).json({ error: 'Server error' })
  }
})

export default router
