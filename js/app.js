/* Global variables yay */
var ExploredArtists = {};

var app = angular.module('treespotting', []);

app.controller('TreeSpottingController', ['$scope', function($scope) {
	$scope.initialized = false;

	// Called when the first artist is entered via the text field.
	$scope.initialize = function() {
		Spotify.getArtistImgFromName($scope.initForm.artistName, function(imgUrl, spotifyId){
			$scope.$apply(function() {
				$scope.tree = [addArtistNode($scope.initForm.artistName, spotifyId, imgUrl)];
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
				
				response.artists.forEach(function (entry) {
					var spotifyId = entry.foreign_ids[0].foreign_id;
					
					// Get each artist's image from Spotify, then add their node to the tree.
					Spotify.getArtistImgFromId(spotifyId, function(imgUrl) {
						$scope.$apply(function() {
							data.nodes.push(addArtistNode(entry.name, spotifyId, imgUrl, hasArtistBeenExpanded(spotifyId)));
						});
					});
				});
			});
		}
	};
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
	return {name: artistName, spotifyId: spotifyId, img_url: imgUrl, expanded: expanded, nodes: []};
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

/**
 * Adds an artist node to the tree of artists.
 * @param artistName The name of the artist to add to the tree.
 * @param spotifyId The artist's spotify ID.
 * @param imgUrl A URL to the artist's image.
 * @param expanded Set to false to show the "Get Related" button. Passing no value is equal to false.
 */
var playTopSong = function (spotifyId) {
	Spotify.getArtistTopTracks(spotifyId, function(json) {
		Window.open(json.tracks[0].uri);	
	
	});
}
