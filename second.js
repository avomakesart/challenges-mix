const https = require("https"); 

const getJSONAsync = url => new Promise((resolve, reject) => {     
  let req = https.get(url, res => {                                
    if(res.statusCode < 200 || res.statusCode >= 300) {              
      return reject(new Error('statusCode=' + res.statusCode));    
    }

    let body = [];                                                   
    res.on('data', chunk => body.push(chunk));                       
    res.on('end', () => {                                                                         
      try {
        body = JSON.parse(Buffer.concat(body).toString());           
      } catch(e) {
        reject(e);                                                  
      }
      resolve(body);                                                
    });
  });

  req.on("error", error => reject(error));                           
});

async function getNumDraws(year) {
  let result = 0;

  for(let goal = 0; goal < 11; goal++) {
    let data = await getJSONAsync(`https://jsonmock.hackerrank.com/api/football_matches?year=${year}&team1goals=${goal}&team2goals=${goal}`);
    result += data.total;
  }

  return result;
}
