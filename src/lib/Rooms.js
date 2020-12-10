const shortid = require('shortid');
const redisClient = require('../redisClient');

function Rooms() {
	this.client = redisClient.getClient();
}

module.exports = new Rooms();

Rooms.prototype.upsert = name => { 
	const roomId = '@Room:'+ shortid.generate();
	const roomData = JSON.stringify({
		id: roomId,
		name,
		when: Date.now()
	});

	this.client.hset("rooms", roomId, roomData, (err) => { if (err) console.error(err); });
};

Rooms.prototype.list = callback => {
	
	let roomList = [];

	this.client.hgetall("rooms", (err, rooms)=> {
		if (err) {
			console.error(err);
			return callback([]);
		}
		else{
			
			for (let room in rooms){
				roomList.push(JSON.parse(rooms[room]));
			}
	
			return callback(roomList);
		}
	})
};
