const userControllers = {
    // allAccess: function (req, res) { res.status(200).send(`Public Content`) }, //for guest role for non-login access

    userBoard: function (req, res) { res.status(200).send(`User Content`) }, //standard user
    adminBoard: function (req, res) { res.status(200).send(`Admin Content`) }, //for future role to be added

};

export default userControllers;
