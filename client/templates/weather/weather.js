Template.weather.forecast = function() {
	return WeatherForecasts.findOne({}, {sort: {timestamp: -1}});
}

Template.weather.events({
	'click .refresh': function(e, template) {
		Meteor.call('getWeatherForecast', function(err) {
			if (err) {
				console.log(err);
			} else {

			}
		});
	}
});