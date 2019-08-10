import { Router } from 'express';
import ArbiterController from '../../controllers/arbiterController';
import AuthController from '../../controllers/authController';

const router = Router();

/**
 * @swagger
 * /arbiter:
 *    get:
 *      tags:
 *          - Frontend
 *      description: Return all arbiter
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: searchString
 *         in: query
 *         description: pass an optional search string for looking up arbiter
 *         required: false
 *         type: string
 *       - name: skip
 *         in: query
 *         description: number of records to skip for pagination
 *         type: integer
 *         format: int32
 *         minimum: 0
 *       - name: limit
 *         in: query
 *         description: maximum number of records to return
 *         type: integer
 *         format: int32
 *         minimum: 0
 *         maximum: 50
 *      responses:
 *          200:
 *              description: search results matching criteria
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/definitions/Arbiter'
 *          400:
 *              description: bad input parameter
 */
router.get('/', ArbiterController.index);

/**
 *  @swagger
 *  /arbiter:
 *      post:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Backend
 *          summary: Add new arbiter
 *          description: Return result
 *          parameters:
 *              -   name: body
 *                  required: true
 *                  description: Arbiter object
 *                  in: body
 *                  schema:
 *                    $ref: '#/definitions/Arbiter'
 *          responses:
 *              200:
 *                  description: Arbiter created
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *              400:
 *                  description: No token provided.
 *              401:
 *                  description: Token is not valid
 */
router.post('/', AuthController.checkToken, ArbiterController.store);

/**
 *  @swagger
 *  /arbiter/{account}:
 *      put:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Backend
 *          summary: Update arbiter
 *          description: Update arbiter
 *          parameters:
 *              -   in: path
 *                  name: account
 *                  required: true
 *                  description: account
 *              -   name: body
 *                  description: Arbiter object
 *                  in: body
 *                  schema:
 *                      type: object
 *                      properties:
 *                       contact_name:
 *                         type: string
 *                         example: Chris
 *                       email:
 *                         type: string
 *                         example: email@domain.com
 *                       description:
 *                         type: string
 *                         example: Blah blah
 *                       website:
 *                         type: string
 *                         example: https://www.example.com
 *                       phone:
 *                         type: string
 *                         example: +123456789334
 *                       iso_country:
 *                         type: string
 *                         example: US
 *                       processed_deals:
 *                         type: integer
 *                         example: 2
 *                       is_active:
 *                         type: number
 *                         example: 1
 *          responses:
 *              204:
 *                  description: Successful operation
 *              400:
 *                  description: account is required
 *              401:
 *                  description: Token is not valid
 *              404:
 *                  description: Arbiter not found
 */
router.put('/:account', AuthController.checkToken, ArbiterController.update);

export default router;
