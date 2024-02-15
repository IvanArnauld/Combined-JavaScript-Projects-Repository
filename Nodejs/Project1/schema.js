const schema = `
type Query {
    project1_setup: Results,
    alerts: [Alert],
    advisories: [Advisory],
    alertsforregion(region: String): [Alert],
    alertsforsubregion(subregion: String): [Alert],
    advisoriesforuser(name: String): [Advisory],
    advisoriesforregion(region: String): [Advisory],
    advisoriesforsubregion(subregion: String): [Advisory],
    alertforcountry(name: String): Alert,
    regions: [String],
    subregions: [String],
},
type Results {
    results: String
}
type Alert {
 country: String
 name: String
 text: String
 date: String
 region: String
 subregion: String
}
type Advisory {
 name: String
 country: String
 text: String
 date: String
}
type Mutation {
    addadv(name: String, country: String): Advisory
}
`;
export { schema };
