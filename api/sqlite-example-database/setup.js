const sequelize = require('../sequelize');
const fs = require('fs');

async function reset() {
	console.log('Will rewrite the SQLite example database from json file.');

	// let rawdataCompany = fs.readFileSync('../../client/public/data/company.json');
	let rawdataCompany = fs.readFileSync('./data/company.json');
	let rawdataIndustry = fs.readFileSync('./data/industry.json');
	let rawdataAdmin = fs.readFileSync('./data/admin.json');
    let input = JSON.parse(rawdataCompany);

	await sequelize.sync({ force: true });

	for(let item of input){
		await sequelize.models.companyData.create({
			Time: item["Time"],
			Company: item["Company"],
			NumberOfLayOff: item["NumberOfLayOff"]
		});
	}

	input = JSON.parse(rawdataIndustry);

	for(let item of input){
		await sequelize.models.industryData.create({
			Time: item["Time"],
			Industry: item["Industry"],
			NumberOfLayOff: item["NumberOfLayOff"]
		});
	}

	input = JSON.parse(rawdataAdmin);

	for(let item of input){
		await sequelize.models.adminData.create({
			Username: item["username"],
            Password: item["password"]
		});
	}

	

	console.log('Done!');
}

reset();
