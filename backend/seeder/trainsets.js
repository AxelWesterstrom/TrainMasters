const db = require('../DatabaseQuerry');

async function seedTrainSets() {
    await db.query('DELETE FROM locomotives');
    await db.query('DELETE FROM trainsets');
    await db.query('DELETE FROM carriages');
    await db.query('DELETE FROM seats');

    let types = { 1: 54, 2: 74, 3: 28, 4: 42 };
    let handicap = {
        1: [46, 49, 52],
        2: [3, 4, 71, 72],
        3: [3, 4],
        4: [79, 80],
    };
    let trains = [
        [1, 2, 3, 2, 2, 4],
        [1, 2, 3, 2, 4],
        [1, 2, 2, 4],
    ];
    let counter = 1;
    for (let train of trains) {
        let { insertId: locomotiveId } = await db.query(
            'INSERT INTO locomotives(locomotiveNumber) VALUES(?)',
            [counter]
        );
        let { insertId: trainSetId } = await db.query(
            'INSERT INTO trainSets(locomotive) VALUES(?)',
            [locomotiveId]
        );
        let carriageNumber = 1;
        for (let carriageType of train) {
            let numberOfSeats = types[carriageType];
            let { insertId: carriageId } = await db.query(
                'INSERT INTO carriages(trainset, number, petsAllowed, firstClass, bistro) VALUES(?,?,?,?,?)',
                [
                    trainSetId,
                    carriageNumber,
                    carriageType === 4 ? 1 : 0,
                    carriageType === 1 ? 1 : 0,
                    carriageType === 3 ? 1 : 0,
                ]
            );
            for (
                let seatNumber = 1;
                seatNumber <= numberOfSeats;
                seatNumber++
            ) {
                await db.query(
                    'INSERT INTO seats(carriage, seatNumber, isHandicapSeat) VALUES(?,?,?)',
                    [
                        carriageId,
                        seatNumber,
                        handicap[carriageType].includes(seatNumber) ? 1 : 0,
                    ]
                );
            }
            carriageNumber++;
        }
        counter++;
    }
    console.log('Trainsets populated!');
}
seedTrainSets();
