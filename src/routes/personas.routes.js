import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/add', (req, res) => {
    res.render('personas/add');
});

//? Agregar o Crear Usuario
router.post('/add', async(req, res) =>{
    try {
        const {name, lastname, age} = req.body;
        const newPersona = {
            name, lastname, age
        }
        await pool.query('INSERT INTO personas SET ?', [newPersona]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//? Tabla de usuarios
router.get('/list', async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM personas');
        // console.log(result)
        res.render('personas/list', {personas: result});
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//? Editar usuario
router.get('/edit/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const [persona] = await pool.query('SELECT * FROM personas WHERE id = ?', [id]);
        const personaEdit = persona[0];
        res.render('personas/edit',{ persona: personaEdit });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

//? Actualizacion usuario
router.post('/edit/:id', async(req, res) => {
    try {
        const { name, lastname, age } = req.body;
        const { id } = req.params;
        const editPersona = { name, lastname, age }
        await pool.query('UPDATE personas SET ? WHERE id = ? ', [editPersona, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

router.get('/delete/:id', async(req, res) => {
    try {
        const {id} = req.params;
        await pool.query('DELETE FROM personas WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
})

export default router;