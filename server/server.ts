import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import { priorities } from './data'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3001

app.get('/priorities', (req: Request, res: Response) => {
  res.status(200).json({ priorities })
})

app.listen(port)
