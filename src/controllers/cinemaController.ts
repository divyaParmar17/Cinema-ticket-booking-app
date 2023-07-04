import { Request, Response } from 'express';
import Cinema  from '../models/cinemaModel';
import { HttpStatusCodes } from '../utils/constants';
import { ResponseMessages } from '../utils/responseMessage';

export const createCinema = async (req: Request, res: Response) => {
  try {
    const { seats } = req.body;
    const cinema = new Cinema({
      seats,
    });
    const newCinema = await cinema.save();
    res.status(HttpStatusCodes.CREATED).json({
        message: ResponseMessages.SUCCESS,
        cinemaId: newCinema._id,
      });
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message: ResponseMessages.INTERNAL_SERVER_ERROR,
      });
    }  
};

export const purchaseSeat = async (req: Request, res: Response) => {
  try {
    const { cinemaId, seatNumber } = req.params;
    const cinema = await Cinema.findById(cinemaId);

    if (!cinema) {
      return res.status(HttpStatusCodes.NOT_FOUND).json({
        error: ResponseMessages.NOT_FOUND,
      });
    }
    const isSeatBooked = cinema.bookedSeats.includes(parseInt(seatNumber, 10));

    if (isSeatBooked) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({
        error: ResponseMessages.ERROR,
        message: ResponseMessages.SEAT_ALREADY_BOOKED,
      });
    }

    cinema.bookedSeats.push(parseInt(seatNumber, 10));
    await cinema.save();

    res.status(HttpStatusCodes.OK).json({
      message: ResponseMessages.SUCCESS,
      seat: seatNumber,
    });
  } catch (error) {
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      error: ResponseMessages.INTERNAL_SERVER_ERROR,
    });
  }
};

export const purchaseConsecutiveSeats = async (req: Request, res: Response) => {
    try {
      const { cinemaId } = req.params;
      const cinema = await Cinema.findById(cinemaId);  
      if (!cinema) {
        return res.status(HttpStatusCodes.NOT_FOUND).json({
          error: ResponseMessages.NOT_FOUND,
        });
      }
  
      const { seats, bookedSeats } = cinema;
      let consecutiveSeats: number[] = [];
  
      for (let i = 0; i < seats - 1; i++) {
        const isSeatBooked = bookedSeats.includes(i);
        const isNextSeatBooked = bookedSeats.includes(i + 1);
  
        if (!isSeatBooked && !isNextSeatBooked) {
          consecutiveSeats = [i, i + 1];
          break;
        }
      } 
      if (consecutiveSeats.length === 0) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          error: ResponseMessages.ERROR,
          message: ResponseMessages.NO_CONSECUTIVE_SEATS,
        });
      }  
      cinema.bookedSeats.push(...consecutiveSeats);
      await cinema.save();  
      res.status(HttpStatusCodes.OK).json({
        message: ResponseMessages.SUCCESS,
        seats: consecutiveSeats,
      });
    } catch (error) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        error: ResponseMessages.INTERNAL_SERVER_ERROR,
      });
    }
  };
  
  
