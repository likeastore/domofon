describe('users.spec.js', function () {

	describe('when creating users', function () {
		describe('when user created', function () {

			it('should be created', function () {

			});

			it('should have lastImpressionAt', function () {

			});

			it('should have session count as one', function () {

			});
		});

		describe('when user updated', function () {
			it('should be updated', function () {

			});

			it('should have update lastImpressionAt', function () {

			});

			it('should have session count as one', function () {

			});

			describe('after half of hour', function () {
				beforeEach(function () {
					// hack lastImpressionAt in db
				});

				it('should session incremented', function () {

				});
			});
		});
	});

	describe('when getting users', function () {
		describe('if empty', function () {

		});

		describe('if for one page', function () {

		});

		describe('if for two pages', function () {

		});
	});
});