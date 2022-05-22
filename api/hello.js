import mysql from 'mysql2'
export default async function handler(request, response) {
    let c

    for (let i = 0; i < 3; i++) {
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
    for (let j = 0; j < 3; j++) {
        console.time('query')
        await new Promise((res, rej) =>
            c.execute(`SELECT 1`, (err) => {
                if (err) rej(err)
                else res()
            }),
        )
        console.timeEnd('query')
    }

    response.status(200).send(`Hello ${'sdfdsf'}!`)
}
