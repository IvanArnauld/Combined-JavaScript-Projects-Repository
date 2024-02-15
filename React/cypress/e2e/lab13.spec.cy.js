describe("Test Lab 13 Search For User", () => {
	it("Finds the server and selects a user", () => {
		cy.visit("http://localhost:5173/");
		cy.get("#menubtn").click();
		cy.contains("a", "Lab 13").click();
        cy.wait(1000);
	});
});
