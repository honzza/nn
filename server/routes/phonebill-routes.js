const router = require("express").Router();
const phoneBillControllers = require("../controllers/phonebill-controllers");

/**
 * @swagger
 *  paths:
 *  /api/phonebill:
 *    post:
 *      summary: Returns the total price of phone calls
 *      requestBody:
 *        description: Call list
 *        required: true
 *        content:
 *          text/plain:
 *            schema:
 *              type: string
 *      responses:
 *        '200':
 *          description: The total price of phone calls
 */

router.post("/", phoneBillControllers.parseData);

module.exports = router;
