
const fs = require('fs');
const path = require('path');

const getItemsFromDb = () => {
  const dbPath = path.join(__dirname, "../", "db.json");
  try {
    const items = fs.readFileSync(dbPath, "utf-8");
    return JSON.parse(items);
  } catch (err) {
    console.error(err.message);
    return [];
  }
};

const addItemToDb = (item) => {
  const items = getItemsFromDb();
  const itemExists = items.find((existingItem) => existingItem.id === item.id);

  if (!itemExists) {
    items.push(item);
    fs.writeFileSync("db.json", JSON.stringify(items));
    return true;
  } else {
    return false;
  }
};

module.exports = {
  addItemToDb,
}