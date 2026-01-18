import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Changed to text to store Clerk ID (user_xyz)
  email: text("email").notNull().unique(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  metadata: jsonb("metadata"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const contentNodes = pgTable("content_nodes", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()), // Keep UUID for content, but as text storage if needed, or just standard UUID
  slug: text("slug").notNull().unique(),
  type: text("type").notNull(), // 'ARTICLE', 'SERVICE', etc.
  title: text("title").notNull(),
  bodyMd: text("body_md").notNull(),
  metadata: jsonb("metadata"),
  authorId: text("author_id").references(() => users.id), // Changed to text to match users.id
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type ContentNode = typeof contentNodes.$inferSelect;
export type NewContentNode = typeof contentNodes.$inferInsert;

export const projects = pgTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  service: text("service").notNull(), // 'ARCHITECT_CORE', etc.
  status: text("status").default("PENDING").notNull(), // 'PENDING', 'IN_PROGRESS', 'COMPLETED'
  progress: text("progress").default("0").notNull(),
  userId: text("user_id").references(() => users.id).notNull(),
  startDate: timestamp("start_date").defaultNow(),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const invoices = pgTable("invoices", {
  id: text("id").primaryKey().$defaultFn(() => `INV-${Math.floor(Math.random() * 9000) + 1000}`),
  description: text("description").notNull(),
  amount: text("amount").notNull(),
  status: text("status").default("UNPAID").notNull(), // 'UNPAID', 'PAID', 'CANCELLED'
  userId: text("user_id").references(() => users.id).notNull(),
  projectId: text("project_id").references(() => projects.id),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
