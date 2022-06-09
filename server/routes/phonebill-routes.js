const router = require("express").Router();
const phoneBillControllers = require("../controllers/phonebill-controllers");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - uid
 *         - firstname
 *         - lastname
 *       properties:
 *         activity:
 *           type: array
 *           items:
 *             type: object
 *           description: Activities totals for each club, array of objects
 *         clubs:
 *           type: array
 *           items:
 *             type: number
 *           description: Array of clubs of the user
 *         uid:
 *           type: number
 *           description: Unique Strava identifier of the user
 *         firstname:
 *           type: string
 *           description: Firstname of the user
 *         lastname:
 *           type: string
 *           description: Lastname of the user
 *         displayname:
 *           type: string
 *           description: Displayname of the user
 *         avatar:
 *           type: string
 *           description: URL of the user's avatar
 *       example:
 *         activity: [{...}, {...}]
 *         clubs: [800194, 285369]
 *         uid: 20023846
 *         firstname: "honzza"
 *         lastname: "dvorak"
 *         displayname: "honzza dvorak"
 *         avatar: "https://..."
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users management
 */

/**
 * @swagger
 * /api/user/{clubId}:
 *   get:
 *     summary: Returns the list of all users of the selected club
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: clubId
 *         schema:
 *           type: number
 *         required: true
 *         description: Id of the club
 *     responses:
 *       200:
 *         description: The list of the users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Could not find any user
 */

router.post("/", phoneBillControllers.parseData);

module.exports = router;
