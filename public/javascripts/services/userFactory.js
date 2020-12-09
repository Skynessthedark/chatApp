
app.factory('userFactory', ['$http', 'env', ($http, env) => {
	function getUser(){
		return $http({
			url: env.SERVICE_URL+ '/getUser',
			method: 'GET'
		}).then(response => {
			return response.data;
		}, (err) => {
			console.error(err);
		})
	};

	return {
		getUser
	}
}]);