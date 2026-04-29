import { Router } from 'express';

import { getAllPeople, getPerson } from '../controller/people.controller';

const router = Router();

router.get('/', getAllPeople);
router.get('/:id', getPerson);

export default router;
