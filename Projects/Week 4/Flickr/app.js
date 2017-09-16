var main = function () {
	"use strict";

	var requestURL = "http://api.flickr.com/services/feeds/photos_public.gne?tags=dogs&format=json&jsoncallback=?";

	$.getJSON(requestURL, function (flickrResponse) {
		//Iterate over items
		flickrResponse.items.forEach(function (photo) {
		//Build an img tag using item.media.m
		var $img = $("<img>");.hide();
		$img.attr("src", photo.media.m);
		//Add to the DOM
		$("main .photos").append($img);
		$img.fadeIn();
	});
});

$(document).ready(main);