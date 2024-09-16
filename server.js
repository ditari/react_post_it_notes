import express from "express";
import cors from 'cors';
import mysql from "mysql2/promise";

const app = express();
const port = 5174;

app.use(cors());

app.use(express.json());

app.listen(port, () => {
    console.log(`API server running on http://localhost:${port}`);
});

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "TestDatabase",
  });

  app.get('/notes', async (req, res) => {
    let query = `SELECT * FROM post_it_notes;`;
    try {
      const [results, fields] = await connection.query(query);
      res.json(results);  // Send the results back to the client
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching notes from database" });  // Send error response
    }
  });
  
  app.get('/deletenote/:id', async (req, res) => {
    const id = req.params.id;
    let query = `DELETE FROM post_it_notes WHERE id = ${id} ` ;
    try {
      const [results, fields] = await connection.query(query);
      
      res.json(results);  // Send the results back to the client
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching notes from database" });  // Send error response
    }
    
   });

   app.post('/addnote', async (req, res) => {
    const newNote = req.body; // Extract new note data from the request body
    let title = newNote.title;
    let notes= newNote.notes;

    let query = `INSERT INTO post_it_notes (title, notes) 
    VALUES ('${title}', '${notes}');`

    try {
      const [results, fields] = await connection.query(query);
      let insertid = results.insertId;

      const responseObject = {
        id: insertid,
        title: title,
        notes: notes,
      };

      res.json(responseObject);  // Send the results back to the client
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching notes from database" });  // Send error response
    }

    });

    app.post('/editnote/:id', async (req, res) => {
      const id = req.params.id;
      const newNote = req.body; 
      let title = newNote.title;
      let notes= newNote.notes;

      let query = `UPDATE post_it_notes SET title = '${title}', notes = '${notes}' WHERE id = ${id};`
      try {
        const [results, fields] = await connection.query(query);
        //let insertid = results.insertId;
        //console.log(results);

        const responseObject = {
          id: id,
          title: title,
          notes: notes,
        };
  
        res.json(responseObject);  // Send the results back to the client
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching notes from database" });  // Send error response
      }

  
      });
  