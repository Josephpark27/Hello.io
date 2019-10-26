const axios = require('axios');
const config = require('../config.json');
const fs = require('fs');
const querystring = require('querystring');


(async function() {
  let responses;

  try {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json'
    // let url = 'http://dummy.restapiexample.com/api/v1/employees';
    responses = await axios.get(url, {
      params: {
        query: "University of California Berkeley CA",
        fields: "formatted_address,name,place_id",
        key: config.google_api,
        radius: 50000
      }
    });
  } catch(error) {
    console.error(error);
  }
  
  // parse output
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  let resJSON = JSON.stringify(responses, getCircularReplacer());
  
  if(responses) {
    fs.writeFile("places.json", resJSON, 'utf8', function (err) {
        if (err) {
          console.log("An error occured while writing JSON Object to File.");
          return console.log(err);
        }
    
        console.log("JSON file has been saved.");
    });
  }
})()
