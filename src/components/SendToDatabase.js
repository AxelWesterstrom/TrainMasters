export async function updateDatabase(log, u, s) {
    function randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    s.ticket.bookingNumber = randomIntBetween(1, 10000000);

    let isCancelable;
    if (s.ticket.type === 'cancelable') {
        isCancelable = 1;
    } else {
        isCancelable = 0;
    }
    let bookingsId = 0;
    let peopleId = [];
    let passengersId = [];

    for (let i = 0; i < s.ticket.people.length; i++) {
        let { insertId } = await (
            await fetch(`/api/people`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: s.ticket.people[i].firstName,
                    lastName: s.ticket.people[i].lastName,
                }),
            })
        ).json();
        peopleId.push(insertId);
    }

    if (log.login) {
        let { insertId } = await (
            await fetch(`/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cancelable: isCancelable,
                    bookingNumber: s.ticket.bookingNumber,
                    customerId: u.customerId,
                }),
            })
        ).json();
        bookingsId = insertId;
    } else {
        let { insertId: newCustomerId } = await (
            await fetch(`/api/customers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    personId: peopleId[0],
                    email: s.ticket.email,
                }),
            })
        ).json();

        let { insertId } = await (
            await fetch(`/api/bookings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cancelable: isCancelable,
                    bookingNumber: s.ticket.bookingNumber,
                    customerId: newCustomerId,
                    price: s.ticket.totalPrice,
                }),
            })
        ).json();
        bookingsId = insertId;
    }

    for (let i = 0; i < peopleId.length; i++) {
        let { insertId } = await (
            await fetch(`/api/passengers`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ personId: peopleId[i] }),
            })
        ).json();
        passengersId.push(insertId);
    }

    for (let i = 0; i < peopleId.length; i++) {
        let { insertId } = await (
            await fetch(`/api/tickets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: bookingsId,
                    passengerId: passengersId[i],
                    type: s.ticket.people[i].type,
                }),
            })
        ).json();
        passengersId.push(insertId);
    }
    for (let i = 0; i < s.ticket.seats.length; i++) {
        await (
            await fetch(`/api/bookingParts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bookingId: bookingsId,
                    journeyId: s.ticket.chosenJourney.journeyId,
                    departureStationId: s.ticket.chosenJourney.stationIdA,
                    arrivalStationId: s.ticket.chosenJourney.stationIdB,
                    seatId: s.ticket.seats[i].id,
                    date: new Date(s.ticket.date).toLocaleDateString('sv-SE'),
                }),
            })
        ).json();
    }
}
