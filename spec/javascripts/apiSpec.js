describe("API", function() {

	beforeEach(function() {
		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	it("should be able to perform a simple get", function() {
		var doneFn = jasmine.createSpy("success");
		API.get("boulder.api_boulder_path", doneFn);
		
		expect(jasmine.Ajax.requests.mostRecent().url).toBe('/api/boulder');
		expect(doneFn).not.toHaveBeenCalled();


	});

});