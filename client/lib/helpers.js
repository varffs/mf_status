Handlebars.registerHelper('breaklines', function(text) {
    text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    return new Handlebars.SafeString(text);
});

Handlebars.registerHelper('fromNow', function(unix) {
	var unix = moment(unix, 'X').fromNow();
    return new Handlebars.SafeString(unix);
});

Handlebars.registerHelper('bandwidthRemainingPercent', function(remaining) {
	if (remaining) {
		var percent = (remaining[1]/remaining[0]).toFixed(2) + '%';
	    return new Handlebars.SafeString(percent);
	}
});

Handlebars.registerHelper('bandwidthRemainingGB', function(remaining) {
	if (remaining) {
		var gb = remaining[0] + 'GB';
	    return new Handlebars.SafeString(gb);
	}
});