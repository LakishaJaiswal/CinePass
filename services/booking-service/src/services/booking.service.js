const redisClient =
    require("../config/redis");

const pool =
    require("../config/db");

const {
    getChannel
} = require("../config/rabbitmq");

const lockSeatService = async ({
    showId,
    seatNumbers
}) => {

    for (
        const seatNumber
        of seatNumbers
    ) {

        const seat =
            await pool.query(
                `
                SELECT status
                FROM seats
                WHERE show_id = $1
                AND seat_number = $2
                `,
                [
                    showId,
                    seatNumber
                ]
            );

        if (
            seat.rows.length > 0 &&
            seat.rows[0].status === "booked"
        ) {

            throw new Error(
                `${seatNumber} already booked`
            );

        }

        const key =
            `seat:${showId}:${seatNumber}`;

        const existing =
            await redisClient.get(
                key
            );

        if (existing) {

            throw new Error(
                `${seatNumber} already locked`
            );

        }

    }

    for (
        const seatNumber
        of seatNumbers
    ) {

        const key =
            `seat:${showId}:${seatNumber}`;

        await redisClient.set(
            key,
            "locked",
            {
                EX: 300
            }
        );

    }

    return {
        message:
            "Seats locked successfully",
        seatNumbers
    };

};

const confirmBookingService =
    async ({
        userId,
        showId,
        seatNumbers
    }) => {

        for (
            const seatNumber
            of seatNumbers
        ) {

            const key =
                `seat:${showId}:${seatNumber}`;

            const lock =
                await redisClient.get(
                    key
                );

            if (!lock) {

                throw new Error(
                    `${seatNumber} lock expired`
                );

            }

        }

        const booking =
            await pool.query(
                `
                INSERT INTO bookings
                (
                    user_id,
                    show_id,
                    total_amount,
                    booking_status
                )
                VALUES
                ($1,$2,$3,$4)
                RETURNING *
                `,
                [
                    userId,
                    showId,
                    seatNumbers.length * 250,
                    "confirmed"
                ]
            );

        const bookingId =
            booking.rows[0].id;

        const seats =
            await pool.query(
                `
                SELECT id,
                       seat_number
                FROM seats
                WHERE show_id = $1
                AND seat_number = ANY($2)
                `,
                [
                    showId,
                    seatNumbers
                ]
            );

        for (
            const seat
            of seats.rows
        ) {

            await pool.query(
                `
                INSERT INTO booking_seats
                (
                    booking_id,
                    seat_id
                )
                VALUES
                ($1,$2)
                `,
                [
                    bookingId,
                    seat.id
                ]
            );

            await pool.query(
                `
                UPDATE seats
                SET status='booked'
                WHERE id=$1
                `,
                [
                    seat.id
                ]
            );

        }

        for (
            const seatNumber
            of seatNumbers
        ) {

            const key =
                `seat:${showId}:${seatNumber}`;

            await redisClient.del(
                key
            );

        }

        const channel =
            getChannel();

        channel.sendToQueue(
            "booking.created",
            Buffer.from(
                JSON.stringify(
                    booking.rows[0]
                )
            )
        );

        return {
            message:
                "Booking Confirmed",
            booking:
                booking.rows[0]
        };

    };

const cancelBookingService =
    async (
        bookingId
    ) => {

        await pool.query(
            `
            UPDATE bookings
            SET booking_status='cancelled'
            WHERE id=$1
            `,
            [bookingId]
        );

        const seats =
            await pool.query(
                `
                SELECT seat_id
                FROM booking_seats
                WHERE booking_id=$1
                `,
                [bookingId]
            );

        for (
            const seat
            of seats.rows
        ) {

            const activeBookings =
                await pool.query(
                    `
                    SELECT COUNT(*) AS count
                    FROM booking_seats bs
                    JOIN bookings b
                    ON bs.booking_id = b.id
                    WHERE bs.seat_id = $1
                    AND b.booking_status='confirmed'
                    `,
                    [
                        seat.seat_id
                    ]
                );

            if (
                parseInt(
                    activeBookings.rows[0].count
                ) === 0
            ) {

                await pool.query(
                    `
                    UPDATE seats
                    SET status='available'
                    WHERE id=$1
                    `,
                    [
                        seat.seat_id
                    ]
                );

            }

        }

        return {
            message:
                "Booking Cancelled"
        };

    };

const getBookingsService =
    async () => {

        const result =
            await pool.query(
                `
                SELECT
                    b.id,
                    b.user_id,
                    b.show_id,
                    b.total_amount,
                    b.booking_status,
                    ARRAY_AGG(
                        s.seat_number
                    ) AS seats
                FROM bookings b
                JOIN booking_seats bs
                    ON b.id = bs.booking_id
                JOIN seats s
                    ON bs.seat_id = s.id
                GROUP BY
                    b.id
                ORDER BY
                    b.id DESC
                `
            );

        return result.rows;

    };

module.exports = {
    lockSeatService,
    confirmBookingService,
    cancelBookingService,
    getBookingsService
};
