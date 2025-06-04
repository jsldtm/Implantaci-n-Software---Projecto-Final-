/**
 * MySQL Connection Pool Advanced - FindItAll Project
 * Código por Joaquín Saldarriaga
 * Fecha - 3 de mayo de 2025
 * 
 * Implementación de pool de conexiones MySQL avanzado con configuración empresarial
 * para alta concurrencia y rendimiento optimizado en sistemas de comercio electrónico.
 */

// Importamos la librería mysql2 que nos permite conectarnos a MySQL de forma moderna
const mysql = require('mysql2/promise');
// Importamos nuestra configuración centralizada
const config = require('./config');

// Clase principal para manejar el pool de conexiones a la base de datos
class MySQLConnectionPool {
    constructor() {
        // Aquí guardamos el pool de conexiones una vez que se cree
        this.pool = null;
        // Flag para saber si ya inicializamos el pool
        this.isInitialized = false;
    }    /**
     * Inicializa el pool de conexiones con configuración avanzada
     */
    async initialize() {
        try {
            // Creamos el pool con todas las configuraciones necesarias
            this.pool = mysql.createPool({
                // Datos básicos para conectarse a la base de datos
                host: config.database.host,
                port: config.database.port,
                user: config.database.user,
                password: config.database.password,
                database: config.database.name,
                
                // Configuraciones importantes para el rendimiento
                connectionLimit: 20,         // Máximo 20 conexiones al mismo tiempo
                queueLimit: 50,              // Máximo 50 consultas esperando
                acquireTimeout: 30000,       // 30 segundos para conseguir una conexión
                timeout: 60000,              // 60 segundos máximo para cada consulta
                reconnect: true,             // Se reconecta automáticamente si se pierde la conexión
                
                // Configuraciones de seguridad
                ssl: false,                  // SSL deshabilitado para desarrollo local
                multipleStatements: false,   // Evita inyecciones SQL peligrosas
                typeCast: true,              // Convierte automáticamente los tipos de datos
                
                // Configuración de caracteres para acentos y emojis
                charset: 'utf8mb4',
                
                // Para manejar números muy grandes sin perder precisión
                supportBigNumbers: true,
                bigNumberStrings: true,
                
                // Mantener la conexión viva
                enableKeepAlive: true,
                keepAliveInitialDelay: 0
            });

            // Probamos que la conexión funcione correctamente
            const connection = await this.pool.getConnection();
            await connection.ping(); // Enviamos un 'ping' a la base de datos
            connection.release(); // Liberamos la conexión para que otros la usen
            
            // Marcamos como inicializado y mostramos mensaje de éxito
            this.isInitialized = true;
            console.log('✅ MySQL Connection Pool inicializado correctamente');
            console.log(`📊 Configuración: ${config.database.host}:${config.database.port}`);
            
        } catch (error) {
            // Si algo sale mal, mostramos el error y lo lanzamos para que se maneje arriba
            console.error('❌ Error inicializando MySQL Connection Pool:', error.message);
            throw error;
        }
    }    /**
     * Obtiene una conexión del pool
     */
    async getConnection() {
        // Si no hemos inicializado el pool, lo hacemos ahora
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        try {
            // Pedimos una conexión del pool
            const connection = await this.pool.getConnection();
            return connection;
        } catch (error) {
            // Si no podemos obtener una conexión, mostramos error
            console.error('❌ Error obteniendo conexión del pool:', error.message);
            throw error;
        }
    }

    /**
     * Ejecuta una query con manejo automático de conexiones
     */
    async execute(query, params = []) {
        let connection; // Variable para guardar la conexión
        try {
            // Obtenemos una conexión del pool
            connection = await this.getConnection();
            // Ejecutamos la consulta con los parámetros (esto es seguro contra inyección SQL)
            const [results] = await connection.execute(query, params);
            return results; // Devolvemos los resultados
        } catch (error) {
            // Si algo sale mal, mostramos el error
            console.error('❌ Error ejecutando query:', error.message);
            throw error;
        } finally {
            // SIEMPRE liberamos la conexión, pase lo que pase
            if (connection) {
                connection.release();
            }
        }
    }    /**
     * Ejecuta múltiples queries en una transacción
     */
    async executeTransaction(queries) {
        let connection; // Variable para la conexión
        try {
            // Obtenemos una conexión exclusiva para esta transacción
            connection = await this.getConnection();
            // Iniciamos la transacción (todo se ejecuta junto o nada)
            await connection.beginTransaction();
            
            const results = []; // Array para guardar todos los resultados
            // Ejecutamos cada query una por una
            for (const query of queries) {
                const [result] = await connection.execute(query.sql, query.params || []);
                results.push(result); // Guardamos el resultado
            }
            
            // Si todo salió bien, confirmamos los cambios
            await connection.commit();
            console.log('✅ Transacción completada exitosamente');
            return results;
            
        } catch (error) {
            // Si algo salió mal, deshacemos TODOS los cambios
            if (connection) {
                await connection.rollback();
                console.log('🔄 Transacción revertida');
            }
            console.error('❌ Error en transacción:', error.message);
            throw error;
        } finally {
            // Siempre liberamos la conexión
            if (connection) {
                connection.release();
            }
        }
    }    /**
     * Obtiene estadísticas del pool de conexiones
     */
    getPoolStats() {
        // Si no tenemos pool, no hay estadísticas
        if (!this.pool) {
            return null;
        }
        
        // Devolvemos información útil sobre el estado del pool
        return {
            totalConnections: this.pool.pool._allConnections.length,      // Total de conexiones creadas
            freeConnections: this.pool.pool._freeConnections.length,      // Conexiones disponibles
            queuedRequests: this.pool.pool._connectionQueue.length,       // Solicitudes esperando
            acquiringConnections: this.pool.pool._acquiringConnections.length // Conexiones siendo creadas
        };
    }

    /**
     * Verifica la salud del pool de conexiones
     */
    async healthCheck() {
        try {
            // Intentamos hacer una consulta simple para ver si todo funciona
            const connection = await this.getConnection();
            const [results] = await connection.execute('SELECT 1 as health_check');
            connection.release();
            
            // Obtenemos las estadísticas del pool
            const stats = this.getPoolStats();
            
            // Todo está bien, devolvemos estado saludable
            return {
                status: 'healthy',
                database: config.database.name,
                stats: stats,
                timestamp: new Date().toISOString()
            };
        } catch (error) {
            // Algo está mal, devolvemos estado no saludable
            return {
                status: 'unhealthy',
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }    /**
     * Cierra el pool de conexiones
     */
    async close() {
        try {
            // Si tenemos un pool activo, lo cerramos correctamente
            if (this.pool) {
                await this.pool.end();
                console.log('✅ MySQL Connection Pool cerrado correctamente');
            }
        } catch (error) {
            console.error('❌ Error cerrando pool:', error.message);
            throw error;
        }
    }
}

// Creamos una sola instancia que usaremos en toda la aplicación (patrón Singleton)
const connectionPool = new MySQLConnectionPool();

// Configuramos el cierre automático cuando la aplicación se cierre
// Esto es importante para no dejar conexiones abiertas
process.on('SIGINT', async () => {
    console.log('\n🔄 Cerrando aplicación...');
    await connectionPool.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('\n🔄 Cerrando aplicación...');
    await connectionPool.close();
    process.exit(0);
});

// Exportamos la instancia para que otros archivos la puedan usar
module.exports = connectionPool;

/**
 * Ejemplo de uso:
 * 
 * const pool = require('./mysql-connection-pool-advanced');
 * 
 * // Query simple
 * const products = await pool.execute('SELECT * FROM Products WHERE category_id = ?', [1]);
 * 
 * // Transacción
 * await pool.executeTransaction([
 *     { sql: 'INSERT INTO Orders (user_id, total) VALUES (?, ?)', params: [1, 299.99] },
 *     { sql: 'UPDATE Products SET is_in_stock = false WHERE product_id = ?', params: [123] }
 * ]);
 * 
 * // Health check
 * const health = await pool.healthCheck();
 * console.log('Pool status:', health);
 */
