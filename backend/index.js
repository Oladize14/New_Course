import express from 'express'
import dotenv from 'dotenv'
import cookiePerser from 'cookie-parser'
const app = express()
dotenv.config()

import connectDb from './Db/connectDb.js'

import AuthRouter  from './Routes/authRouter.js'

import cors from 'cors'
const PORT = process.env.PORT || 8080

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cookiePerser())
app.use(express.json())
app.use(cors({origin: "http://localhost:5173", credentials: true}))
app.use(requestLogger)

app.use('/auth', AuthRouter)


let notes = [
    {
      id: "1",
      content: "HTML is easy",
      important: true
    },
    {
      id: "2",
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: "3",
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]


  app.get('/notes', (req, res)=> {
    res.json(notes)
  })

  app.get('/notes/:id', (req, res) => {
    const id = req.params.id
    const data = notes.find(note => note.id === id)
    if (data) {
        res.json(data)
    } else {
        res.status(404).json({"error":`No such data with id: ${id}`})
    }
  })

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => Number(n.id)))
      : 0
    return String(maxId + 1)
  }
  
  app.post('/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

app.listen(PORT, ()=>{
  try {
    connectDb(process.env.MONGO_URI)
    console.log(`app listen on port ${PORT}`)
  } catch (error) {
    console.log('failed to start server')
  }
})