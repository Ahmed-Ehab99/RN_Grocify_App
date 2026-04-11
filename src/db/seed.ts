import "dotenv/config";
import crypto from "node:crypto";
import { db } from "./client";
import { groceryItems } from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is required. Example: DATABASE_URL=... npm run seed"
  );
}

const seedItems = [
  {
    name: "Bananas",
    category: "Produce",
    quantity: 6,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Avocado",
    category: "Produce",
    quantity: 3,
    priority: "high",
    purchased: false,
  },
  {
    name: "Greek Yogurt",
    category: "Dairy",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Cheddar Cheese",
    category: "Dairy",
    quantity: 1,
    priority: "low",
    purchased: false,
  },
  {
    name: "Sourdough Bread",
    category: "Bakery",
    quantity: 1,
    priority: "high",
    purchased: false,
  },
  {
    name: "Pasta",
    category: "Pantry",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Tomato Sauce",
    category: "Pantry",
    quantity: 2,
    priority: "medium",
    purchased: true,
  },
  {
    name: "Granola Bars",
    category: "Snacks",
    quantity: 5,
    priority: "medium",
    purchased: false,
  },
  {
    name: "Dark Chocolate",
    category: "Snacks",
    quantity: 2,
    priority: "low",
    purchased: false,
  },
  {
    name: "Eggs",
    category: "Dairy",
    quantity: 12,
    priority: "high",
    purchased: false,
  },
];

async function seed() {
  console.log("Seeding grocery items...");

  await db.delete(groceryItems);

  await db.insert(groceryItems).values(
    seedItems.map((item) => ({
      id: crypto.randomUUID(),
      ...item,
      updated_at: Date.now(),
    }))
  );

  console.log(`Seed complete: inserted ${seedItems.length} grocery items.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
