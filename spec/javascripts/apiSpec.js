describe("API", function() {

	var request;
	var onSuccess;
	var onFailure;

	// beforeEach(function() {
	// 	jasmine.Ajax.install();
	// });

	// afterEach(function() {
	// 	jasmine.Ajax.uninstall();
	// });

	describe("on success", function() {


		it("calls onSuccess", function() {
			onSuccess = jasmine.createSpy('onSuccess');
			onFailure = jasmine.createSpy('onFailure');

			API.get("boulder.api_boulder_path", onSuccess);

			request = jasmine.Ajax.requests.mostRecent();
			// request.respondWith(TestResponses.get.success);

			// expect(request.url).toBe('/api/boulder');
			// expect(onSuccess).not.toHaveBeenCalled();
			// expect(request.method).toBe('GET');


			// //expect(onSuccess).toHaveBeenCalledWith('awesome response');
			expect(onSuccess).toHaveBeenCalled();
		});

	});


});