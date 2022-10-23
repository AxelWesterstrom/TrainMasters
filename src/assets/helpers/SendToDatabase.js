export async function updateDatabase(log, u, s) {
    function randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    s.ticket.bookingNumber = randomIntBetween(1, 10000000);
    u.bookingNumber = s.ticket.bookingNumber;
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
                    price: s.ticket.totalPrice,
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
export async function getTicket(t, bookNum) {
    await getBookingInfoFromNumber();

    async function getBookingInfoFromNumber() {
        let carriageNumberArray = [];
        let seatNumberArray = [];
        let personArray = [];
        let bookingData;

        bookingData = await (
            await fetch(`/api/bookingsWithJourneys?bookingNumber=${bookNum}`)
        ).json();

        t.date = bookingData[0].date;
        t.departureStation = bookingData[0].departureStationName;
        t.departureTime = bookingData[0].departureStationDepartureTime;
        t.arrivalStation = bookingData[0].arrivalStationName;
        t.arrivalTime = bookingData[0].arrivalStationArrivalTime;
        t.price = bookingData[0].price;
        t.trainNumber = bookingData[0].trainNumber;
        t.bookingNumber = bookingData[0].bookingNumber;
        let bookingId = bookingData[0].bookingId;
        for (let i = 0; i < bookingData.length; i++) {
            carriageNumberArray.push(bookingData[i].carriageNumber);
            seatNumberArray.push(bookingData[i].seatNumber);
        }

        let ticketData = await (
            await fetch(`/api/ticketWithPassenger?bookingId=${bookingId}`)
        ).json();
        for (let i = 0; i < ticketData.length; i++) {
            personArray.push({
                firstName: ticketData[i].firstName,
                lastName: ticketData[i].lastName,
                type: ticketData[i].type,
            });
        }
        t.carriageNumber = carriageNumberArray;
        t.seatNumber = seatNumberArray;
        t.person = personArray;
    }
}

export async function getAllTickets(t, u) {
    let bookingData;
    let customerId;
    let allBookingNumbers = [];
    customerId = await (await fetch(`/api/customers?email=${u.email}`)).json();
    let arrayWithAllTickets = [];

    bookingData = await (
        await fetch(`/api/bookingsWithJourneys?customerId=${customerId[0].id}`)
    ).json();

    for (let data of bookingData) {
        if (!allBookingNumbers.includes(data.bookingNumber)) {
            allBookingNumbers.push(data.bookingNumber);
        }
    }

    for (let i = 0; i < allBookingNumbers.length; i++) {
        let carriageNumberArray = [];
        let seatNumberArray = [];
        let personArray = [];

        for (let j = 0; j < bookingData.length; j++) {
            carriageNumberArray.push(bookingData[j].carriageNumber),
                seatNumberArray.push(bookingData[j].seatNumber);
        }

        let bookingId = bookingData[i].bookingId;
        let ticketData = await (
            await fetch(`/api/ticketWithPassenger?bookingId=${bookingId}`)
        ).json();
        for (let k = 0; k < ticketData.length; k++) {
            personArray.push({
                firstName: ticketData[k].firstName,
                lastName: ticketData[k].lastName,
                type: ticketData[k].type,
            });
        }
        let ticketToAdd = {
            date: bookingData[i].date,
            departureStation: bookingData[i].departureStationName,
            departureTime: bookingData[i].departureStationDepartureTime,
            arrivalStation: bookingData[i].arrivalStationName,
            arrivalTime: bookingData[i].arrivalStationArrivalTime,
            price: bookingData[i].price,
            trainNumber: bookingData[i].trainNumber,
            bookingNumber: bookingData[i].bookingNumber,
            carriageNumber: carriageNumberArray,
            seatNumber: seatNumberArray,
            person: personArray,
        };
        arrayWithAllTickets.push(ticketToAdd);
    }
    t = arrayWithAllTickets;
    return t; //
}
