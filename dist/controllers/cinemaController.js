"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseConsecutiveSeats = exports.purchaseSeat = exports.createCinema = void 0;
const cinemaModel_1 = __importDefault(require("../models/cinemaModel"));
const constants_1 = require("../utils/constants");
const responseMessage_1 = require("../utils/responseMessage");
const createCinema = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { seats } = req.body;
        const cinema = new cinemaModel_1.default({
            seats,
        });
        const newCinema = yield cinema.save();
        res.status(constants_1.HttpStatusCodes.CREATED).json({
            message: responseMessage_1.ResponseMessages.SUCCESS,
            cinemaId: newCinema._id,
        });
    }
    catch (error) {
        res.status(constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: responseMessage_1.ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }
});
exports.createCinema = createCinema;
const purchaseSeat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaId, seatNumber } = req.params;
        const cinema = yield cinemaModel_1.default.findById(cinemaId);
        if (!cinema) {
            return res.status(constants_1.HttpStatusCodes.NOT_FOUND).json({
                error: responseMessage_1.ResponseMessages.NOT_FOUND,
            });
        }
        const isSeatBooked = cinema.bookedSeats.includes(parseInt(seatNumber, 10));
        if (isSeatBooked) {
            return res.status(constants_1.HttpStatusCodes.BAD_REQUEST).json({
                error: responseMessage_1.ResponseMessages.ERROR,
                message: responseMessage_1.ResponseMessages.SEAT_ALREADY_BOOKED,
            });
        }
        cinema.bookedSeats.push(parseInt(seatNumber, 10));
        yield cinema.save();
        res.status(constants_1.HttpStatusCodes.OK).json({
            message: responseMessage_1.ResponseMessages.SUCCESS,
            seat: seatNumber,
        });
    }
    catch (error) {
        res.status(constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: responseMessage_1.ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }
});
exports.purchaseSeat = purchaseSeat;
const purchaseConsecutiveSeats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cinemaId } = req.params;
        const cinema = yield cinemaModel_1.default.findById(cinemaId);
        if (!cinema) {
            return res.status(constants_1.HttpStatusCodes.NOT_FOUND).json({
                error: responseMessage_1.ResponseMessages.NOT_FOUND,
            });
        }
        const { seats, bookedSeats } = cinema;
        let consecutiveSeats = [];
        for (let i = 0; i < seats - 1; i++) {
            const isSeatBooked = bookedSeats.includes(i);
            const isNextSeatBooked = bookedSeats.includes(i + 1);
            if (!isSeatBooked && !isNextSeatBooked) {
                consecutiveSeats = [i, i + 1];
                break;
            }
        }
        if (consecutiveSeats.length === 0) {
            return res.status(constants_1.HttpStatusCodes.BAD_REQUEST).json({
                error: responseMessage_1.ResponseMessages.ERROR,
                message: responseMessage_1.ResponseMessages.NO_CONSECUTIVE_SEATS,
            });
        }
        cinema.bookedSeats.push(...consecutiveSeats);
        yield cinema.save();
        res.status(constants_1.HttpStatusCodes.OK).json({
            message: responseMessage_1.ResponseMessages.SUCCESS,
            seats: consecutiveSeats,
        });
    }
    catch (error) {
        res.status(constants_1.HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
            error: responseMessage_1.ResponseMessages.INTERNAL_SERVER_ERROR,
        });
    }
});
exports.purchaseConsecutiveSeats = purchaseConsecutiveSeats;
