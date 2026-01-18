'use server'

import { db } from "@/db";
import { contentNodes, NewContentNode } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// --- VALIDATION SCHEMAS ---
const createContentSchema = z.object({
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slugs must be kebab-case"),
  title: z.string().min(5),
  type: z.enum(['ARTICLE', 'SERVICE', 'PRODUCT']),
  bodyMd: z.string().min(10),
});

// --- ACTIONS ---

export async function createContentNode(formData: FormData) {
  // 1. Auth Gate
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized. Please sign in.");
  }

  // 2. Validation Gate
  const validatedFields = createContentSchema.safeParse({
    slug: formData.get('slug'),
    title: formData.get('title'),
    type: formData.get('type'),
    bodyMd: formData.get('description'),
  });

  if (!validatedFields.success) {
    throw new Error("Validation failed: " + JSON.stringify(validatedFields.error.flatten().fieldErrors));
  }

  // 3. Execution
  try {
    await db.insert(contentNodes).values({
      ...validatedFields.data,
      authorId: userId,
    } as NewContentNode);
    
    revalidatePath('/dashboard');
  } catch (error) {
    console.error("DB Error:", error);
    throw new Error("Database Error: Failed to create content.");
  }
}
