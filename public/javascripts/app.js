angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.comments = [];
	  $scope.ballot = [];

    $scope.addComment = function() {
	    if($scope.formContent === '') { return; }
      console.log("In addComment with "+$scope.formContent);
	    var newcomment = {title:$scope.formContent,upvotes:0};
      $scope.formContent='';
      $http.post('/comments', newcomment).success(function(data){
        $scope.comments.push(data);
      });
    };
    $scope.upvote = function(comment) {
	    console.log("in upvote");
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
	  $scope.dovote = function() {
      console.log("In Dovote");
      angular.forEach($scope.comments, function(value,key) {
       console.log("in foreach");
	      if(value.selected) {
		console.log("in if");
          $scope.upvote(value);
          $scope.ballot.push(value);
        }
      });
    }
    $scope.getAll();
    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };	
  }
]);
