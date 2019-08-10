import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import config from '../config/config';

// Configure chai
chai.use(chaiHttp);
chai.should();

const models = require('../models');
const app = require('../app');

const getToken = (payload) => {
  return jwt.sign(payload, config.jwtAuth.secret);
}

const initDb = async () => {
    let result = await models.sequelize.sync({ force: true });
    await models.arbiter.bulkCreate([{
        account: 'escrowchris1',
        contact_name: 'Chris',
        email: 'chris@domain.com',
        description: 'Blah blah',
        website: 'https://www.domain.com',
        phone: '+1347824947932141',
        iso_country: 'US',
        processed_deals: 2, 
        is_active: 1
      },
      {
        account: 'escrowmonk',
        contact_name: 'Monk',
        email: 'monk@domain.com',
        description: 'Blah blah',
        website: 'https://www.domain.com',
        phone: '+1347824949484732',
        iso_country: 'US',
        processed_deals: 2, 
        is_active: 1
      }]);

      await models.deal.bulkCreate([
        {
          "created_by": "escrowbob111",
          "description": "My Description",
          "price": {
            "quantity": "0.1000 VOID",
            "contract": "onessusblock"
          },
          "buyer": "escrowbuyer1",
          "seller": "escrowseller1",
          "arbiter": "escrowarb1",
          "days": 0,
          "funded": "2019-08-10T09:25:55.868Z",
          "expires": "2019-08-10T09:25:55.868Z",
          "flags": 0
        },
        {
          "created_by": "escrowbob222",
          "description": "Bla bla",
          "price": {
            "quantity": "0.1000 VOID",
            "contract": "onessusblock"
          },
          "buyer": "escrowbuyer2",
          "seller": "escrowseller2",
          "arbiter": "escrowarb2",
          "days": 0,
          "funded": "2019-08-10T09:25:55.868Z",
          "expires": "2019-08-10T09:25:55.868Z",
          "flags": 0
        }               
      ]);  
}

export {chai, app, models, initDb, getToken, config};