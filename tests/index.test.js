const mocha = require('mocha');
const should = require('should');
const fs = require('fs');
const selectProp = require('../lib/');

describe('Selects a property from various objects', () => {

    it('Selects a prop', () => {
        const obj = {
            a: {
                b: {
                    c: 'd'
                }
            }
        };
        const selected = selectProp(obj, 'a.b.c');
        selected.should.deepEqual('d');
    });

    it('Selects a prop from a random object with an array', () => {
        const obj = {
            a: {
                b: [{
                    c: 'd'
                }]
            }
        };
        const selected = selectProp(obj, 'a.b.c');
        selected.should.deepEqual(['d']);
    });

    it('Selects a prop from a Reddit Listing', () => {
        const subreddit = require('./data/subreddit.json');
        const titles = require('./data/subredditTitles.json');
        const selected = selectProp(subreddit, 'data.children.data.title');
        selected.should.deepEqual(titles);
    });

    it('Selects the perf keys from lichess tournament data', () => {
        const tournaments = require('./data/lichess.json');
        const selected = selectProp(tournaments, 'created.perf.key');
        const unique = removeDuplicates(selected);
        const sorted = unique.sort((a, b) => a < b ? -1 : 1);
        const variants = [
            'antichess',
            'atomic',
            'blitz',
            'bullet',
            'chess960',
            'crazyhouse',
            'horde',
            'kingOfTheHill',
            'racingKings',
            'rapid',
            'threeCheck',
            'ultraBullet'
        ];
        sorted.should.deepEqual(variants);
    })
})

/// A function which removes duplicates from an array using a hash table
function removeDuplicates(array) {
    const seen = {};
    return array.filter((item) => {
        if (seen.hasOwnProperty(item)) return false;
        return seen[item] = true;
    });
}