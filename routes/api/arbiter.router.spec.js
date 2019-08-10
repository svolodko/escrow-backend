'use strict';

import {chai, app, models, initDb} from '../../test/common';

describe("Arbiters", () => {
    before(async() => {
        await initDb();    
    });

    describe("GET /api/arbiter", () => {
        // Test to get all ariters record
        it("should get all arbiters record", async () => {
            const res = await chai.request(app).get('/api/arbiter');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(2);
        });

        // Test search parameters
        it("should search record", async () => {
            const res = await chai.request(app).get('/api/arbiter?searchString=ris');
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
        });         
    });
});