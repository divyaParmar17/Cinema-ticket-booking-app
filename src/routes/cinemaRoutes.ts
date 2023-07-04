import express from 'express';
import {
  createCinema,
  purchaseSeat,
  purchaseConsecutiveSeats,
} from '../controllers/cinemaController';

const router = express.Router();

// Create a cinema
router.post('/cinemas', createCinema);

// Purchase a specific seat in a cinema
router.post('/cinemas/:cinemaId/seats/:seatNumber', purchaseSeat);

// Purchase the first two free consecutive seats in a cinema
router.post('/cinemas/:cinemaId/seats', purchaseConsecutiveSeats);

export default router;
