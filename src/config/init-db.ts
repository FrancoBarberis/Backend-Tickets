import { pool } from './database.js';

const initDb = async () => {
  try {
    console.log('Iniciando la creación de tablas...');

    // 1. Crear ENUMs para los estados y prioridades si no existen
    // Nota: en PostgreSQL, "CREATE TYPE IF NOT EXISTS" no existe de forma simple para ENUMs antes de PG 12,
    // pero podemos crear un bloque anónimo o usar una consulta. Asumimos PG 12+ o simplemente lo creamos si no choca.
    const createEnums = `
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_state') THEN
          CREATE TYPE ticket_state AS ENUM ('NEW', 'IN_PROGRESS', 'ON_HOLD', 'RESOLVED', 'CLOSED', 'CANCELED');
        END IF;
        
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_priority') THEN
          CREATE TYPE ticket_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');
        END IF;
      END
      $$;
    `;
    await pool.query(createEnums);
    console.log('✅ Tipos ENUM creados o verificados.');

    // 2. Crear tabla de Usuarios (básica, ya que el modelo user.model.ts está vacío pero se referencia en tickets)
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createUsersTable);
    console.log('✅ Tabla "users" creada.');

    // 3. Crear tabla de Tickets (basado en ticket.model.ts)
    const createTicketsTable = `
      CREATE TABLE IF NOT EXISTS tickets (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        short_description VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        state ticket_state NOT NULL DEFAULT 'NEW',
        priority ticket_priority NOT NULL DEFAULT 'MEDIUM',
        requester_id UUID REFERENCES users(id) ON DELETE SET NULL,
        assignee_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTicketsTable);
    console.log('✅ Tabla "tickets" creada.');

    // 4. Crear tabla de Comments (basado en ticket.comments.model.ts)
    const createCommentsTable = `
      CREATE TABLE IF NOT EXISTS comments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        author_id UUID REFERENCES users(id) ON DELETE SET NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createCommentsTable);
    console.log('✅ Tabla "comments" creada.');

    console.log('🎉 Todas las tablas se crearon correctamente.');
  } catch (error) {
    console.error('❌ Error al crear las tablas:', error);
  } finally {
    // Cerramos la conexión para que el script pueda terminar
    await pool.end();
  }
};

initDb();
