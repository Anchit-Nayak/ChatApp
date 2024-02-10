const redisClient = require('../redis');

module.exports.authorizeUser = async (socket, next) =>{
    if( !socket.request.session || !socket.request.session.user){
        console.log("bad request");
        next(new Error("Unauthorized"));
    }else{
        socket.user = {...socket.request.session.user};
        socket.join(socket.user.userid);
        await redisClient.hset(`userid:${socket.user.username}`, 
        "userid", socket.user.userid, "connected", true);

        const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

        const parsedFriendList = await parseFriendList(friendList)

        const friendRooms = parsedFriendList ? parsedFriendList.map(friend => friend.userid) : [];

        if(friendRooms.length> 0)socket.to(friendRooms).emit('connected', false, socket.user.username);
        socket.emit('friends', parsedFriendList);
        next();
    }
}

module.exports.addFriend = async (socket,friendName, cb) =>{
    try{
    console.log(friendName);
    if(friendName === socket.user.username){
        cb({done: false, errorMsg: "You cannot add yourself as a friend"});
        return;
    }
    const friend= await redisClient.hgetall(`userid:${friendName}`, "userid");

    console.log(friend);
    if(!friend){
        cb({done: false, errorMsg: "User not found"});
        return;
    }
    const currentFriendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

    if(currentFriendList.includes(friendName)){
        cb({done: false, errorMsg: "User already in friend list"});
        return;
    }
    await redisClient.lpush(`friends:${socket.user.username}`, [friendName, friend.userid].join("."));
    cb({done: true});
    }catch(err){
        cb({done: false, errorMsg: err})
    }
};

module.exports.onDisconnect = async socket =>{
    await redisClient.hset(`userid:${socket.user.username}`, "connected", false);

    const friendList = await redisClient.lrange(`friends:${socket.user.username}`, 0, -1);

    const friendRooms = await parseFriendList(friendList).then(friends => friends.map(friend => friend.userid));

    socket.to(friendRooms).emit("connected", false, socket.user.username);
}

const parseFriendList = async(friendList) =>{
    const newFriendList = [];
    for(let friend of friendList){
        const parsedFriend = friend.split(".");
        const friendConnected = await redisClient.hget(`userid:${parsedFriend[0]}`, "connected")
        newFriendList.push({
            username: parsedFriend[0], 
            userid: parsedFriend[1], 
            connected: friendConnected
        });
    }
    return newFriendList;
}