var Spotify = new Object();

/* Config */
Spotify.ApiKey = "05e74c0125b648d38e33754cbbfb83dd"

/**
* Takes a Spotify artist ID and returns the img URL
* @param spotifyId The Spotify ID of the artist, prefixed by spotify:artist:
* @param callback The callback function to call with the img url
*/
Spotify.getArtistImgFromId = function(spotifyId, callback) {

	if(spotifyId != null) {
		var id = spotifyId.replace("spotify:artist:", "");
		var spotApiUrl = "https://api.spotify.com/v1/artists/" + id;

		$.getJSON(spotApiUrl, function(json) {
			callback(json.images[1].url);
		});
	}
};

/**
* Takes a Spotify artist name and returns the img URL and spotifyId
* @param artistName The name of the artist
* @param callback The callback function to call with the img url and spotifyId
*/
Spotify.getArtistImgFromName = function(artistName, callback) {
	var spotApiUrl = "https://api.spotify.com/v1/search?q=" + artistName + "&type=artist";
	
	$.getJSON(spotApiUrl, function(json) {
		callback(json.artists.items[0].images[1].url, json.artists.items[0].uri);
	});
};

/**
* Takes a Spotify artist ID and returns the top tracks for the artist
* @param spotifyId The Spotify ID of the artist, prefixed by spotify:artist:
* @param callback The callback function to call with the JSON object full of track objects
*/
Spotify.getArtistTopTracks = function(spotifyId, callback) {
	var countryCode = "US"; //maybe adapt this to localized version later
	var id = spotifyId.replace("spotify:artist:", "");
	var spotApiUrl = "https://api.spotify.com/v1/artists/" + id + "/top-tracks?country=" + countryCode;
	
	$.getJSON(spotApiUrl, function(json) {
		callback(json);
	});
};
