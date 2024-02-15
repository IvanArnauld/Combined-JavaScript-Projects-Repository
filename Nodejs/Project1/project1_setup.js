// import yargs from "yargs";
// import { hideBin } from "yargs/helpers";
import * as rtnLib from "./utilities.js";
import * as cfg from "./config.js";
import * as dbRtns from "./db_routines.js";

// const getCounts = async () => {
// 	let countryJSON = [];
// 	let alertJson;
// 	let alertLength;

// 	let allCountries = [];
// 	let nameAndCodeCountries = [];

// 	try {
// 		countryJSON = await rtnLib.getJSONFromWWWPromise(cfg.rawisocountries);
// 		alertJson = await rtnLib.getJSONFromWWWPromise(cfg.rawgoc);
// 		alertLength = Object.keys(alertJson.data).length;
// 		console.log(`Retrieved Alert JSON from remote web site.`);
// 		console.log(`Retrieved Country JSON from remote web site.`);
// 	} catch (error) {
// 		console.log(error);
// 	} finally {
// 		console.log(
// 			`There are ${alertLength} alerts and ${countryJSON.length} countries`
// 		);
// 	}
// };

const processAlertsToDBAsync = async () => {
	let alertVariable;
	let allAlerts = [];
	let resultingAlerts = [];
	let allCountries = [];
	let nameAndCodeCountries = [];
	let results; 
	let resultsJSON = "";
	let countryMatches = 0;

	try {
		const db = await dbRtns.getDBInstance();
		allCountries = await dbRtns.getJSONFromWWWPromise(cfg.rawisocountries);
		alertVariable = await dbRtns.getJSONFromWWWPromise(cfg.rawgoc);		
		allAlerts = alertVariable.data;

		nameAndCodeCountries = allCountries.map((element) =>
			removeProperties(element, "name", "alpha-2")
		);

		results = await dbRtns.deleteAll(db, cfg.collectionname);
		// console.log(
			// `Deleted ${results.deletedCount} existing documents from ${cfg.collectionname} collection`
		// );
		resultsJSON += `Deleted ${results.deletedCount} existing documents from ${cfg.collectionname} collection.`;
		// console.log(`Retrieved Alert JSON from remote web site`);
		// console.log(`Retrieved Country JSON from GitHub`);
		resultsJSON += ` Retrieved Alert JSON from remote web site.`;
		resultsJSON += ` Retrieved Country JSON from GitHub.`;
		allCountries.forEach(element => {
			let alert = {};
			if(allAlerts[(element['alpha-2'])] != null)
			{
				alert.country = element["alpha-2"];
				alert.name = element["name"];
				alert.text = allAlerts[element["alpha-2"]].eng["advisory-text"];
				alert.date = allAlerts[element["alpha-2"]]["date-published"].date;
				alert.region = element.region;
				alert.subregion = element["sub-region"];
				resultingAlerts.push(alert);
				countryMatches++;
			}
			else
			{
				alert.country = element["alpha-2"];
				alert.name = element["name"];
				alert.text = "No travel alerts";
				alert.date = "";
				alert.region = element.region;
				alert.subregion = element["sub-region"];
				resultingAlerts.push(alert);
			}
		});
		//console.log(`Matches: ${countryMatches}`);
		results = await dbRtns.addMany(
			db,
			cfg.collectionname,
			resultingAlerts
		);
		// console.log(
			// `Added ${resultingAlerts.length} documents to the alerts collection`
		// );
		resultsJSON += ` Added ${resultingAlerts.length} documents to the alerts collection.`;
		//console.log(allAlerts['AF']);

		// let allDbCountries = await dbRtns.findAll(db, cfg.collectionname);
		// console.log(
		// 	`There are currently ${allDbCountries.length} documents in the ${cfg.collectionname} collection`
		// );

		

		// results = await dbRtns.addMany(
		// 	db,
		// 	cfg.collectionname,
		// 	nameAndCodeCountries
		// );
		// console.log(
		// 	`There are now ${allDbCountries.length} documents currently in the ${cfg.collectionname} collection`
		// );

		// let selectedCountry = await dbRtns.findOne(db, cfg.collectionname, {
		// 	"alpha-2": argv.code,
		// });

		// let report =
		// 	selectedCountry != null
		// 		? `The code ${argv.code} belongs to the country of ${selectedCountry.name}`
		// 		: `The code ${argv.code} is not a known country alpha-2 code`;

		// console.log(report);

		//process.exit(0);
	} catch (error) {
		resultsJSON = error;
		//process.exit(1);
	} finally {
		return {results: resultsJSON };
	}
};

function removeProperties(element, ...properties) {
	return properties.reduce(function (result, prop) {
		result[prop] = element[prop];
		return result;
	}, {});
}


//processAlertsToDBAsync();
export { processAlertsToDBAsync };

//getCounts();
