// 1. Object initializers and methods
const loaf = {
  flour: 300,
  water: 210,
};

loaf.hydration = function() {
  return (this.water/this.flour)*100;
};

console.log(loaf.hydration());

// 2. Iterating over an object properties
console.log('-----');

const obj2 = {
  foo: 1,
  bar: 'two',
  fum: [4, 5],
  quux: {
    a: 6,
  },
  spam: () => console.log('Spam'),
};

for (const each in obj2) {
  console.log(each + ': ' + obj2[each]);
}

// 3. Arrays in objects
console.log('-----');

const obj3 = {
  meals: ['breakfast', 'second breakfast', 'elevenses', 'lunch', 'afternoon tea', 'dinner', 'supper'],
};

console.log(obj3.meals[3]);

// 4. Arrys of objects
console.log('-----');

const obj4 = {
  name: 'Bob',
  jobTitle: 'Cook',
};

const obj5 = {
  name: 'Sally',
  jobTitle: 'Waitress',
};

const obj6 = {
  name: 'Ted',
  jobTitle: 'Manager',
};

const restaurantArray = [obj4, obj5, obj6];

restaurantArray.map((object) => console.log(`${object.name} is a ${object.jobTitle}.`));

// 5. Properties that aren't there
console.log('-----');

restaurantArray.map((object) => {
  if (object.name !== 'Ted') {
    object.boss = 'Ted';
    console.log(`${object.jobTitle} ${object.name} reports to ${object.boss}.`);
  } else if (object.name === 'Ted') {
    console.log(`${object.jobTitle} ${object.name} doesn't report to anybody.`);
  }
});

// 6. Cracking the code
const cipher = {
  a: 2,
  b: 3,
  c: 4,
  d: 5,
};

function decode(encodedWord) {
  let decodedCharNum = null; 
  const letterToCheck = encodedWord[0];
  if (cipher[letterToCheck]) {
    decodedCharNum = cipher[letterToCheck];
    return encodedWord[decodedCharNum - 1];
  } else {
    return ' ';
  }
}

console.log(decode('cycle'));

function decodeWords(stringOfWords) {
  let splitWords = stringOfWords.split(' ');
  let decodedLetters = splitWords.map((word) => decode(word));
  return decodedLetters.join('');
}

console.log(decodeWords('cycle eeeee cycle'));
// 7. Factory Function with LOTR
console.log('-----');

function createCharacter(name, nickname, race, origin, attack, defense) {
  return {
    'name': name, 
    'nickname': nickname, 
    'race': race, 
    'origin': origin, 
    'attack': attack , 
    'defense': defense,
    describe() {
      return `${this.name} is a ${this.race} from ${this.origin}`;
    },
    evaluateFight(otherChar) {
      let myDamage = 0;
      let otherDamage = 0;
      if (otherChar.defense < this.attack) {
        otherDamage = this.attack - otherChar.defense;
      } else if (otherChar.defense > this.attack) {
        otherDamage = 0;
      }

      if (this.defense < otherChar.attack) {
        myDamage = otherChar.attack - this.defense;
      } else if (this.defense > otherChar.attack) {
        myDamage = 0;
      }

      return `Your opponent takes ${otherDamage} damage and you receive ${myDamage} damage`;
    }
  };
}

const charArrLOTR = [
  createCharacter('Gandalf the White', 'gandalf', 'Wizard', 'Middle Earth', 10, 6),
  createCharacter('Bilbo Baggins', 'bilbo', 'Hobbit', 'The Shire', 2, 1),
  createCharacter('Frodo Baggins', 'frodo', 'Hobbit', 'The Shire', 3, 2),
  createCharacter('Aragorn son of Arathorn', 'aragorn', 'Man', 'Dunnedain', 6, 8),
  createCharacter('Legolas', 'legolas', 'Elf', 'Woodland Realm', 8, 5),
];

charArrLOTR.push(createCharacter('Arwen Undomiel', 'arwen', 'Elf', 'Rivendale', 5, 8));

console.log(charArrLOTR.find((char) => char.nickname === 'aragorn').describe());

const hobbits = charArrLOTR.filter((char) => char.race === 'Hobbit');
console.log(hobbits);

const attackAbove5 = charArrLOTR.filter((char) => char.attack > 5);
console.log(attackAbove5);

function addWeapon(nickname, weapon) {
  const char = charArrLOTR.find((char) => char.nickname === nickname);
  char.weapon = weapon;
  char.describe = function() {
    return `${this.name} is a ${this.race} from ${this.origin} who uses ${this.weapon}`;
  };
  return char.describe();
}



console.log(addWeapon('bilbo', 'the Ring'));
addWeapon('gandalf', 'wizard staff');
addWeapon('frodo', 'Barrow Blade');
addWeapon('aragorn', 'the Ring');
addWeapon('legolas', 'Bow and Arrow');
addWeapon('arwen', 'Hadhafang');
console.log(charArrLOTR.map((char) => console.log(char.describe())));

// 8. BONUS: A Database Search
console.log('-----');

const HEROES = [
  { id: 1, name: 'Captain America', squad: 'Avengers' },
  { id: 2, name: 'Iron Man', squad: 'Avengers' },
  { id: 3, name: 'Spiderman', squad: 'Avengers' },
  { id: 4, name: 'Superman', squad: 'Justice League' },
  { id: 5, name: 'Wonder Woman', squad: 'Justice League' },
  { id: 6, name: 'Aquaman', squad: 'Justice League' },
  { id: 7, name: 'Hulk', squad: 'Avengers' },
];

const findOne = (arr, query) => {
  let totalParam = 0;

  for (const param in query) {
    totalParam++;
  }

  arr.forEach((hero) => {
    hero.matching = 0;
    for (const param in query) {
      if (query[param] === hero[param]) {
        hero.matching += 1;
      }
    }
  });

  let matchingHero = arr.find((hero) => hero.matching === totalParam);

  if (matchingHero === undefined) {
    return null;
  } else {
    delete matchingHero.matching;
    return matchingHero;
  }
};


console.log(findOne(HEROES, { id: 2, name: 'Aquaman' }));


// 8a. BONUS: A Database Method]
const Database = {
  store: {
    heroes: [
      { id: 1, name: 'Captain America', squad: 'Avengers' },
      { id: 2, name: 'Iron Man', squad: 'Avengers' },
      { id: 3, name: 'Spiderman', squad: 'Avengers' },
      { id: 4, name: 'Superman', squad: 'Justice League' },
      { id: 5, name: 'Wonder Woman', squad: 'Justice League' },
      { id: 6, name: 'Aquaman', squad: 'Justice League' },
      { id: 7, name: 'Hulk', squad: 'Avengers' },
    ]
  },
  findOne(query) {
    let totalParam = 0;
    const arr = this.store.heroes;
  
    for (const param in query) {
      totalParam++;
    }
  
    arr.forEach((hero) => {
      hero.matching = 0;
      for (const param in query) {
        if (query[param] === hero[param]) {
          hero.matching += 1;
        }
      }
    });
  
    let matchingHero = arr.find((hero) => hero.matching === totalParam);
  
    if (matchingHero === undefined) {
      return null;
    } else {
      delete matchingHero.matching;
      return matchingHero;
    }
  },
};

console.log(Database.findOne({ id: 2 }));