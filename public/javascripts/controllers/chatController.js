app.controller('chatController', ['$scope', 'userFactory','chatFactory', ($scope, userFactory, chatFactory) => {
	/**
	 * initialization
	 */

	function init(){
		userFactory.getUser().then(user => {
			$scope.user = user;
		})
	}

	init();
    
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
    $scope.messages = [];
    $scope.user = {};

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

        chatFactory.getMessages(room.id).then(data=>{
            $scope.messages[room.id] = data;
        });
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