const {
    lockSeatService,
    confirmBookingService,
    cancelBookingService,
    getBookingsService
} =
require("../services/booking.service");

const lockSeat = async (
    req,
    res
) => {

    try {

        const result =
            await lockSeatService(
                req.body
            );

        res.json(result);

    } catch (error) {

        res.status(400).json({
            message:
                error.message
        });

    }

};

const confirmBooking =
    async (
        req,
        res
    ) => {

        try {

            const result =
                await confirmBookingService(
                    req.body
                );

            res.json(result);

        } catch (error) {

            res.status(400).json({
                message:
                    error.message
            });

        }

    };

const cancelBooking =
    async (
        req,
        res
    ) => {

        try {

            const result =
                await cancelBookingService(
                    req.params.id
                );

            res.json(result);

        } catch (error) {

            res.status(400).json({
                message:
                    error.message
            });

        }

    };

const getBookings =
    async (
        req,
        res
    ) => {

        try {

            const bookings =
                await getBookingsService();

            res.json(
                bookings
            );

        } catch (error) {

            res.status(500).json({
                message:
                    error.message
            });

        }

    };

module.exports = {
    lockSeat,
    confirmBooking,
    cancelBooking,
    getBookings
};
