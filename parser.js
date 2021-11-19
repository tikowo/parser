const fs = require('fs');

const testinput = `Заполнял вчера форму на подключение мобильной связи от тинькова, вбил регион, свой номер телефона, и ушёл с сайта. Сегодня мне названивают менеджеры с вопросами, интересовался ли я, почему не подключил, и предлагают подключиться. замок`;

const readJsonDatabase = () => {
    return new Promise((resolve, reject) => {  
        fs.readFile('./db.json', 'utf8', function(err, data) {
            if(err) {
                reject(err)
            }
            resolve(JSON.parse(data));
        })
    })    
}

const makeParser = (mapper) => {
    const capitalizeFirstLetter = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const startsWithCapital = (word) => {
        if(word.charCodeAt(0) >= 1040 && word.charCodeAt(0) <= 1071) {
            return true
        }
        return false;
    }
    const handleWordQuirks = (word) => {
        let shouldCapitalizeAfter = false;
        let result = word;

        if(startsWithCapital(word)) {
            shouldCapitalizeAfter = true;
            result = word.toLowerCase();
        }
        if(mapper.has(result)) {
            result = mapper.get(result);
        }
        if(shouldCapitalizeAfter) {
            result = capitalizeFirstLetter(result);
        }
        return result;
    }
    return (string) => {
        const inputArray = string.split(' ');
        const resultArray = [];
        for(let item of inputArray) {
            resultArray.push(handleWordQuirks(item));
        }
        return resultArray.join(' ');
    }
}
(async () => {
    let input = testinput;
    const mapData = await readJsonDatabase();
    const mapper = new Map(mapData);
    const parseString = makeParser(mapper);

    let parsed = parseString(input)
    console.log(parsed);
})();