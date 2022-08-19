const { parse } = require('csv-parse');
const fs = require('fs');

const habitablePlanets = [];

function isHabitablePlanet(planet) {
	// All factor from
	// A Review of the Best Habitable Planet Candidates on JANUARY 30, 2015
	// https://www.centauri-dreams.org/2015/01/30/a-review-of-the-best-habitable-planet-candidates/
	return (
		planet['koi_disposition'] === 'CONFIRMED' &&
		planet['koi_insol'] > 0.36 &&
		planet['koi_insol'] < 1.11 &&
		planet['koi_prad'] < 1.6
	);
}

fs.createReadStream('kepler_data.csv')
	.pipe(
		parse({
			comment: '#',
			columns: true,
		})
	)
	.on(
		'data',
		planet => isHabitablePlanet(planet) && habitablePlanets.push(planet)
	)
	.on('error', console.error)
	.on('end', () => {
		console.log(`${habitablePlanets.length} habitable planets found!`);
	});
