var Spotify = new Object();

/* Config */
Spotify.ApiKey = "05e74c0125b648d38e33754cbbfb83dd"

/**
* Takes a Spotify artist ID or name and returns the artist object
* @param spotifyId The Spotify ID of the artist, prefixed by spotify:artist: or the artist Name
* @param callback The callback function to call with the artist object
*/
Spotify.getArtistAsync = function(artistId, callback){
	var spotApiUrl = "https://api.spotify.com/v1/";

	if(artistId.indexOf("spotify:artist:") > -1){ // if artistId is a spotify ID
		var id = artistId.replace("spotify:artist:", "");
		spotApiUrl += "artists/" + id;
		
		$.getJSON(spotApiUrl, function(json) {
			callback(json);
		});
	}
	else {	// artistId is an artist name
		spotApiUrl += "search?q=" + artistId + "&type=artist";
		
		$.getJSON(spotApiUrl, function(json) {
			var artist = json.artists.items[0];
			callback(artist);
		});
	}
}

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
