describe("Test Lab 12 AutoComplete Sentence Builder", () => {
	it("Finds the server and selects a word", () => {
		cy.visit("http://localhost:5173/");
		cy.get("#words").type("Ivan Kepseu{downArrow}{enter}");
	});
});
