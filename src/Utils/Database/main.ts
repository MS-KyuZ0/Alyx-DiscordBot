import Database from 'better-sqlite3'
import path from 'path'
import { defaultPrefix } from '../../../config.json'

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.prepare(`
    CREATE TABLE IF NOT EXISTS guildprefix (
        guild_id TEXT PRIMARY KEY,
        prefix TEXT NOT NULL DEFAULT '${defaultPrefix}'
    )
`).run();

export default db;