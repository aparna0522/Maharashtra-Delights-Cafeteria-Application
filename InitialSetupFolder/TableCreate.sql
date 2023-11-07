CREATE TABLE "customers" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "password_digest" TEXT NOT NULL,
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL
);

CREATE TABLE "menu_cards" (
  "name" TEXT PRIMARY KEY,
  "category" TEXT NOT NULL,
  "description" TEXT,
  "price" REAL NOT NULL,
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL
);

CREATE TABLE "order_items" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "order_id" INTEGER,
  "name" TEXT,
  "quantity" INTEGER,
  "price" DECIMAL(10, 2),
  FOREIGN KEY ("order_id") REFERENCES "orders" ("id")
);

CREATE TABLE "orders" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "order_id" TEXT NOT NULL,
  "user_id" INTEGER NOT NULL,
  "total_amount" DECIMAL(10, 2) NOT NULL,
  "created_at" DATETIME NOT NULL,
  "updated_at" DATETIME NOT NULL
);
