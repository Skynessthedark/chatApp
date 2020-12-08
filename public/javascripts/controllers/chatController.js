app.controller('chatController', ['$scope', ($scope)=>{
    $scope.activeTab = 2;
    $scope.onlineList = [];

    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList', users =>{
        $scope.onlineList = users;
    });

    $scope.newRoom = ()=>{
        let randomName = Math.random().toString(36).substring(7);
        socket.emit('newRoom', randomName);
    }

    $scope.tabChange = tab =>{
        $scope.activeTab = tab;
    }
}]);