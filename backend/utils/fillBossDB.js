// Update testData and everything else will update

const Boss = require('../models/Boss');

// Location data
const testData = [
  {
    'name': 'Founders Rock',
    'location': [37.8752654,-122.2570056],
  },
  {
    'name': 'Blum Center',
    'location': [37.8747101,-122.258506]
  },
  {
    'name': 'The Campanile',
    'location': [37.8724585,-122.2580723]
  },
  {
    'name': 'Sather Gate',
    'location': [37.8701736,-122.2578173]
  },
  {
    'name': 'Melvin Calvin Laboratory',
    'location': [37.8700803,-122.2554956]
  },
  {
    'name': 'Haas Pavilion',
    'location': [37.8695683,-122.260768]
  },
  {
    'name': 'Bowles Lot',
    'location': [37.8725916,-122.2550424]
  },
  {
    'name': 'The Berkeley Bayit',
    'location': [37.8683593,-122.250481]
  },
  {
    'name': 'Zachary\'s Chicago Pizza',
    'location': [37.8463003,-122.2543414]
  },
  {
    'name': 'Monkey Island',
    'location': [37.8596732,-122.2493934]
  }
]

// Mission names
const names = [
  'Cattips',
  'Dharo',
  'Ukie',
  'Ani',
  'Bauron',
  'Fresra',
  'Evora',
  'Bedorm',
  'Shenoz',
  'Seimra'
]

// Time delay
const expoFunc = (i) => Math.floor((0.4*Math.pow(2,i)-1.4)*60000);

(async function() {
  // Indices to be shuffled
  let indices = [];
  for (let i=0;i<testData.length;i++) indices.push(i);
  for (let i = indices.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  Boss.insertMany(indices.map((randInd, i) => {
    return {
      'name': names[randInd%names.length],
      'level': i,
      'location': {
        'coordinates': testData[randInd].location,
        'type': 'Point'
      },
      'delay': expoFunc(i)
    };
  }), (err) => {console.log(err)});

  console.log('success!');
})();