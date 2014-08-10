/*
SyncedCron.add({
	name: 'Check forecast',
	schedule: function(parser) {
		return parser.text('every 5 seconds');
	},
	job: function() {
		Meteor.call('notifyClient', subscription, function(err) {
			if (err) {
				console.log(err);
			} else {

			}
		});
	}
});
*/