var Spotify = new Object();

/* Config */
Spotify.ApiKey = "05e74c0125b648d38e33754cbbfb83dd"

/**
* Takes a Spotify artist ID and returns the img URL
* @param spotifyId The Spotify ID of the artist, prefixed by spotify:artist:
* @param callback The callback function to call with the img url
*/
Spotify.getArtistImg = function(spotifyId, callback) {

	if(spotifyId != null) {
		var id = spotifyId.replace("spotify:artist:", "");
		var spotApiUrl = "https://api.spotify.com/v1/artists/" + id;

		$.getJSON(spotApiUrl, function(json) {
			callback(json.images[0].url);
		});
	}
}