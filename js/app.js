/* Global variables yay */
var ExploredArtists = {};

var app = angular.module('treespotting', []);

app.controller('TreeSpottingController', ['$scope', function($scope) {
	$scope.initialized = false;

	// Called when the first artist is entered via the text field.
	$scope.initialize = function() {
		Spotify.getArtistAsync($scope.initForm.artistName, function(artist){
			$scope.$apply(function() {
				$scope.tree = [addArtistNode(artist.name, artist.uri, artist.images[1].url, hasArtistBeenExpanded(artist.uri))];
				ExploredArtists[artist.uri] = true;
			});
		});
		
		$scope.initialized = true;
	};
	
	// Add another level to the tree by expanding a related artist.
	$scope.getRelated = function(data) {
		if (data.name != "") {
			data.expanded = true;
			ExploredArtists[data.spotifyId] = true;
		
			EchoNest.getRelatedArtistsAsync(data.name, function(response) {
				// TODO: Check for errors from the API call.
				
				for (var i = 0; i < response.artists.length; i++) {
					var entry = response.artists[i];
					var spotifyId = entry.foreign_ids[0].foreign_id;
					
					// Get each artist's image from Spotify, then add their node to the tree.
					Spotify.getArtistAsync(spotifyId, function(artist) {
						$scope.$apply(function() {
							data.nodes.push(addArtistNode(artist.name, artist.uri, artist.images[1].url, hasArtistBeenExpanded(spotifyId)));
						});
					});
				}
			});
		}
	};
	
	$scope.playTopSong = function (spotifyId) {
		Spotify.getArtistTopTracks(spotifyId, function(json) {
			window.open(json.tracks[0].uri,"_self");	
		});
	}
}]);

/**
 * Adds an artist node to the tree of artists.
 * @param artistName The name of the artist to add to the tree.
 * @param spotifyId The artist's spotify ID.
 * @param imgUrl A URL to the artist's image.
 * @param expanded Set to false to show the "Get Related" button. Passing no value is equal to false.
 */
var addArtistNode = function (artistName, spotifyId, imgUrl, expanded) {
	if (expanded === undefined) expanded = false;
	return {name: artistName, spotifyId: spotifyId, img_url: imgUrl, expanded: expanded,  nodes: []};
}

/**
 * Check to see if an artist has already been expanded in the tree.
 * @param artistId The Spotify ID of the artist to check.
 * @returns true if the artist has been expanded, false otherwise.
 */
var hasArtistBeenExpanded = function (artistId) {
	if (ExploredArtists[artistId] !== undefined) {
		return true;
	} else {
		return false;
	}
}

