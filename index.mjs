import 'dotenv/config'
import mysql from 'mysql2'

let c

for (let i = 0; i < 5; i++) {
    console.time('connect')
    await new Promise((res, rej) => {
        c = mysql.createConnection(process.env.DATABASE_URL)
        c.connect((err) => {
            if (err) rej(err)
            else res()
        })
    })
    console.timeEnd('connect')
}
for (let j = 0; j < 5; j++) {
    console.time('query')
    await new Promise((res, rej) =>
        c.execute(`SELECT 1`, (err) => {
            if (err) rej(err)
            else res()
        }),
    )
    console.timeEnd('query')
}

process.exit(0)
