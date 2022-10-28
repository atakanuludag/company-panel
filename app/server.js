const express = require('express')
const app = express()
const port = process.env.PORT || 8181

app.use(express.static('build'))

app.get('/', (req, res) => {
  try {
    const file = path.join(__dirname, 'build', 'index.html')
    res.sendFile(file)
  } catch (err) {
    console.log(`Build folder not found.`)
    res.write('<p>Build folder not found.</p>')
    res.end()
  }
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
