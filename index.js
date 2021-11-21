const fs = require('fs');

const adjectivePath = './adjectives.csv';
const conjugationsPath = './conjugations.csv';
const declensionsPath = './declensions.csv';
const verbPath = './verbs.csv';
const wordPath='./db.csv';

const csv=require('csvtojson');
const mapArray = [];

const defaultParser = (jsonObj, keyArray) => {
    for(let item of jsonObj) {
        for(let key of keyArray) {
            if(item[key]) {
                for(let i of item[key].split(';')) {
                    mapArray.push([i.replace("'", "").toLowerCase(), i.toLowerCase()]);
                }
            }
        }
    }
}

const parseAdjectives = (adjectives) => {
    const keyArray = ['comparative', 'superlative', 'short_m', 'short_f', 'short_n', 'short_pl'];

    defaultParser(adjectives, keyArray);
}

const parseWords = (jsonObj) => {
    for(let i of jsonObj) {
        mapArray.push([
            i.bare.toLowerCase(),
            i.accented.toLowerCase()
        ])
    }
}

const parseConjugations = (jsonObj) => {
    const keyArray = ['sg1', 'sg2', 'sg3', 'pl1', 'pl2', 'pl3'];
    defaultParser(jsonObj, keyArray);
}
const parseDeclensions = (jsonObj) => {
    const keyArray = ['nom', 'gen', 'dat', 'acc', 'inst', 'prep'];
    defaultParser(jsonObj, keyArray);
}

const parseVerbs = (jsonObj) => {
    const keyArray = ['partner', 'imperative_sg', 'imperative_pl', 'past_m', 'past_f', 'past_n', 'past_pl'];
    defaultParser(jsonObj, keyArray);
}

(async function() {
    const words = await csv().fromFile(wordPath);
    const adjectives = await csv().fromFile(adjectivePath);
    const conjugations = await csv().fromFile(conjugationsPath);
    const declensions = await csv().fromFile(declensionsPath);
    const verbs = await csv().fromFile(verbPath);

    parseAdjectives(adjectives);
    parseWords(words);
    parseConjugations(conjugations);
    parseDeclensions(declensions);
    parseVerbs(verbs);

    fs.writeFileSync('./db.json', JSON.stringify(mapArray))
})();