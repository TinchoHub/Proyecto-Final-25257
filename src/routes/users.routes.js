import {Router} from 'express';
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, loginUser} from '../controllers/users.controllers.js';
import { atuhHeaders, soloAdmins } from '../middlewares/auth.js';

const router = Router();


router.get('/', getUsuarios);

router.get('/:id', getUsuarioById);

router.post('/', atuhHeaders, soloAdmins, createUsuario);

router.post('/login', loginUser);

router.put('/:id', updateUsuario);

router.delete('/', (req, res) => {
    res.send('Hola desde el delete');
});

export default router;