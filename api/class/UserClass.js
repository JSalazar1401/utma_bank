//Registrarse el usuario
//Iniciar sesion
//Cerrar sesion
//Obtener informacion del usuario
//Borrar cuenta
//Actualizar

import UserModel from "../models/UserModel.js";
import ManagerAccount from "./AccountClass.js";
import ManagerCard from "./CardClass.js";

class ManagerUser {
    constructor(email, phone, name, lastName, isInSession, isAdmin, password) {
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.lastName = lastName;
        this.isInSession = isInSession;
        this.isAdmin = isAdmin;
        this.password = password;
    }

    async register() {
        try {
            const user = await UserModel.create({
                email: this.email,
                phone: this.phone,
                name: this.name,
                lastName: this.lastName,
                isInSession: this.isInSession,
                isAdmin: this.isAdmin,
                password: this.password,
            });
            const MA = new ManagerAccount(user._id, 12345, "Ahorro", 10000);
            const currentAccount = await MA.createAccount();
            const MC = new ManagerCard(user._id, currentAccount._id, "16digitos al azar", "debito", "De la fecha actual sumar 3 años", "Generar codigo de 3 cifras", "active");
            await MC.createCard();
            return user;
        } catch (error) {
            throw new Error(`Error al registrar usuario: ${error}`);
        }
    }

    async Login(email, password) {
        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                throw new Error("Usuario no registrado!")
            }
            if (user.password !== password) {
                throw new Error("Constraseña incorrecta!")
            }
            return "Succeeded";
        } catch (error) {
            throw new Error(`Error al iniciar sesion: ${error}`);
        }
    }

    async getUserInfo(id) {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw new Error(`Error al obtener informacion del usuario: ${error}`);
        }
    }

    async updateEmail(id,email) {
        try {
            if (!email) {
                throw new Error(`Correo invalido`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{email}
            });
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el correo: ${error}`);
        }
    }

    async updatePhone(id,phone) {
        try {
            if (!phone) {
                throw new Error(`Numero telefonico invalido`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{phone}
            });
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar el numero telefonico: ${error}`);
        }
    }

    async updatePassword(id,password) {
        try {
            if (!password) {
                throw new Error(`Contraseña invalida`);
            }
            await UserModel.findByIdAndUpdate(id,{
                $set:{password}
            });
            return "ok"
        } catch (error) {
            throw new Error(`Error al actualizar la Contraseña: ${error}`);
        }
    }

    //Pendiente eliminar usuario
}

export default ManagerUser;
