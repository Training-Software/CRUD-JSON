const fs = require("fs");

const getItems = () => {
  let chars = fs.readFileSync("./chars.json", "utf8");
  chars = JSON.parse(chars);
  return chars;
};

const showHeros = () => {
  let heroes = getItems();
  console.log("List Heroes : ");
  heroes.forEach((hero, i) => {
    const { id, name, hp, type, isSelected } = hero;
    if (isSelected === true) {
      console.log(`${id}.[X] ${name} adalah tipe hero ${type}`);
    } else {
      console.log(`${id}.[ ] ${name} adalah tipe hero ${type}`);
    }
  });
};

const addHero = (name, hp, type) => {
  let heroes = getItems();
  let id = heroes[heroes.length - 1].id + 1;
  let isSelected = false;

  heroes.push({
    id,
    name,
    hp,
    type,
    isSelected,
  });
  save(heroes);
};

const deleteHero = (id) => {
  let heroes = getItems();
  heroes = heroes.filter((hero) => hero.id !== id);
  save(heroes);
  console.log(`id number ${id} has been deleted from items`);
};

const save = (data) => {
  let dataString = JSON.stringify(data, null, 2);
  fs.writeFileSync("./chars.json", dataString);
};

const selectHero = (id, selected) => {
  let heroes = getItems();
  heroes = heroes.map((hero) => {
    if (hero.id === id) {
      if (selected === 1) {
        hero.isSelected = true;
      } else {
        hero.isSelected = false;
      }
    }
    return hero;
  });
  save(heroes);
  console.log(`id number ${id} has been selected from items`);
};

// deleteHero(7);
selectHero(3, 1);
showHeros();

// console.log('//////////////////////////')
// addHero('brody',100,'ranged')