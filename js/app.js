var app = angular.module('treespotting', []);
app.controller('TreeSpottingController', ['$scope', function($scope) {
	$scope.initialized = false;

	// Called when the first artist is entered via the text field.
	$scope.initialize = function() {
		$scope.tree = [addArtistNode($scope.initForm.artistName, null)];
		$scope.initialized = true;
	};
	
	// Add another level to the tree by expanding a related artist.
	$scope.getRelated = function(data) {
		if (data.name != "") {
			data.expanded = true;
		
			EchoNest.getRelatedArtistsAsync(data.name, function(response) {
				// TODO: Check for errors from the API call.

				// Need to use $scope.$apply so the view updates accordingly.
				$scope.$apply(function() {
					response.artists.forEach(function(entry) {
						data.nodes.push(addArtistNode(entry.name, entry.foreign_ids[0].foreign_id));
					});
				});
			});
		}
	};
}]);

/**
 * Adds an artist node to the tree of artists.
 * @param artistName The name of the artist to add to the tree.
 */
var addArtistNode = function (artistName, spotifyId) {
	// TODO: Use spotifyId with getArtistImg to populate the imgUrl
	var imgUrl = null;
	
	return {name: artistName, img_url: imgUrl, expanded: false, nodes: []};
}
