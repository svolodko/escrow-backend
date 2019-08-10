'use strict';

import {chai, app, models, initDb} from '../../test/common';

describe("Deals", () => {
    before(async() => {
        await initDb();    
    });

    describe("GET /api/deal", () => {
        // Test to get all deal record
        it("should get all deal record", async () => {
            const res = await chai.request(app).get('/api/deal');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
        });

        // Test search parameters
        it("should search record by buyer", async () => {
            const res = await chai.request(app).get('/api/deal?buyer=escrowbuyer1');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
        });         
    });
});