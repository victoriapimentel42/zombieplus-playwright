const {Pool} = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus', 
    password: 'pwd123',
    port: 5432
}

export async function executeSQL(sqlScripty){

    try{
    const pool = new Pool(DbConfig)
    const client = await pool.connect()

    const result = await client.query(sqlScripty)
    console.log(result.rows)

    }catch(error){
        console.log('Erro ao executar sql' + error)
    }

    
}