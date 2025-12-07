import bcrypt from 'bcryptjs';
import { leerBD } from '../db/db.js';

export async function atuhHeaders(req, res, next) {
    const {correo, password} = req.headers;
    if (!correo || !password) {
        return res.status(401).json({message: 'Faltan credenciales de autenticación'});
    }
    const db = leerBD();
    const users = db['usuarios'] || [];
    const user = users.find(u => u.email === correo);
    if (!user) {
        return res.status(401).json({message: 'Usuario no encontrado'});
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({message: 'Contraseña incorrecta'});
    }
    req.user = user;
    next();
}

export function soloAdmins(req, res, next) {
    if (req.user?.rol !== 'admin') {
        return res.status(403).json({message: 'Acceso denegado: solo administradores'});
    }
    next();
}   