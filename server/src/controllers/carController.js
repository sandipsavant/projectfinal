import Car from '../models/Car.js';
import { validationResult } from 'express-validator';

// @desc    Get all cars
// @route   GET /api/cars
// @access  Public
export const getCars = async (req, res) => {
  try {
    const { 
      category, 
      make, 
      minPrice, 
      maxPrice,
      available,
      featured,
      location,
      minSeats,
      sort,
      limit = 10,
      page = 1
    } = req.query;

    // Build query
    const query = {};
    
    if (category) query.category = category;
    if (make) query.make = make;
    if (minPrice) query.pricePerDay = { $gte: Number(minPrice) };
    if (maxPrice) {
      query.pricePerDay = query.pricePerDay 
        ? { ...query.pricePerDay, $lte: Number(maxPrice) }
        : { $lte: Number(maxPrice) };
    }
    if (available) query.available = available === 'true';
    if (featured) query.featured = featured === 'true';
    if (location) query.location = { $regex: location, $options: 'i' };
    if (minSeats) query.seats = { $gte: Number(minSeats) };

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Sort
    let sortOption = {};
    if (sort) {
      const sortFields = sort.split(',');
      sortFields.forEach(field => {
        if (field.startsWith('-')) {
          sortOption[field.substring(1)] = -1;
        } else {
          sortOption[field] = 1;
        }
      });
    } else {
      sortOption = { createdAt: -1 };  // Default sort
    }

    // Execute query
    const cars = await Car.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    // Get total count
    const totalCars = await Car.countDocuments(query);

    res.status(200).json({
      cars,
      page: pageNum,
      pages: Math.ceil(totalCars / limitNum),
      total: totalCars
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching cars',
      error: error.message,
    });
  }
};

// @desc    Get car by ID
// @route   GET /api/cars/:id
// @access  Public
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching car',
      error: error.message,
    });
  }
};

// @desc    Create a new car
// @route   POST /api/cars
// @access  Private/Admin
export const createCar = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const car = await Car.create(req.body);
    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating car',
      error: error.message,
    });
  }
};

// @desc    Update a car
// @route   PUT /api/cars/:id
// @access  Private/Admin
export const updateCar = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating car',
      error: error.message,
    });
  }
};

// @desc    Delete a car
// @route   DELETE /api/cars/:id
// @access  Private/Admin
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting car',
      error: error.message,
    });
  }
};