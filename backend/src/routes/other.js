const router = require('express').Router();
const User = require('../handlers/user');
const userHandler = new User();


/**
 * @swagger
 * /signup:
 *      post:
 *          tags:
 *              - Guest
 *          description: Signup user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: login
 *                description: User login - unique
 *                required: true
 *                type: string
 *                in: formData
 *              - name: email
 *                description: User e-mail address - unique
 *                required: true
 *                type: string
 *                in: formData
 *              - name: password
 *                description: User password
 *                required: true
 *                type: string
 *                in: formData
 *              - name: Username
 *                description: Username - not unique
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Success message
 *              400:
 *                  description: Error message
 */
router.post('/signup', (req, res) => {
    userHandler.addUser(req, res);
});

/**
 * @swagger
 * /signin:
 *      post:
 *          tags:
 *              - Guest
 *          description: Signin user
 *          produces:
 *              - application/json
 *          parameters:
 *              - name: login
 *                description: User login
 *                required: true
 *                type: string
 *                in: formData
 *              - name: password
 *                description: User password
 *                required: true
 *                type: string
 *                in: formData
 *          responses:
 *              200:
 *                  description: Token into cookie and response body
 *              400:
 *                  description: Error message
 */
router.post('/signin', (req, res) => {
    userHandler.signIn(req, res);
});

/* ONLY FOR TESTING */
router.post('/makemeadmin', (req, res) => {
    userHandler.makeMeAdmin(req, res)
})

module.exports = router