app.controller('chatController', ['$scope', ($scope)=>{
    $scope.activeTab = 2;

    $scope.tabChange = tab =>{
        $scope.activeTab = tab;
    }

    const socket = io.connect("http://localhost:3000");
}]);