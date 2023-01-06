const getUser = async (req, res) => {
    res.send('get user')
}

const getUserFriends = async (req, res) => {
    res.send('get user friends')
}

const addRemoveFriend = async (req, res) => {
    res.send('add remove friend')
}

module.exports = {
    getUser, getUserFriends, addRemoveFriend
}