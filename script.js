/* Config variables */
var echoNestApiKey = "ACE8O1JKNVBTPUMHX";
var relatedArtistsPerQuery = 4;

var app = angular.module('treespotting', []);
app.controller('TreeSpottingController', ['$scope', function($scope) {
	$scope.initialized = false;

	// Called when the first artist is entered via the text field.
	$scope.initialize = function() {
		$scope.tree = [addArtirstNode($scope.initForm.artistName)];
		$scope.initialized = true;
	};
	
	// Add another level to the tree by expanding a related artist.
	$scope.getRelated = function(data) {
		if (data.name != "") {
			data.expanded = true;
		
			getRelatedArtistsAsync(data.name, function(response) {
				// TODO: Check for errors from the API call.
			
				// Need to use $scope.$apply so the view updates accordingly.
				$scope.$apply(function() {
					response.artists.forEach(function(entry) {
						data.nodes.push(addArtirstNode(entry.name));
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
var addArtirstNode = function (artistName) {
	return {name: artistName, expanded: false, nodes: []};
}

/**
 * Asynchronously retrieves a list of related artists
 * @param artistName The name of the artist to get related artists for.
 * @param callback The callback function to call with the related artists.
 */
var getRelatedArtistsAsync = function(artistName, callback) {
	var apiUrl = "http://developer.echonest.com/api/v4/artist/similar?api_key=" + echoNestApiKey + "&results=" + relatedArtistsPerQuery + "&name=" + artistName;
	
	var toReturn = [];
	$.getJSON(apiUrl, function(json) {
		callback(json.response);
	});
}
