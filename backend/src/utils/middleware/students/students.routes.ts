import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { createStudentSchema } from './students.schema';
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from './students.controller';

const router = Router();

router.use(authenticate);
router.get('/', authorize('ADMIN', 'SUPERADMIN', 'TEACHER'), getStudents);
router.get('/:id', authorize('ADMIN', 'SUPERADMIN', 'TEACHER', 'STUDENT', 'PARENT'), getStudentById);
router.post('/', authorize('ADMIN', 'SUPERADMIN'), validate(createStudentSchema), createStudent);
router.put('/:id', authorize('ADMIN', 'SUPERADMIN'), updateStudent);
router.delete('/:id', authorize('ADMIN', 'SUPERADMIN'), deleteStudent);

export default router;
