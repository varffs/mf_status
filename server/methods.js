var cheerio = Meteor.require('cheerio');

Meteor.methods({
	getWeatherForecast: function() {

		console.log('Forecast Call');

		HTTP.get('http://weather.yahooapis.com/forecastrss?w=27198398&u=c', function(err, result) {
			if (err) {
				console.log(err);
			} else {
				if (result.statusCode === 200) {
					$ = cheerio.load(result.content, {xmlMode: true});

					var timestamp = moment($('pubDate').text(), 'ddd, DD MMM YYYY h:mm a');
					var sunrise = moment($('ttl').next().next().next().next().next().attr('sunrise'), 'h:mm a').date(timestamp.date());
					var sunset = moment($('ttl').next().next().next().next().next().attr('sunset'), 'h:mm a').date(timestamp.date());

					var insertForcast = {
						timestamp: timestamp.format('X'),
						windDirection: $('ttl').next().next().next().attr('direction'),
						windSpeed: $('ttl').next().next().next().attr('speed'),
						humidity: $('ttl').next().next().next().next().attr('humidity'),
						pressure: $('ttl').next().next().next().next().attr('pressure'),
						sunrise: sunrise.format('X'),
						sunset: sunset.format('X'),
						currentDescription: $('pubDate').next().attr('text'),
						currentTemp: $('pubDate').next().attr('temp'),
						tomorrowDescription: $('description').next()[1].attribs.text,
						tomorrowHigh: $('description').next()[1].attribs.high,
						tomorrowLow: $('description').next()[1].attribs.low
					};
/* 					console.log(insertForcast); */

					latestForecast = WeatherForecasts.findOne({}, {sort: {timestamp: -1}});

					if (latestForecast) {
						if (latestForecast.timestamp === timestamp.format('X')) {
							console.log('didnt bother saving forecast data');
						} else {
							WeatherForecasts.insert(insertForcast);
						}
					} else {
						WeatherForecasts.insert(insertForcast);
					}

				} else {
					console.log(result.statusCode);
				}
			}
		})
	},
	getBandwidthReport: function() {

		console.log('Broadband Status Call');

		HTTP.get('https://billing.enta.net/usage/outinfo/rss/wbc/2e657e863dbb21165e57bba1ec761fc2/79c10a8be1092207ec02f4f2f82dffb7', function(err, result) {
			if (err) {
				console.log(err);
			} else {
				if (result.statusCode === 200) {
					$ = cheerio.load(result.content, {xmlMode: true});

					var timestamp = moment($('item').first().children('pubDate').text(), 'ddd, DD MMM YYYY h:mm a');

					$ = cheerio.load($('item').first().children('description').text());

					var data2 = $('p').eq(1).text().split('\n');

					var nextBill = moment(data2[1], 'D// MMMM YYYY');

					var remaining = data2[2].match(/\d\d\.\d\d/g)

					var insertReport = {
						timestamp: timestamp.format('X'),
						nextBill: nextBill.format('X'),
						remaining: remaining
					}
/* 					console.log(insertReport); */

					latestReport = BandwidthReports.findOne({}, {sort: {timestamp: -1}});

					if (latestReport) {
						if (latestReport.timestamp === timestamp.format('X')) {
							console.log('didnt bother saving broadband data');
						} else {
							BandwidthReports.insert(insertReport);
						}
					} else {
						BandwidthReports.insert(insertReport);
					}

				} else {
					console.log(result.statusCode);
				}
			}
		})
	}
});