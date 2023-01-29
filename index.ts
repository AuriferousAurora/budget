import { Guid } from 'guid-typescript'
import { parse } from 'csv-parse'
import * as fs from 'fs'
import * as path from 'path'

type Transaction = {
    id: string,
    date: string,
    description: string,
    amount: number
}

// todo: remove path hardcoding-- update parseTransactionFile to handle array of files
const filePath = path.resolve(__dirname, 'data/2022-checking-account-transactions.csv')
const headers = ['date', 'amount', 'description']
const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

const parseTransactionFile = async (fc: string) => {
    const parser = parse(fc, { delimiter: ',', columns: headers })
    let transactions: Transaction[] = []

    for await (const record of parser) {
        let transcation: Transaction = {
            id: Guid.create().toString(),
            amount: record.amount,
            date: record.date,
            description: record.description
        }
        transactions.push(transcation)
    }

    return transactions
}

(async() => {
    const transcations = await parseTransactionFile(fileContent)
    transcations.forEach(t => console.log(t))
})()


