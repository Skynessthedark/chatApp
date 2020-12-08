app.controller('chatController', ['$scope', ($scope)=>{
    /**
     * ANGULAR VARIABLES
     */

    $scope.activeTab = 2;
    $scope.onlineList = [];
    $scope.roomList = [];
    $scope.chatClicked = false;
    $scope.chatName = "";
    $scope.roomId = "";
    $scope.message = "";

    /**
     * SOCKET EVENT HANDLING.
     */

    const socket = io.connect("http://localhost:3000");

    socket.on('onlineList', users =>{
        $scope.onlineList = users;
        $scope.$apply();
    });

    socket.on('roomList', rooms=>{
        $scope.roomList = rooms;
        $scope.$apply();
    });

    $scope.switchRoom = (room)=>{
        $scope.chatClicked = true;
        $scope.roomId = room.id;
        $scope.chatName = room.name;
    }

    $scope.newMessage = ()=>{
        socket.emit('newMessage', {
            message: $scope.message,
            roomId: $scope.roomId
        })
        $scope.message = '';
    }

    $scope.newRoom = ()=>{
        //let randomName = Math.random().toString(36).substring(7);

        let roomName = window.prompt('Enter a room name: ');
        if(roomName !== '' && roomName !== null){
            socket.emit('newRoom', roomName);
        }
        
    }

    $scope.tabChange = tab =>{
        $scope.activeTab = tab;
    }
}]);