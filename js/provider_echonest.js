var EchoNest = new Object();

/* Config vars */
EchoNest.ApiKey = "ACE8O1JKNVBTPUMHX";
EchoNest.NumRelatedArtists = 4;

/**
 * Asynchronously retrieves a list of related artists
 * @param artistName The name of the artist to get related artists for.
 * @param callback The callback function to call with the related artists.
 */
EchoNest.getRelatedArtistsAsync = function(artistName, callback) {
	var apiUrl = "http://developer.echonest.com/api/v4/artist/similar?api_key=" + EchoNest.ApiKey + "&results=" + EchoNest.NumRelatedArtists + "&name=" + artistName;
	
	var toReturn = [];
	$.getJSON(apiUrl, function(json) {
		callback(json.response);
	});
}
