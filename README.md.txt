# Rindegastos Backend
Este es un proyecto backend desarrollado en NestJS para manejar conversiones de moneda, cálculo de días hasta el cumpleaños y concatenación de productos numéricos.

## Requisitos
Node.js versión 14 o superior.  
npm (incluido con Node.js).  
Clave de API válida para Open Exchange Rates.

## Instalación
1. Clona el repositorio desde GitHub: git clone https://github.com/KO-tech-code/Test-Rindegastos-NestJS  
2. Navega al directorio del proyecto: cd rindegastos-backend  
3. Instala las dependencias necesarias: npm install  

## Configuración
1. Al ejecutar npm install, se generará automáticamente el archivo .env en la raíz del proyecto.  
2. Edita el archivo .env para incluir tu clave de API: OPENEXCHANGE_API_KEY=AQUI_VA_TU_KEY  

Nota: La clave de API es necesaria para la funcionalidad de conversión de monedas. Si no tienes una clave, regístrate en Open Exchange Rates (https://openexchangerates.org/) para obtenerla.

## Ejecución
Modo desarrollo: npm run start:dev  
Modo producción:  
1. Compila el proyecto: npm run build  
2. Inicia el servidor: npm run start:prod  

El servidor estará disponible en http://localhost:3000.

## Endpoints y Validaciones

### Conversión de Moneda
Descripción: Convierte una cantidad de una moneda a otra utilizando la API de Open Exchange Rates.  
Endpoint: /conversion/getConvertedAmount  
Método: GET  
Parámetros:  
- from (obligatorio): Código de moneda de origen (por ejemplo, USD).  
- to (obligatorio): Código de moneda de destino (por ejemplo, CLP).  
- amount (obligatorio): Cantidad a convertir. Debe ser un número positivo.  
- date (opcional): Fecha específica para la conversión en formato YYYY-MM-DD.  

Validaciones y Respuestas de Error:  
1. Parámetros faltantes: {"statusCode": 400, "message": "Los parámetros 'from', 'to' y 'amount' son requeridos."}  
2. Formato inválido para amount: {"statusCode": 400, "message": "El parámetro 'amount' debe ser un número positivo."}  
3. Moneda no soportada: {"statusCode": 400, "message": "Las monedas USD o XXX no están soportadas."}  
4. Fecha futura: {"statusCode": 400, "message": "El parámetro 'date' no puede ser una fecha futura."}  
5. Formato inválido para date: {"statusCode": 400, "message": "El parámetro 'date' debe estar en el formato YYYY-MM-DD."}  

Ejemplo en Postman usando curl:  
- Conversión sin fecha: curl -X GET "http://localhost:3000/conversion/getConvertedAmount?from=USD&to=CLP&amount=15000"  
- Conversión con fecha válida: curl -X GET "http://localhost:3000/conversion/getConvertedAmount?from=USD&to=CLP&amount=15000&date=2023-12-25"

### Obtener Todos los Rindegastinos
Descripción: Devuelve una lista de todos los rindegastinos registrados junto con sus fechas de nacimiento y los días que faltan para sus cumpleaños.  
Endpoint: /birthday/getRindegastinosBirthdays  
Método: GET  

Validaciones y Respuestas de Error:  
1. Error del servidor: {"statusCode": 500, "message": "Error interno del servidor."}  

Ejemplo en Postman usando curl:  
curl -X GET "http://localhost:3000/birthday/getRindegastinosBirthdays"  

Respuesta esperada:  
[  
    {"name": "Juan", "birthdate": "1990-07-15", "daysUntilBirthday": 200},  
    {"name": "Ana", "birthdate": "1985-03-25", "daysUntilBirthday": 50}  
]

### Días Hasta el Cumpleaños
Descripción: Calcula cuántos días faltan para el cumpleaños de una persona.  
Endpoint: /birthday/getDaysUntilMyBirthday  
Método: GET  
Parámetros:  
- birthdate (obligatorio): Fecha de nacimiento en formato YYYY-MM-DD.  

Validaciones y Respuestas de Error:  
1. Parámetro faltante: {"statusCode": 400, "message": "El parámetro 'birthdate' es requerido."}  
2. Formato inválido: {"statusCode": 400, "message": "El parámetro 'birthdate' no tiene un formato válido (YYYY-MM-DD)."}  

Ejemplo en Postman usando curl:  
curl -X GET "http://localhost:3000/birthday/getDaysUntilMyBirthday?birthdate=1990-07-15"

### Registrar Cumpleaños
Descripción: Registra un usuario (Rindegastino) y su cumpleaños.  
Endpoint: /birthday/register  
Método: POST  
Cuerpo: {"name": "Juan", "birthdate": "1990-07-15"}  

Validaciones y Respuestas de Error:  
1. Parámetros faltantes: {"statusCode": 400, "message": "El nombre y la fecha de nacimiento son requeridos."}  

Ejemplo en Postman usando curl:  
curl -X POST "http://localhost:3000/birthday/register" -H "Content-Type: application/json" -d '{"name":"Juan","birthdate":"1990-07-15"}'

### Producto Concatenado
Descripción: Calcula el producto concatenado de dos números.  
Endpoint: /numbers/getTheNumber  
Método: GET  
Parámetros:  
- first (obligatorio): Primer número.  
- second (obligatorio): Segundo número.  

Validaciones y Respuestas de Error:  
1. Parámetros faltantes: {"statusCode": 400, "message": "El parámetro 'first' y 'second' son requeridos."}  
2. Formato inválido: {"statusCode": 400, "message": "El parámetro 'first' o 'second' debe ser un número."}  

Ejemplo en Postman usando curl:  
curl -X GET "http://localhost:3000/numbers/getTheNumber?first=192&second=3"

## Pruebas
Ejecutar pruebas unitarias usando el comando: npm run test  
Usa Postman para realizar las pruebas manuales copiando y pegando los comandos curl proporcionados en este documento.

## Notas Finales
Este proyecto utiliza NestJS y sigue las mejores prácticas de arquitectura modular. Actualmente, el almacenamiento es en memoria para simplicidad, pero se puede escalar a una base de datos en producción.

## Contacto
Para preguntas o más información:
- Email: Jairo.pablo@outlook.com	
- LinkedIn: https://www.linkedin.com/in/jairo-pablo-soto-aliaga-46a30a1bb/
