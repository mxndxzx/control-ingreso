const { Pool, Client } =  require("pg");

const credentials = {
    user: "postgres",
    host: "localhost",
    database: "ingreso",
    password: "jazzbass",
    port: 5432,
};

async function poolDemo() {
    const pool = new Pool(credentials);
    const now = await pool.query("SELECT * FROM ingreso.ingreso");
    await pool.end();

    return now;
}
  
// Connect with a client.
  
async function clientDemo() {
    const client = new Client(credentials);
    await client.connect();
    const now = await client.query("SELECT * FROM ingreso.ingreso");
    await client.end();
  
    return now;
}
  
// Use a self-calling function so we can use async / await.
  
(async () => {
    const poolResult = await poolDemo();
    console.log("Time with pool: " + poolResult.rows[0]['nombre']);
  
    const clientResult = await clientDemo();
    console.log("Time with client: " + clientResult.rows[0]['numero_dni']);
})();