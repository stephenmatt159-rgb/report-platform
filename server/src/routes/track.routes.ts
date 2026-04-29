import { Router } from 'express';
import {
  getAllVisitors,
  getVisitorAnalytics,
  trackVisitor,
} from '../controller/track.controller';

const router = Router();

router.post('/', trackVisitor);
router.get('/visitors', getAllVisitors);
router.get('/analytics', getVisitorAnalytics);

export default router;
