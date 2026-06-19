import { useState } from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

const Booking = () => {

    const [selectedSeats,
        setSelectedSeats] =
        useState([]);

    const [message,
        setMessage] =
        useState("");

    const seats = [
        "A1",
        "A2",
        "A3",
        "B1",
        "B2",
        "B3"
    ];

    const toggleSeat =
        (seat) => {

            if (
                selectedSeats.includes(
                    seat
                )
            ) {

                setSelectedSeats(
                    selectedSeats.filter(
                        s => s !== seat
                    )
                );

            } else {

                setSelectedSeats([
                    ...selectedSeats,
                    seat
                ]);

            }

        };

    const lockSeats =
        async () => {

            try {

                const response =
                    await api.post(
                        "/api/bookings/lock-seat",
                        {
                            showId: 1,
                            seatNumbers:
                                selectedSeats
                        }
                    );

                setMessage(
                    response.data.message
                );

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Seat locking failed"
                );

            }

        };

    const confirmBooking =
        async () => {

            try {

                const response =
                    await api.post(
                        "/api/bookings/confirm",
                        {
                            userId: 1,
                            showId: 1,
                            seatNumbers:
                                selectedSeats
                        }
                    );

                setMessage(
                    response.data.message
                );

            } catch (error) {

                setMessage(
                    error.response?.data?.message ||
                    "Booking failed"
                );

            }

        };

    return (
        <>
            <Navbar />

            <h1>
                Book Ticket
            </h1>

            <h3>
                Select Seats
            </h3>

            <div>

                {
                    seats.map(
                        seat => (

                            <button
                                key={seat}
                                onClick={() =>
                                    toggleSeat(
                                        seat
                                    )
                                }
                                style={{
                                    margin:
                                        "5px",
                                    background:
                                        selectedSeats.includes(
                                            seat
                                        )
                                            ? "green"
                                            : ""
                                }}
                            >
                                {seat}
                            </button>

                        )
                    )
                }

            </div>

            <br />

            <p>
                Selected Seats:
                {" "}
                <strong>
                    {
                        selectedSeats.join(
                            ", "
                        )
                    }
                </strong>
            </p>

            <p>
                Total:
                {" "}
                ₹
                {
                    selectedSeats.length
                    * 250
                }
            </p>

            <button
                onClick={lockSeats}
            >
                Lock Seats
            </button>

            <button
                onClick={confirmBooking}
                style={{
                    marginLeft:
                        "10px"
                }}
            >
                Confirm Booking
            </button>

            <p>
                {message}
            </p>

        </>
    );

};

export default Booking;
