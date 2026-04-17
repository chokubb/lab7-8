const STORAGE_KEY = "inventory_items";

const initialInventory = [
  {
    id: crypto.randomUUID(),
    inventory_name: "Керамічна кружка",
    description: "Світла керамічна кружка для щоденного використання.",
    photo: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: crypto.randomUUID(),
    inventory_name: "Настільна лампа",
    description: "Компактна лампа для робочого столу з м’яким світлом.",
    photo: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: crypto.randomUUID(),
    inventory_name: "Блокнот",
    description: "Щоденник для записів і планування.",
    photo: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=500&q=80",
  },
];

function loadInventory() {
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