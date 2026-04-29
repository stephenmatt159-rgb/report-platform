import { Request, Response } from 'express';
import { getPagination } from '../helpers/paginate';
import { People } from '../entity/People';
import { AppDataSource } from '../config/database';
import { Like } from 'typeorm';

export const getAllPeople = async (req: Request, res: Response) => {
  try {
    const { skip, page, perPage } = getPagination(req.query);
    const search = (req.query.search as string)?.trim();

    const dataRepo = AppDataSource.getRepository(People);

    let where = {};

    if (search) {
      where = [
        { address: Like(`%${search}%`) },
        { city: Like(`%${search}%`) },
        { jobTitle: Like(`%${search}%`) },
        { businessName: Like(`%${search}%`) },
        { businessName: Like(`%${search}%`) },
        { emails: Like(`%${search}%`) },
      ];
    }

    const [data, total] = await dataRepo.findAndCount({
      where,
      skip,
      take: perPage,
    });

    const totalPages = Math.ceil(total / perPage);

    res.status(200).json({
      status: true,
      data,
      pagination: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching paginated people:', error);
    res.status(500).json({ status: false, message: 'Server Error' });
  }
};

export const getPerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dataRepo = AppDataSource.getRepository(People);

    const data = await dataRepo.findOne({
      where: { id: id },
    });

    if (!data) {
      res.status(404).json({ status: false, message: 'Person not found' });
      return;
    }

    res.status(200).json({
      status: true,
      data,
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
