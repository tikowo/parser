const fs = require('fs');
const path = require('path');

const csvFilePath='./db.csv';

const d = path.resolve(csvFilePath);
console.log(d);
const csv=require('csvtojson');
const mapArray = [];
csv()
.fromFile(d)
.then((jsonObj)=>{
    for(let i of jsonObj) {
        mapArray.push([
            i.bare,
            i.accented
        ])
    }
    const keyVal = new Map(mapArray);
    fs.writeFileSync('./db.json', JSON.stringify(mapArray))
})
