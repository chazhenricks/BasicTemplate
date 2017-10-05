//condition library
import {expect} from 'chai';
//virtual dom
import jsdom from 'jsdom';
//so we can import a file into our virtual dom
import fs from 'fs';


describe('Our first test', () => {
    it('should pass', () =>{
        expect(true).to.equal(true);
    });
});


//test for index.html
describe('index.html', () =>{
    //it is a function that describes the test
    //note since this is technically async, need a 'done' argument to be passed in
    it('should say hello', (done) => {
        //sets up reference to index.html file
        const index = fs.readFileSync('./src/index.html', "utf-8");
        //sets up virtual dom, passing it our reference file and what to do with it
        jsdom.env(index, function(err, window){
            //sets up reference to the h1 tag
            const h1 = window.document.getElementsByTagName("h1")[0];
            //writes what we expect to happen
            expect(h1.innerHTML).to.equal("Hello World!");
            //calls done so it can work async
            done();
            //closes virtual dom to save memory
            window.close();
        });
    });
});
