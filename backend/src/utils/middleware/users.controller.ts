import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../../utils/prisma';
import { AuthRequest } from '../../middleware/auth';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role, page = 1, limit = 20 } = req.query;
    const where: any = {};
    if (role) where.role = role as string;

    const users = await prisma.user.findMany({
      where,
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
      select: { id: true, email: true, role: true, createdAt: true },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, role, profileId } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash, role },
    });
    // Optionally link to profile
    if (profileId) {
      if (role === 'STUDENT') await prisma.student.update({ where: { id: profileId }, data: { userId: user.id } });
      else if (role === 'TEACHER') await prisma.teacher.update({ where: { id: profileId }, data: { userId: user.id } });
      else if (role === 'PARENT') await prisma.parent.update({ where: { id: profileId }, data: { userId: user.id } });
    }
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};
