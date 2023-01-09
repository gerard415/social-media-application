const User = require('../models/User')

const getUser = async (req, res) => {
    const {id: userId} = req.params
    const user = await User.findOne({_id: userId})
    res.status(200).json({user})
}

const getUserFriends = async (req, res) => {
    const {id: userId} = req.params
    const user = await User.findOne({_id: userId})

    const friends = await Promise.all(
        user.friends.map((_id) => User.findById(_id))
    );

    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
        }
    )

    res.status(200).json({formattedFriends})
}

const addRemoveFriend = async (req, res) => {
    const {id: userId, friendId} = req.params
    const user = await User.findOne({_id: userId}) 
    const friend = await User.findOne ({_id: friendId})


    if(user.friends.includes(friendId)){
        user.friends = user.friends.filter((_id) => _id !== friendId)
        friend.friends = friend.friends.filter((_id) => _id !== userId);
    }else{
        user.friends.push(friendId);
        friend.friends.push(userId);
    }
    await user.save();
    await friend.save();

    

    
    const friends = await Promise.all(
      user.friends.map((_id) => User.findById(_id))
    );
    const formattedFriends = friends.map(
      ({ _id, firstName, lastName, location, picturePath }) => {
            return { _id, firstName, lastName, location, picturePath };
      }
    );


    res.status(200).json({formattedFriends});

    // res.send('add remove friends')
}

module.exports = {
    getUser, getUserFriends, addRemoveFriend
}