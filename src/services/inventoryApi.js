const STORAGE_KEY = "inventory_items";

const initialInventory = [
  {
    id: crypto.randomUUID(),
    inventory_name: "Зелений чай Сенча",
    description: "Японський зелений чай з ніжним трав’янистим смаком та легкою свіжістю. Ідеально підходить для щоденного вживання.",
    photo: "https://tea-puer.com.ua/image/1%20photo%20card/Zelenyj%20chaj%20Sencha%20Makoto%20-%20100%20g/Zelenyj%20chaj%20Sencha%20Makoto%20-%20100%20g.jpg?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: crypto.randomUUID(),
    inventory_name: "Чорний чай Ассам",
    description: "Насичений чорний чай з Індії з міцним смаком та легкими солодовими нотками. Добре поєднується з молоком.",
    photo: "https://svit-chaju.ua/content/images/20/850x850l80mc0/chernyy-chay-assam-dayrial-93019558869997.jpg?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: crypto.randomUUID(),
    inventory_name: "Ромашковий чай",
    description: "Трав’яний чай з ромашки з м’яким заспокійливим ефектом. Ідеальний для вечірнього відпочинку.",
    photo: "https://t-coffee.com.ua/image/cache/catalog/image/data/news/news_2/romashka3.webp?auto=format&fit=crop&w=500&q=80"
  }
];

function loadInventory() {
  //localStorage.removeItem(STORAGE_KEY);
  
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInventory));
    return initialInventory;
  }

  return JSON.parse(stored);
}

function saveInventory(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function delay(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 400);
  });
}

export async function getInventory() {
  return delay(loadInventory());
}

export async function getInventoryById(id) {
  const items = loadInventory();
  const item = items.find((entry) => entry.id === id);

  if (!item) {
    throw new Error("Item not found");
  }

  return delay(item);
}

export async function createInventory({ inventory_name, description, photo }) {
  const items = loadInventory();

  const newItem = {
    id: crypto.randomUUID(),
    inventory_name,
    description,
    photo,
  };

  const updated = [newItem, ...items];
  saveInventory(updated);

  return delay(newItem);
}

export async function updateInventory(id, data) {
  const items = loadInventory();

  const updated = items.map((item) =>
    item.id === id ? { ...item, ...data } : item
  );

  saveInventory(updated);
  return delay(updated.find((item) => item.id === id));
}

export async function updateInventoryPhoto(id, photo) {
  const items = loadInventory();

  const updated = items.map((item) =>
    item.id === id ? { ...item, photo } : item
  );

  saveInventory(updated);
  return delay(updated.find((item) => item.id === id));
}

export async function deleteInventory(id) {
  const items = loadInventory();
  const updated = items.filter((item) => item.id !== id);

  saveInventory(updated);
  return delay(true);
}