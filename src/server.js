import express from 'express';
import sql from 'mssql';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
    user: 'group8',
    password: 'Zxcqwe123!!',
    server: 'weathergroup8.database.windows.net/',
    database: 'weather8',
    options: {
        encrypt: true,
        trustServerCertificate: true,
        connectTimeout: 30000,
    },
};

// Test the connection
async function testDatabaseConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Database connected successfully!');
        pool.close(); // Close the connection after testing
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

testDatabaseConnection();

// API endpoint to fetch weather data based on location
app.get('/weather', async (req, res) => {
    console.log('Weather endpoint accessed');
    const { location } = req.query; // Получаем местоположение из параметра запроса
    console.log(`Backend: Location parameter is ${location}`);
    let deviceId;


    // Определяем device_id на основе переданного местоположения
    switch (location) {
        case 'Enschede':
            console.log('Matched case: Enschede');
            deviceId = 'lht-saxion';
            break;
        case 'Wierden':
            console.log('Matched case: Wierden');
            deviceId = 'lht-wierden';
            break;
        case 'Gronau':
            console.log('Matched case: Gronau');
            deviceId = 'lht-gronau';
            break;
        case 'Lora':
            console.log('Matched case: Lora');
            deviceId = 'lora';
            break;
        default:
            return res.status(400).json({ error: 'Invalid location' });
    }


    try {
        const pool = await sql.connect(dbConfig);

        const query = `
            SELECT TOP 1
                    um.device_id,
                    um.message_id,
                   lht.battery_voltage,
                   lht.battery_status,
                   lht.illumination,
                   lht.humidity,
                   lht.temperature,
                   rx.rssi
            FROM [wet].[uplink_messages] um
                LEFT JOIN [wet].[lht_data] lht
            ON um.message_id = lht.message_id
                LEFT JOIN [wet].[rx_metadata] rx
                ON um.message_id = rx.message_id
            WHERE um.device_id = @deviceId
            ORDER BY um.message_id DESC;

        `;

        const result = await pool.request()
            .input('deviceId', sql.NVarChar, deviceId) // Указываем device_id как параметр
            .query(query);

        res.json(result.recordset); // Возвращаем результат
        pool.close();
    } catch (err) {
        console.error('Ошибка запроса:', err.message);
        res.status(500).send('Ошибка сервера при получении данных о погоде');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is hosting on http://localhost:${PORT}`);
});
