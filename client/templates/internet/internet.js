Template.internet.report = function() {
	return BandwidthReports.findOne({}, {sort: {timestamp: -1}});
}

/*
Template.internet.rendered = function() {
	Meteor.call('getBandwidthReport', function(err) {
		if (err) {
			console.log(err);
		} else {

		}
	});
}
*/

Template.internet.events({
	'click .refresh': function(e, template) {
		Meteor.call('getBandwidthReport', function(err) {
			if (err) {
				console.log(err);
			} else {

			}
		});
	}
});