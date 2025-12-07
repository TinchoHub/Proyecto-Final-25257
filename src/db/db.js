import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, 'db.json');


export function leerBD(){
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error leyendo la base de datos:', error);
        return {};
    }
}

export function guardarBD(data){
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');}
    catch (error) {
        console.error('Error guardando la base de datos:', error);
    }   
}