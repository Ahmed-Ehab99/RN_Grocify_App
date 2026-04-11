import { desc, eq } from "drizzle-orm";
import { db } from "./client";
import { groceryItems } from "./schema";

// GET Items
export const listGroceryItems = async () => {
  const rows = await db
    .select()
    .from(groceryItems)
    .orderBy(desc(groceryItems.updated_at));

  return rows;
};

// POST Item
export const createGroceryItem = async (input: {
  name: string;
  category: string;
  quantity: number;
  priority: string;
}) => {
  const rows = await db
    .insert(groceryItems)
    .values({
      id: crypto.randomUUID(),
      name: input.name,
      category: input.category,
      quantity: Math.max(1, input.quantity),
      purchased: false,
      priority: input.priority,
      updated_at: Date.now(),
    })
    .returning();

  return rows[0];
};

// PATCH Item Purchase Status
export const setGroceryItemPurchased = async (
  id: string,
  purchased: boolean
) => {
  const rows = await db
    .update(groceryItems)
    .set({ purchased, updated_at: Date.now() })
    .where(eq(groceryItems.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

// PATCH Item Quantity
export const updateGroceryItemQuantity = async (
  id: string,
  quantity: number
) => {
  const rows = await db
    .update(groceryItems)
    .set({
      quantity: Math.max(1, Math.floor(quantity)),
      updated_at: Date.now(),
    })
    .where(eq(groceryItems.id, id))
    .returning();

  if (!rows.length) return null;
  return rows[0];
};

// DELETE Item
export const deleteGroceryItem = async (id: string) => {
  await db.delete(groceryItems).where(eq(groceryItems.id, id));
};

// DELETE Items
export const clearPurchasedItems = async () => {
  await db.delete(groceryItems).where(eq(groceryItems.purchased, true));
};
