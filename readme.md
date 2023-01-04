# Control de Ingreso
Esta aplicación tiene por objetivo registrar los ingresos a las áreas y sectores de cada empleado del Registro de la Propiedad.

## f

### Capturar datos del scanner
La manera de capturar los datos leídos del código impreso en el DNI es através de un evento llamado `keydown`, nativo del teclado.
Se sabe que el scanner devuelve cada dato impreso como una función de tecla, y que termina con un `enter`.
Por esto, el evento principal a utilizar es:
```js
document.addEventListener('keydown', (e) => {   });
```
Dentro de este se incluirá toda la lógica relacionada al scanner

#### Condiciones y eventos del scanner
Se sabe que el scanner devuelve los datos sueltos, tecla por tecla, por lo que el objetivo es convertir los datos a un array que contenga cada detalle separado; es decir, parsearlos.
Para esto, se eligió convertir los datos directamente a un array, que está separado por el caracter `²`. Luego se vuelve a separar y se crea el array final.
A continuación se explica en detalle el proceso realizado en el código.
1. Se verifica si la propiedad `scan` existe en la instancia `window`. Si existe, crea un array vacío en la misma propiedad; es decir, lo limpia.
2. Verifica el tiempo que se tarda en presionar la tecla. Si este es mayor a 100ms y existen datos dentro del array `scan`, entonces lo vuelve a limpiar. Esto se hace para no confundir scanner y teclado.
3. Verifica que el input termine con `enter` y no tenga ningún dato dentro, para no confundir teclado y scanner. Además, crea un evento custom llamado `scanComplete` que guarda el string escaneado.
4. Lee la propiedad `location` que viene en cada caracter (como input de teclado). Si esta es 0, guarda los datos en el array `scan` y calcula la diferencia de time stamps para verificar que sea efectivamente una entrada del scanner.

#### Listener 'scanComplete'
Este listener tiene como propósito parsear los datos para que sean guardados como un objeto dentro de la aplicación. De esta manera se pueden consultar los datos por clave-valor o por índice. Para ello se utiliza:
```js
database = new Data (...rawData);
```
Esto crea una nueva instancia de la clase `Data`, que contiene todos los campos necesarios (nombre, apellido, dni, etc.)