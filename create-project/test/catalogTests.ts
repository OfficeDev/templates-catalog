import 'mocha';

let search = require('../src/search');
let sort = require('../src/sortJson');
let assert = require('assert');

describe('Catalog Tests:', () => {

    let arr = 
    [ 
        {color: 'Red', number: '7'},
        {color: 'Blue', number: '12'},
        {color: 'Green', number: '3'},
        {color: 'Yellow', number: '20'} 
    ];

    it ('Testing Catalog Search : search()', function(done) {
        let byColor = search.search(arr, 'yellow', 'color');
        //let expected = "[ { color: 'Yellow', number: '20' } ]";
        let byNumber = search.search(arr, '20', 'number');
        assert.deepEqual(byColor, byNumber);
        done();
    });

    it ('Testing Catalog Sort : compareStrings()', function(done) {
        let first = 'ABCD';
        let second = 'ZYXW';
        let val = sort.compareStrings(first, second);
        assert.equal(-1, val);
        done();
    });
});