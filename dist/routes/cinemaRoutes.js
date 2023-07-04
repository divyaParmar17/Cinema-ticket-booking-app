"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cinemaController_1 = require("../controllers/cinemaController");
const router = express_1.default.Router();
// Create a cinema
router.post('/cinemas', cinemaController_1.createCinema);
// Purchase a specific seat in a cinema
router.post('/cinemas/:cinemaId/seats/:seatNumber', cinemaController_1.purchaseSeat);
// Purchase the first two free consecutive seats in a cinema
router.post('/cinemas/:cinemaId/seats', cinemaController_1.purchaseConsecutiveSeats);
exports.default = router;
