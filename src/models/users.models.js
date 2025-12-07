export class UserModel {
    constructor(id, nombre, email, rol = "no definido", ubicacion = "desconocida", experiencia = "sin experiencia") {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.ubicacion = ubicacion;
        this.experiencia = experiencia;
    }
}