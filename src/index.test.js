import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs' //file system 

//describes what the file is testing
describe('First Test', () => {

	//explains what this specific unit-test is testing
	it('should always pass', () => {
		expect(true).to.equal(true);
	})
})


describe('index.html', () => {
	it('should say Users', (done) => {
		const index = fs.readFileSync('./src/index.html', 'utf-8');
		jsdom.env(index, (err, window) => {
			const h1 = window.document.getElementsByTagName('h1')[0];
			expect(h1.innerHTML).to.equal("Users");
			done(); //marks the end of the async test
			window.close();
		})
	})
})