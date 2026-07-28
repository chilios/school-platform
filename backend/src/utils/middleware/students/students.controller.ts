import { Request, Response, NextFunction } from 'express';
import prisma from '../../utils/prisma';

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classId, section, page = 1, limit = 20 } = req.query;
    const where: any = { active: true };
    if (classId && section) where.classSection = { classId: classId as string, sectionName: section as string };

    const students = await prisma.student.findMany({
      where,
      include: { classSection: { include: { class: true } } },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.findUnique({
      where: { id },
      include: { classSection: true, parent: true, user: { select: { email: true } } },
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const admissionNumber = req.body.admissionNumber || `ADM-${Date.now().toString(36).toUpperCase()}`;
    const student = await prisma.student.create({
      data: {
        ...req.body,
        admissionNumber,
        dateOfBirth: new Date(req.body.dateOfBirth),
      },
    });
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const student = await prisma.student.update({ where: { id }, data: req.body });
    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.student.update({ where: { id }, data: { active: false } });
    res.json({ message: 'Student deactivated' });
  } catch (error) {
    next(error);
  }
};
