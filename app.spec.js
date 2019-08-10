'use strict';

import {chai, app, models} from './test/common';

describe("Start server", () => {

        it("should respond OK to /", (done) => {
            chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.eql('ok');
                done();
             });
        });

        it("should respond 404 everything else", (done) => {
            chai.request(app)
            .get('/foo/bar')
            .end((err, res) => {
                res.should.have.status(404);
                done();
             });
        }); 
});