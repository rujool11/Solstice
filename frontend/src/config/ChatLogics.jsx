export const getSender = (loggedUser, users) => {
    // Check if users array exists and has the required data before accessing _id 
    // (fix bug that causes error after new login, and ok when refreshed)
    if (!users || users.length === 0 || !loggedUser) return null;

    return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
}