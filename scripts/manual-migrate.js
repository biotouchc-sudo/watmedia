const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function migrate() {
    const sql = neon(process.env.DATABASE_URL);

    console.log('🚀 Starting full manual schema migration...');

    try {
        // 1. Users Table
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        role TEXT DEFAULT 'user' NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        metadata JSONB
      )
    `;
        console.log('✅ Users table established.');

        // 2. Content Nodes Table
        await sql`
      CREATE TABLE IF NOT EXISTS content_nodes (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL UNIQUE,
        type TEXT NOT NULL,
        title TEXT NOT NULL,
        body_md TEXT NOT NULL,
        metadata JSONB,
        author_id TEXT REFERENCES users(id),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
        console.log('✅ Content Nodes table established.');

        // 3. Projects Table
        await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        service TEXT NOT NULL,
        status TEXT DEFAULT 'PENDING' NOT NULL,
        progress TEXT DEFAULT '0' NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id),
        start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        due_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
        console.log('✅ Projects table established.');

        // 4. Invoices Table
        await sql`
      CREATE TABLE IF NOT EXISTS invoices (
        id TEXT PRIMARY KEY,
        description TEXT NOT NULL,
        amount TEXT NOT NULL,
        status TEXT DEFAULT 'UNPAID' NOT NULL,
        user_id TEXT NOT NULL REFERENCES users(id),
        project_id TEXT REFERENCES projects(id),
        date TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
      )
    `;
        console.log('✅ Invoices table established.');

        console.log('⭐ DATABASE SYNC COMPLETE.');

    } catch (error) {
        console.error('❌ Migration failed:', error);
    }
}

migrate();
