import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { getUsers, createUser, deleteUser } from './users.controller';
import { validate } from '../../middleware/validate';
import { createUserSchema } from './users.schema';

const router = Router();

router.use(authenticate, authorize('ADMIN', 'SUPERADMIN'));
router.get('/', getUsers);
router.post('/', validate(createUserSchema), createUser);
router.delete('/:id', deleteUser);

export default router;
