var OpenIDApp=angular.module('OpenId',[]);
OpenIDApp.controller('OpenIdControl',function($scope,$http){
     $scope.FBlogin=function(){
     	var login_data={
     		'username':$scope.username,
            'password':$scope.pass
     	}
     	$http.get('/facebook_login').then(function(err){
     		if(err){
     			return err;
     		}
     		console.log('success');
     	})
     }
})