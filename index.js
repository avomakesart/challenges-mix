'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}



/*
 * Complete the 'getWinnerTotalGoals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING competition
 *  2. INTEGER year
 */
const request = require("request");

const API_URL = 'https://jsonmock.hackerrank.com/api/football_matches?';

function httpGet(url) {
    return new Promise((resolve, reject) =>{
        request.get(url, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let json = JSON.parse(body);
                resolve(json);
            } else {
                reject(error);
            }
        });
    });
}

function goalsURL(team, year, page, type, competition) {
    if (type === 1) {
        return API_URL + "competition=" + competition + "&year="+ year + "&team1=" + team + "&page=" + page;
    } 
    
    return API_URL + "competition=" + competition + "&year="+ year + "&team2=" + team + "&page=" + page;
}

function count(data, type) {
    let res = 0;
    if (type === 1) {
        data.forEach(item => {
            res += parseInt(item.team1goals);
        })
    } else {
        data.forEach(item => {
            res += parseInt(item.team2goals);
        })
    }
    return res;
}

async function getTotalGoals(team, year, competition) {
    let p = 1;
    let url1 = goalsURL(team, year, 1, 1, competition);
    let res1 = await httpGet(url1);
    // console.log(res1);
    let total = 0;
    total += count(res1.data, 1);
    
    let totalPage = res1.total_pages;
    
    // console.log(total);
    while (p < totalPage) {
        p++;
        url1 = goalsURL(team, year, p, 1, competition);
        // console.log(url1);
        res1 = await httpGet(url1);
        total += count(res1.data, 1);
    }
    
    let url2 = goalsURL(team, year, 1, 2, competition);
    let res2 = await httpGet(url2);
    total += count(res2.data, 2);
    totalPage = res2.total_pages;
    p = 1;
    while (p < totalPage) {
        p++;
        url2 = goalsURL(team, year, p, 2, competition);
        res2 = await httpGet(url2);
        total += count(res2.data, 2);
    }
    
    return total;
}

async function getWinnerTotalGoals(competition, year) {
    let url = "https://jsonmock.hackerrank.com/api/football_competitions?name=" + competition + "&year="+ year;
    // console.log(url);
    let res = await httpGet(url);
    let winner = res.data[0].winner;
    // console.log(winner);
    return getTotalGoals(winner, year, competition);
}

async function main() {
    // const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    // const competition = readLine();
    const competition = "UEFA Champions League";

    // const year = parseInt(readLine().trim(), 10);
    const year = "2011";

    const result = await getWinnerTotalGoals(competition, year);

    console.log(result);
    // ws.write(result + '\n');

    // ws.end();
}

main();