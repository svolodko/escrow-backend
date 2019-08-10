import { Router } from 'express';
import DealController from '../../controllers/dealController';
import AuthController from '../../controllers/authController';

const router = Router();

/**
 * @swagger
 * /deal:
 *    get:
 *      tags:
 *          - Frontend
 *      description: Return all deals
 *      produces:
 *       - application/json
 *      parameters:
 *       - name: created_by
 *         in: query
 *         description: searching deals by buyer
 *         required: false
 *         type: string
 *       - name: buyer
 *         in: query
 *         description: searching deals by buyer
 *         required: false
 *         type: string
 *       - name: seller
 *         in: query
 *         description: searching deals by seller
 *         required: false
 *         type: string
 *       - name: arbiter
 *         in: query
 *         description: searching deals by arbiter
 *         required: false
 *         type: string
 *       - name: flags
 *         in: query
 *         description: searching deals by flags
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
 *                      $ref: '#/definitions/Deal'
 *          400:
 *              description: bad input parameter
 */
router.get('/', DealController.index);

/**
 *  @swagger
 *  /deal:
 *      post:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Backend
 *          summary: Add new deal
 *          description: Return result
 *          parameters:
 *              -   name: body
 *                  required: true
 *                  description: Deal object
 *                  in: body
 *                  schema:
 *                      type: object
 *                      properties:
 *                        created_by:
 *                          type: string
 *                          example: escrowbob111
 *                        description:
 *                          type: string
 *                        price:
 *                          type: object
 *                          properties:
 *                           quantity: string
 *                           contract: string
 *                          example:
 *                           quantity: 0.1000 VOID
 *                           contract: onessusblock
 *                        buyer:
 *                          type: string
 *                        seller:
 *                          type: string
 *                        arbiter:
 *                          type: string
 *                        days:
 *                          type: integer
 *                        funded:
 *                          type: string
 *                          format: date-time
 *                        expires:
 *                          type: string
 *                          format: date-time
 *                        flags:
 *                          type: integer
 *                        delivery_memo:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Deal created
 *                  schema:
 *                      type: object
 *                      properties:
 *                          success:
 *                              type: boolean
 *                          id:
 *                              type: integer
 *              400:
 *                  description: No token provided.
 *              401:
 *                  description: Token is not valid
 */
router.post('/', AuthController.checkToken, DealController.store);

/**
 *  @swagger
 *  /deal/{id}:
 *      put:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Backend
 *          summary: Update deal
 *          description: Update deal
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  required: true
 *                  description: id of deal
 *              -   name: body
 *                  description: Deal object
 *                  in: body
 *                  schema:
 *                      type: object
 *                      properties:
 *                        created_by:
 *                          type: string
 *                          example: escrowbob111
 *                        description:
 *                          type: string
 *                        price:
 *                          type: object
 *                          properties:
 *                           quantity: string
 *                           contract: string
 *                          example:
 *                           quantity: 0.1000 VOID
 *                           contract: onessusblock
 *                        buyer:
 *                          type: string
 *                        seller:
 *                          type: string
 *                        arbiter:
 *                          type: string
 *                        days:
 *                          type: integer
 *                        funded:
 *                          type: string
 *                          format: date-time
 *                        expires:
 *                          type: string
 *                          format: date-time
 *                        flags:
 *                          type: integer
 *                        delivery_memo:
 *                          type: string
 *          responses:
 *              204:
 *                  description: Successful operation
 *              400:
 *                  description: id is required
 *              401:
 *                  description: Token is not valid
 *              404:
 *                  description: Deal not found
 */
router.put('/:id', AuthController.checkToken, DealController.update);

export default router;
