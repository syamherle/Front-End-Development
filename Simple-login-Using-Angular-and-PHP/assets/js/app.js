var app =  angular.module('myApp',['ngRoute'])

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl:'homeStatic.html'
	})
	.when('/loginPage',{
		templateUrl:'loginpage.html'
	})
	.when('/dashboardPage',{
		resolve:{
			"check":function($location,$rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl:'landingpage.html'
	})
	.when('/signuppage',{
		templateUrl:'signuppage.html'	
	})
	.when('/editprofile',{
		resolve:{
			"check":function($location,$rootScope){
				if(!$rootScope.loggedIn){
					$location.path('/');
				}
			}
		},
		templateUrl:'editprofilepage.html'		
	})
	.otherwise({
		redirectTo:'/'
	});
})

//main Controller
app.controller('mainController',function($scope,$location){
	$scope.redirectTologin=function(){
		$location.path('/loginPage');
	}

})

//Login Controller
app.controller('loginController',function($scope,$location,$rootScope,$http){
	$scope.submitLogin=function(){
		
		var login="uname="+$scope.uname+"&password="+$scope.password;
		console.log(login)
		
		$http({
			method:"POST",
			url:'dbConnect.php',
			data:login,
			headers:{
				 "Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function(data){
			var loginData=JSON.parse(data.data)
			if(loginData.statuslogin == 1){
				$rootScope.uname=$scope.uname;
				console.log($rootScope.uname)

				$rootScope.loggedIn=true;
				$location.path('/dashboardPage');
			}else{
				alert('wrong user')
			}
		})

	},
	$scope.signup=function(){
		$location.path('/signuppage');
	}
	

});


//SignUp Controllers
app.controller('signupController',function($scope,$location,$http,$rootScope){
	$scope.newuser=function(){
		var login="uname="+$scope.theName+"&password="+$scope.thePwd+"&email="+$scope.theEmail;
		$http({
			method:"POST",
			url:'signUp.php',
			data:login,
			headers:{
				 "Content-Type": "application/x-www-form-urlencoded"
			}
		}).then(function(data){
			var loginData=JSON.parse(data.data)
			if(loginData.statuslogin == 1){
				$rootScope.uname=$scope.theName;
				$rootScope.loggedIn=true;
				$location.path('/dashboardPage');

			}else{
				alert('wrong user')
			}
		})

	}
});

app.controller('userDemoGraph',function($scope,$location,$http,$rootScope){
	var user_info=$rootScope.uname;
	console.log(user_info);
	$http({
		method:"GET",
		url:'userinfo.php',
		params:{userName:user_info}
	}).then(function(data){
		respText=JSON.parse(data.data)
		
		$scope.userDetails=respText.records;
	})
	$scope.editprofile=function(){
		$location.path('/editprofile');
	}
})

app.controller('edituserprofile',function($scope,$location,$http,$rootScope){
	var user_info=$rootScope.uname;
	$rootScope.userDetails="";
	
	$http({
		method:"GET",
		url:'userinfo.php',
		params:{userName:user_info}
	}).then(function(data){
		respText=JSON.parse(data.data)
		
		$rootScope.userDetails=respText.records;
	})

	$scope.updateuserInfo=function(){
			var login="olduname="+user_info+"&newuname="+$rootScope.userDetails.username+"&password="+$rootScope.userDetails.userpassword+"&email="+$rootScope.userDetails.email;
			
			$http({
				method:"POST",
				url:'updateuserinfo.php',
				data:login,
				headers:{
				 "Content-Type": "application/x-www-form-urlencoded"
				}
			}).then(function(data){
				console.log(JSON.parse(data.data))
				var loginData=JSON.parse(data.data)
				if(loginData.statuslogin == 1){
					$rootScope.uname=$rootScope.userDetails.username
					$rootScope.loggedIn=true;
					$location.path('/dashboardPage');
				}
			})
		},
	$scope.cancelupdate = function(){
		$location.path('/dashboardPage');
	}
})

	


app.directive('wjValidationError', function () {
  return {
    require: 'ngModel',
    link: function (scope, elm, attrs, ctl) {
      scope.$watch(attrs['wjValidationError'], function (errorMsg) {
        elm[0].setCustomValidity(errorMsg);
        ctl.$setValidity('wjValidationError', errorMsg ? false : true);
      });
    }
  };
});





















/*app.factory("services",['$http',fucntion($http){
	var serviceBase = 'services/'
	var obj={};
	obj.chckLogin=function(){
		return $http.get(serviceBase+'user?name='+userName+'&user?password='+userPassword)
	}
	obj.signUpUser=function(){
		return $http.post(serviceBase+'signUp',user).then(function(results){
			return results;
		});
	};
	obj.userDetails=function(){
		return $http.post(serviceBase+'userDetail',user).then(function(results){
			return results;
		});	
	}

	return obj;
}])*/