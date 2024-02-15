import * as dbRtns from "./db_routines.js";
import * as cfg from "./config.js";
import * as ps from "./project1_setup.js";

const resolvers = {
	project1_setup: async () => {
		let results = await ps.processAlertsToDBAsync();
		return results;
	},
	alerts: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, cfg.collectionname, {}, {});
	},
	advisories: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, cfg.collectionadv, {}, {});
	},
	alertsforregion: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, cfg.collectionname, {region: args.region}, {});
	},
	alertsforsubregion: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, cfg.collectionname, {subregion: args.subregion}, {});
	},
	advisoriesforuser: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findAll(db, cfg.collectionadv, {name: args.name}, {});
	},
	advisoriesforregion: async (args) => {
		let db = await dbRtns.getDBInstance();
		let advisories = await dbRtns.findAll(db, cfg.collectionadv, {}, {});
		let alertsregion = await dbRtns.findAll(db, cfg.collectionname, {region: args.region}, {});
		let results = [];
		for (let index = 0; index < advisories.length; index++) {
			const element = advisories[index];
			for (let index2 = 0; index2 < alertsregion.length; index2++) {
				const element2 = alertsregion[index2];
				if(element.country === element2.name)
				{
					results.push(element);
				}
			}
		}
		return results;
	},
	advisoriesforsubregion: async (args) => {
		let db = await dbRtns.getDBInstance();
		let advisories = await dbRtns.findAll(db, cfg.collectionadv, {}, {});
		let alertssubregion = await dbRtns.findAll(db, cfg.collectionname, {subregion: args.subregion}, {});
		let results = [];
		for (let index = 0; index < advisories.length; index++) {
			const element = advisories[index];
			for (let index2 = 0; index2 < alertssubregion.length; index2++) {
				const element2 = alertssubregion[index2];
				if (element.country === element2.name) {
					results.push(element);
				}
			}
		}
		return results;
	},
	alertforcountry: async (args) => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findOne(db, cfg.collectionname, {name: args.name}, {});
	},
	regions: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findUniqueValues(db, cfg.collectionname, "region");
	},
	subregions: async () => {
		let db = await dbRtns.getDBInstance();
		return await dbRtns.findUniqueValues(db, cfg.collectionname, "subregion");
	},
	addadv: async (args) => {
		let db = await dbRtns.getDBInstance();
		const d = new Date();
		let country = await dbRtns.findOne(db, cfg.collectionname, {name: args.country}, {});
		let adv = { name: args.name, country: args.country, text: country.text, date: d.toLocaleString() };
		let results = await dbRtns.addOne(db, cfg.collectionadv, adv);
		return results.acknowledged ? adv : null;
	},

};

export { resolvers };
