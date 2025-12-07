import { findAllUsers, findUserById, createUser, updateUser,verifyCredentials} from '../services/users.services.js';

export const getUsuarios = (req, res) => {
    try {
        const usuarios = findAllUsers();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios: ' + error.message });
    }
};

export const getUsuarioById = (req, res) => {
    try {
        const { id } = req.params;
        const usuario = findUserById(id);
        if (usuario) {
            res.status(200).json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario: ' + error.message });
        return;
    }
    
};  

export const createUsuario = async  (req, res) => {
    try {
        const nuevoUsuario = await createUser(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear el usuario: ' + error.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        usuarioActualizado = await updateUser(req.params.id, req.body);
        if (usuarioActualizado) {
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el usuario: ' + error.message });
    }
};

export const loginUser = async (req,res) => {
    try {
        const { email, password } = req.body;
        const usuario = await verifyCredentials(email, password);
        res.status(200).json({msj: "Login exitoso", usuario});
    } catch (error) {
        res.status(401).json({ message: 'Error de autenticación: ' + error.message });
    }

}