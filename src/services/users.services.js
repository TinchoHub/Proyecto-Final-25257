import bcrypt from 'bcryptjs';
import { leerBD, guardarBD } from '../db/db.js';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config.js';
import { UserModel } from '../models/users.models.js';

const ruta = "usuarios";

/* const usuarios = [
    { id: 1, 
        nombre: 'Martín',
        email: 'martin@example.com',
        password: bcrypt.hashSync('pass1234', 10),
        rol: 'admin',
        ubicacion: 'Argentina',
        experiencia: "5 años"},
    { id: 2, 
        nombre: 'Ana',
        email: 'ana@example.com',
        password: bcrypt.hashSync('pass5678', 10),
        rol: 'user',
        ubicacion: 'Chile',
        experiencia: "3 años"},
    { id: 3, 
        nombre: 'Luis',
        email: 'luis@example.com',
        password: bcrypt.hashSync('pass91011', 10),
        rol: 'user',
        ubicacion: 'Peru',
        experiencia: "4 años"},
    { id: 4, 
        nombre: 'Sofia',
        email: 'sofia@example.com',
        password: bcrypt.hashSync('pass121314', 10),
        rol: 'user',
        ubicacion: 'Mexico',
        experiencia: "2 años"}
]; */

// export const findAllUsers = async () => {
//     return usuarios.map(u => {
//         const { password, ...resto } = u;
//         return resto;
//     }   
//     );
// }

export const findAllUsers = async () => { 
    //const bd = leerBD();
    //const users = bd[ruta] || [];
    //return users.map(({ password, ...resto }) => resto); 
    const snapshot = await getDocs(collection(db, ruta));  
    return snapshot.docs.map(doc => {
        const { password, ...resto } = doc.data();
        return new UserModel(doc.id, ...Object.values(resto));
    });

}

export const findUserById = (id) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const  user = users.find(u => u.id === parseInt(id)); 
    if (user) {
        const { password, ...resto } = user;
        return resto;
    }
    return null;
}  

export const createUser = async (userData) => {
    const bd = leerBD();
    const users = bd[ruta] || [];
    const { nombre, email, password, rol, ubicacion, experiencia } = userData;

    if(!nombre || !email || !password) {
        throw new Error('Faltan datos obligatorios (nombre, email, password)');
    }

    if (users.some(u => u.email === email)) {
        throw new Error('El email ya está registrado');
    }
 
    const hash = await bcrypt.hash(password, 10);

    const nuevoUsuario = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        nombre,
        email,
        password: hash,
        rol: rol || "no definido",
        ubicacion: ubicacion || "desconocida",
        experiencia: experiencia || "sin experiencia"
    };
    users.push(nuevoUsuario);
    bd[ruta] = users;
    guardarBD(bd);
    const { password: _, ...resto } = nuevoUsuario;
    return resto;
}

export async function updateUser(id, userData) {
    const db = leerBD();
    const users = db[ruta] || [];
    const usuarioIndex = users.findIndex(u => u.id === parseInt(id));
    if (usuarioIndex === -1) {
        return null;
    }
    let newpassword = userData.password;
    if (newpassword) {
        const hash = await bcrypt.hash(newpassword, 10);
        userData.password = hash;
    }
    const actualizado = {
        id: users[usuarioIndex].id,
        nombre: userData.nombre || users[usuarioIndex].nombre,
        email: userData.email || users[usuarioIndex].email,
        password: newpassword,
        rol: userData.rol || users[usuarioIndex].rol,
        ubicacion: userData.ubicacion || users[usuarioIndex].ubicacion,
        experiencia: userData.experiencia || users[usuarioIndex].experiencia
    };
    users[usuarioIndex] = actualizado;
    bd[ruta] = users;
    guardarBD(bd);
    const { password, ...resto } = actualizado;
    return resto;
}

export const verifyCredentials = async (email, pass) => {
    const bd = leerBD();
    const users = bd[ruta] || [];

    const usuario = users.find(u => u.email === email);
    if (!usuario) throw new Error('Email no encontrado');

    const isPasswordValid = await bcrypt.compare(pass, usuario.password);
    if (!isPasswordValid) throw new Error('Contraseña incorrecta');

    const { password: _, ...resto } = usuario;
    return resto;
}