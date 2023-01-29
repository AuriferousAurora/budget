import { parse } from 'csv-parse'
import * as fs from 'fs'
import * as path from 'path'

type Transaction = {
    id: string,
    date: string,
    description: string,
    amount: number
}

const filePath = path.resolve(__dirname, 'data/2022-checking-account-transactions.csv')
const headers = ['date', 'amount', 'description']
const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8'})

let transactions: Array<Transaction> = []


parse(fileContent, { delimiter: ',', columns: headers }, (error, result: Transaction[]) => {
    if (error) {
        console.error(error);
    }
    const l = Object.getOwnPropertyNames(result).length - 1
    const ids = [...Array(l).keys()]
    for (let i = 0; i < l; i++) {
        // todo: add uuid generation for ids
        let transcation: Transaction = {
            id: ids[i].toString(),
            amount: result[i].amount,
            date: result[i].date,
            description: result[i].description
        }
        transactions.push(transcation)
    }
    console.log(transactions[0])
})



