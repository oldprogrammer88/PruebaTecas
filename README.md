# Pruebas Tecas
## Resumen del Proyecto

El siguiente repositorio contiene el código solicitado para la selección de programador en Tecas. El contenido del proyecto es el siguiente
- Proyecto cliente programado en *Angular 14*
- Proyecto servidor creado en *.Net Core 6*

Este proyecto cuenta con pantalla de login y registro, utiliza token JWT para la autorizaciones a acceso de las API en servidor, IdentityCore Framework para la administracion de usuarios. Cuenta con pantallas adicionales para visualizar cuentas de ahorro, en donde puede crear cuentas, depositar y retirar. También cuenta con una pantalla que muestra una tabla paginada para la visualización de transacciones (deposito y retiro).

## Proyecto Cliente
El proyecto cliente no necesita ninguna configuración en especial, las API apuntan a localhost y a un puerto fijado que se establecio en Servidor. Es necesario ejecutar los siguientes comandos desde la raiz del proyecto cliente para la instalación de dependencias y ejecución del proyecto. También es necesario tener Angular CLI instalado de pereferencia globalmente.

## Proyecto Servidor
El proyecto servidor funciona con dotnet (core) 6. La base de datos está configurada para poder funcionar en SQLite con un enfoque Code First, por lo que es necesario ejecutar las migraciones de código, así como tener instalado las dependencias de EntityFramework Core Tools en el proyecto y ejecutar el comando **dotnet ef update database**. El proyecto no necesita scripts SQL para su ejecución, en la migración está la estructura y datos iniciales.
