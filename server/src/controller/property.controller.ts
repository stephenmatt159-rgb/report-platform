// controllers/propertyController.ts

import { Request, Response } from "express";
import { getPagination } from "../helpers/paginate";
import { PropertyDataSource } from "../config/database";
import { Property } from "../entity/Property";
import { ILike, Between } from "typeorm";

export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const { skip, page, perPage } = getPagination(req.query);
    const search = (req.query.search as string)?.trim();
    const propertyTypeFilter = req.query.category as string;

    const minPrice = req.query.minPrice
      ? Number(req.query.minPrice)
      : undefined;
    const maxPrice = req.query.maxPrice
      ? Number(req.query.maxPrice)
      : undefined;

    const propertyRepo = PropertyDataSource.getRepository(Property);

    const where: any = {};

    if (search) {
      where.address = ILike(`%${search}%`);
      // Optional: Add additional search fields with OR logic using QueryBuilder if needed
    }

    if (propertyTypeFilter) {
      where.propertyType = ILike(propertyTypeFilter);
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      where.mostRecentPriceAmount = Between(minPrice, maxPrice);
    } else if (minPrice !== undefined) {
      where.mostRecentPriceAmount = Between(minPrice, Number.MAX_SAFE_INTEGER);
    } else if (maxPrice !== undefined) {
      where.mostRecentPriceAmount = Between(0, maxPrice);
    }

    const [data, total] = await propertyRepo.findAndCount({
      where,
      skip,
      take: perPage,
      order: { propertyType: "ASC", dateUpdated: "DESC" },
    });

    const totalPages = Math.ceil(total / perPage);

    res.status(200).json({
      status: true,
      data: data.map((property) => {
        const blockedDomains = ["xomesearch.", "compass.", "images."];

        const validImage = property.imageURLs?.find(
          (url: string) =>
            !blockedDomains.some((domain) => url.includes(domain))
        );

        return {
          id: property.id,
          propertyType: property.propertyType,
          image: validImage || null,
          price: property?.mostRecentPriceAmount,
          address: property?.address,
          bedrooms: property?.numBedroom,
          bathrooms: property?.numBathroom,
          city: property.city,
          country: property.country,
          postalCode: property.postalCode,
          livingArea: property?.floorSizeValue,
          floorUnit: property?.floorSizeUnit,
        };
      }),
      pagination: {
        total,
        per_page: perPage,
        current_page: page,
        last_page: totalPages,
      },
    });
  } catch (error) {
    console.error("Error fetching paginated properties:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const propertyRepo = PropertyDataSource.getRepository(Property);
    const property = await propertyRepo.findOneBy({ id });

    if (!property) {
      res.status(404).json({ status: false, message: "Property not found" });
      return;
    }

    res.status(200).json({
      status: true,
      data: property,
    });
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
