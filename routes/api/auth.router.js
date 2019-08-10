import { Router } from 'express';
import AuthController from '../../controllers/authController';

const router = Router();

/**
 *  @swagger
 *  /auth:
 *      post:
 *          tags:
 *              - Backend
 *          summary: Authenticate user and get auth token
 *          description: Returns token if success auth.
 *          parameters:
 *              -   name: body
 *                  required: true
 *                  in: body
 *                  schema:
 *                      type: object
 *                      required:
 *                          -   username
 *                              password
 *                      properties:
 *                          username:
 *                              type: string
 *                              example: escrowuser
 *                          password:
 *                              type: string
 *          responses:
 *              200:
 *                  description: User token
 *                  schema:
 *                      items:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              token:
 *                                  type: string
 *              400:
 *                  description: Username and password are required
 *              401:
 *                  description: Authentication failed
 */
router.post('/', AuthController.authUser);

/**
 *  @swagger
 *  /auth/check:
 *      get:
 *          security:
 *              - Bearer: []
 *          tags:
 *              - Backend
 *          summary: Check auth token
 *          description: Returns result of checking token
 *          responses:
 *              200:
 *                  description: User token
 *                  schema:
 *                      items:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                              username:
 *                                  type: string
 *              400:
 *                  description: No token provided.
 *              401:
 *                  description: Token is not valid
 */
router.get('/check', AuthController.checkToken, (req, res) => res.json({
  success: true,
  username: req.username,
}));

export default router;
