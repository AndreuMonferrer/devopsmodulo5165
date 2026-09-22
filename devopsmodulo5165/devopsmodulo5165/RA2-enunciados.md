---
title: "RA2 · Enunciados"
---

[← Volver al índice](index.md)

# RA2 — Enunciados de las actividades

Siete actividades listas para dar al alumnado, en el orden en que se hacen a lo largo de las seis sesiones; las soluciones y las rúbricas están en la pestaña «RA2 · Actividades resueltas».

## Instrucciones generales

- Trabajáis en **parejas fijas** durante todo el RA2 (si el grupo es impar, se forma un trío). Las parejas se forman en la sesión 1.
- Todo se hace **en clase**. Cada actividad se sube a Aules antes de terminar la sesión; no hay tarea para casa.
- No necesitáis cuenta en AWS ni en Azure: solo terminal, navegador, LibreOffice y diagrams.net, que funciona sin registro.
- Los datos de los escenarios están inventados para el ejercicio. Los precios de la nube los da cada calculadora el día de la práctica.

| Sesión | Actividad | Duración | Nota |
| --- | --- | --- | --- |
| 1 | Práctica 1: radiografía de un servidor | 45 min | Sin nota |
| 2 | Práctica 2: coste a 3 años | 50 min | Trabajo evaluable |
| 3 | Comité de arquitectura | 55 min | Sin nota |
| 4 | Investigación guiada | 15 min | Se entrega dentro de la práctica 3 |
| 4 | Práctica 3: diagrama | 35 min | Trabajo evaluable |
| 5 | Práctica 4: equivalencias y ruta de una petición | 30 min | Trabajo evaluable |
| 5 y 6 | Investigación y presentación | 30 min de preparación y 8 min por pareja | Trabajo evaluable |
| 6 | Prueba escrita | 50 min | Examen |

## Práctica 1 · Radiografía de un servidor

**Sesión 1 · 70 min · En pareja · Se entrega en Aules al terminar la sesión · Actividad sin nota · Criterios a, e y f**

Hoy formáis la pareja con la que trabajaréis todo el RA2. Vuestro portátil es un servidor en miniatura: vais a medirlo, a ponerlo a trabajar y a traducir lo que veáis al vocabulario de la nube.

**1. Medid (15 min).** Abrid una terminal y ejecutad estos comandos, anotando lo que salga de cada uno. El `LANG=C` hace que los nombres aparezcan en inglés y sean iguales en todos los equipos.

```bash
LANG=C lscpu
free -h
lsblk -o NAME,SIZE,TYPE,ROTA,MOUNTPOINT
df -h /
ip -br addr
ip route
systemd-detect-virt
cat /etc/os-release
```

**2. Completad la ficha (10 min).** Copiad la tabla en vuestro documento y rellenad las dos últimas columnas.

| Recurso | Valor en mi portátil | Cómo se llama en la nube |
| --- | --- | --- |
| Núcleos e hilos |  |  |
| Memoria RAM |  |  |
| Disco: tamaño y tipo (ROTA 0 es SSD) |  |  |
| Interfaz de red e IP |  |  |
| Puerta de enlace |  |  |
| ¿Está virtualizado? |  |  |

**3. Alquilad un equivalente (10 min).** En la documentación pública de AWS (tipos de instancia de EC2) y de Azure (tamaños de máquina virtual), buscad el tamaño más parecido a vuestro portátil y anotad, para cada proveedor, el nombre del tamaño, las vCPU y la RAM.

**4. Medid el uso (10 min).** Ejecutad lo siguiente y haced una captura de pantalla de cada salida de `top`. El bucle pone todos los números al 100 % durante 20 segundos.

```bash
nproc
top -bn1 | head -12
for i in $(seq $(nproc)); do timeout 20 sh -c 'while :; do :; done' & done; sleep 5; top -bn1 | head -12; wait
```

Anotad el porcentaje de CPU antes y durante la carga. Después responded: si esta máquina fuera una máquina virtual normal en la nube y estuviera encendida una hora, ¿cambiaría lo que pagáis entre haberla tenido al 5 % o al 100 % de CPU? ¿Y si la apagáis?

**5. Vuestro «mini centro de datos» (10 min).** En papel o en diagrams.net, dibujad el portátil como si fuera un centro de datos: qué hace de servidor, de red, de almacenamiento, de SAI (la batería), de refrigeración (el ventilador) y de seguridad física (la contraseña, la tapa). Marcad en rojo lo que le falta para ser un centro de datos de verdad.

**6. Responded por escrito (15 min).**

1. ¿Qué le pasa al servicio que ejecuta este equipo si se rompe su disco?
2. Nombrad al menos tres elementos de un centro de datos que no aparecen en vuestro portátil pero que una empresa con servidores propios tendría que comprar y mantener. En la nube, ¿quién se ocupa de ellos?
3. ¿Qué devuelve `systemd-detect-virt` en vuestro equipo y qué devolvería dentro de una instancia de la nube? ¿Qué diferencia eso de un servidor físico?
4. De todo lo que habéis medido, ¿qué cambiaría de responsable (proveedor o cliente) si el servicio pasara a la nube?

**Qué hay que entregar.** Un documento (ODT o PDF) con los nombres de la pareja, la ficha completa, los dos tamaños elegidos, las capturas de `top`, el dibujo del mini centro de datos y las respuestas, subido a Aules antes de terminar la sesión.

**Cómo se valora.** No lleva nota: el profesor os devolverá comentarios y se comentarán algunos resultados en voz alta al final.

## Puzle A · Cómo funciona la nube y cómo gana dinero

**Sesión 2 · 85 min · Grupos de 5 y parejas de expertos · Se entrega en Aules al terminar la sesión · Trabajo evaluable · Criterio b**

Hoy no hay clase magistral: sois vosotros quienes investigáis y os enseñáis unos a otros (es un «puzle de Aronson»). Cada persona se convierte en experta en un tema y después lo explica a su grupo; nadie conoce el puzle completo hasta que todos han enseñado su pieza.

**Cómo funciona el puzle**

| Fase | Minutos | Qué ocurre |
| --- | --- | --- |
| 0. Reparto | 5 | El profesor forma dos grupos base de 5 personas. En cada grupo, cada persona recibe un número del 1 al 5, que es su tema |
| 1. Expertos | 25 | Se juntan las dos personas que tienen el mismo número (una de cada grupo base). Investigáis con la hoja de experto y preparáis vuestra ficha |
| 2. Enseñar | 30 | Cada persona vuelve a su grupo base y explica su tema en 5 minutos, más 1 de preguntas. Quien escucha completa la ficha de recogida |
| 3. Comprobar | 10 | Prueba individual de 5 preguntas, en papel, con vuestra ficha de recogida |
| 4. Cierre | 10 | El profesor aclara dudas y corrige los errores más frecuentes |

Para investigar podéis usar el navegador y la documentación oficial de AWS y de Azure, además de lo que indique cada hoja. No hay apuntes del profesor: la fuente sois vosotros.

**Los cinco temas: hojas de experto**

| Tema | Preguntas que debe responder la pareja de expertos | Dónde buscar |
| --- | --- | --- |
| 1. Geografía de la nube: regiones, zonas y borde | ¿Qué es una región? ¿Qué es una zona de disponibilidad y para qué sirve? ¿Qué es el borde (edge)? ¿Cuál es la región de AWS y la de Azure más cercana a nuestro centro y cuántas zonas tienen? ¿A qué latencia están la más cercana, una de Estados Unidos y una de Asia-Pacífico (medidlo)? ¿Qué pesa, además de la latencia, al elegir región? | Páginas de infraestructura global de AWS y de Azure; herramientas públicas de latencia como cloudping.info y azurespeed.com |
| 2. Economías de escala y multiinquilinato | ¿Por qué comprar hardware en enormes cantidades baja el coste por unidad? ¿Qué es el multiinquilinato y cómo se aísla a cada cliente? ¿Por qué los picos de unos clientes y los valles de otros hacen rentable el negocio? ¿Qué hardware propio diseñan los proveedores? | Documentación oficial de AWS Nitro System; búsqueda de «hyperscale data center economies of scale» y «cloud multi-tenancy isolation» |
| 3. Cómo se paga: modalidades y facturación | ¿Qué es pagar bajo demanda? ¿Qué son los compromisos de uso a 1 y 3 años? ¿Qué es la capacidad Spot? ¿Qué se factura en un servicio típico: cómputo, almacenamiento, tráfico, peticiones? Calculad con la calculadora de AWS y la de Azure el coste mensual de una máquina de 2 vCPU y 8 GB en las tres modalidades y apuntad la fecha | Calculadoras de precios oficiales; páginas de precios de EC2 y de Azure Virtual Machines |
| 4. Responsabilidad compartida y SLA | ¿Qué significa seguridad «de» la nube y seguridad «en» la nube? Dibujad el reparto entre proveedor y cliente. ¿Qué disponibilidad se compromete a dar el proveedor para una máquina virtual y en qué configuración? ¿Qué recibe el cliente si no la cumple? ¿Qué errores del cliente provocan brechas de seguridad? | Búsqueda de «AWS shared responsibility model» y «Azure shared responsibility»; páginas de SLA de ambos proveedores |
| 5. Servicios gestionados y retención del cliente | ¿Qué es un servicio gestionado? Poned un ejemplo con base de datos. ¿Por qué al proveedor le interesa vender servicios gestionados? ¿Qué son los niveles gratuitos y los créditos? ¿Qué es la dependencia del proveedor y qué papel tiene el coste de sacar datos (egress)? | Páginas de Amazon RDS y de Azure SQL Database; búsqueda de «AWS Free Tier», «Azure free account» y «egress fees» |

**La ficha de experto (la prepara la pareja en la fase 1).** Un folio con: qué es el tema en una frase; cómo funciona, con un dibujo hecho por vosotros; un ejemplo en AWS y otro en Azure; un dato verificable con su fuente y su fecha; y tres preguntas para comprobar que los demás lo han entendido, con su respuesta. Se sube a Aules y el profesor la reparte a toda la clase.

**La ficha de recogida (la rellena cada persona en la fase 2).**

| Tema | Idea principal en una frase | Dos cosas que no sabía | Una duda que me queda |
| --- | --- | --- | --- |
| 1. Geografía de la nube |  |  |  |
| 2. Economías de escala y multiinquilinato |  |  |  |
| 3. Cómo se paga |  |  |  |
| 4. Responsabilidad compartida y SLA |  |  |  |
| 5. Servicios gestionados y retención |  |  |  |

**La prueba individual (fase 3).** Cinco preguntas, una por tema. Algunas saldrán de las que hayáis propuesto en vuestras fichas de experto.

**Qué hay que entregar.** La ficha de experto de la pareja, la ficha de recogida de cada persona y la prueba individual.

**Cómo se valora.** Es un trabajo evaluable: la ficha de experto (contenido correcto, estructura, fuentes y preguntas), la explicación a vuestro grupo (la observa el profesor y os valoran vuestros compañeros con una hoja de tres casillas: claro, ordenado y responde preguntas) y la prueba individual.

## Práctica 2 · Coste a 3 años, on-premise frente a nube

**Sesión 2 · 50 min · En pareja · Se entrega en Aules al terminar la sesión · Trabajo evaluable · Criterio b**

Una pyme quiere alojar una web corporativa con una API. Debéis calcular cuánto le cuesta hacerlo durante tres años con un servidor propio y en la nube, y decidir qué opción recomendaríais y con qué límites.

**Lo que necesita la aplicación (datos ficticios).** 2 vCPU y 8 GB de RAM, 200 GB de disco SSD, 1 TB al mes de tráfico saliente hacia Internet, copias de seguridad de 200 GB y funcionamiento continuo (730 horas al mes).

**Opción A · Servidor propio.** Trabajad con estos datos, inventados para el ejercicio; podéis cambiarlos si lo justificáis.

| Concepto | Dato |
| --- | --- |
| Servidor | 3.200 € (compra inicial) |
| SAI | 500 € (compra inicial) |
| Disco externo para copias | 200 € (compra inicial) |
| Consumo medio | 250 W durante 730 h al mes |
| Electricidad | 0,20 €/kWh, con un 30 % extra por refrigeración |
| Línea de Internet profesional con IP fija | 60 €/mes |
| Servicio de copias remoto | 20 €/mes |
| Garantía y mantenimiento | 10 % del precio del hardware al año |
| Administración | 10 % de la jornada de un técnico cuyo coste para la empresa es de 36.000 €/año |

**Opción B · Nube.** Usad la calculadora de precios pública de AWS y la de Azure (no hace falta iniciar sesión). Añadid una máquina virtual Linux con 2 vCPU y 8 GB funcionando 730 horas al mes, un disco de 200 GB, 1 TB al mes de tráfico saliente y 200 GB de copias, en una región de la UE. La administración se estima en el 5 % de la jornada del mismo técnico.

**Qué tenéis que hacer**

1. **Calcular (20 min).** Obtened el coste mensual y el acumulado a 36 meses de la opción A y de la opción B en tres modalidades: bajo demanda, con compromiso a 1 año y con compromiso a 3 años. Si una calculadora no ofrece alguna modalidad, dejadlo anotado. Guardad una captura o exportación de cada resultado.
2. **Hoja de cálculo (15 min).** En LibreOffice Calc, montad una tabla con los costes por año y acumulados, y un gráfico de líneas con el coste acumulado mes a mes de cada opción. Si las líneas se cruzan, marcad el punto de equilibrio.
3. **Y si… (10 min).** Elegid una de estas variaciones, estimad su efecto sobre las dos opciones y explicad por qué: apagar la máquina fuera del horario laboral (unas 220 horas al mes en marcha), una campaña con demanda triplicada durante dos meses, o una subida del 50 % en la electricidad.
4. **Conclusiones (5 min).** Cinco líneas: qué recomendáis, por qué, y qué cosas importantes **no** han entrado en el cálculo.

**Qué hay que entregar.** El archivo de la hoja de cálculo (con tablas y gráfico), las capturas de las calculadoras y las conclusiones, subidos a Aules antes de terminar la sesión.

**Cómo se valora.** Es un trabajo evaluable con la rúbrica común de las prácticas (0 a 8 puntos): corrección técnica, justificación, vocabulario y entrega.

## Comité de arquitectura

**Sesión 3 · 55 min · En pareja · Se entrega en Aules al terminar la sesión · Actividad sin nota · Criterio c**

Sois una consultora tecnológica. Cada pareja recibe el caso de una organización y debe recomendar, ante el resto de la clase (el «comité»), dónde debería vivir su infraestructura: en instalaciones propias o en la nube. El profesor asigna los casos por sorteo.

**Los casos (datos ficticios)**

| Caso | Situación |
| --- | --- |
| 1. Startup de reparto | App móvil que lanza en tres ciudades con demanda muy incierta; equipo de cuatro personas sin administrador de sistemas; poco capital |
| 2. Hospital público regional | Historia clínica electrónica y sistemas 24/7; datos de salud; hardware actual amortizado; equipo TI propio pequeño |
| 3. Tienda online con campañas | Ventas estables casi todo el año y picos de diez veces en dos campañas; catálogo de 20.000 productos |
| 4. Ayuntamiento mediano | Sede electrónica y padrón; obligación de cumplir el Esquema Nacional de Seguridad; presupuesto anual cerrado y contratación por licitación; poca plantilla técnica |
| 5. Fábrica con líneas de producción | Control de planta que no puede parar aunque falle Internet; datos de sensores que se analizan en diferido |

**Qué tenéis que hacer**

1. **Construid la matriz de decisión (15 min).** Copiad la tabla, dad a cada criterio un peso del 1 al 5 según lo importante que sea **en vuestro caso**, y puntuad del 1 a 5 cada opción en cada criterio. Podéis añadir un criterio propio. Después multiplicad cada puntuación por su peso y sumad para obtener el total de cada opción.

| Criterio | Peso (1-5) | On-premise (1-5) | Nube (1-5) |
| --- | --- | --- | --- |
| Inversión inicial |  |  |  |
| Coste a cinco años |  |  |  |
| Variabilidad de la carga |  |  |  |
| Requisitos legales y de datos |  |  |  |
| Latencia y conectividad |  |  |  |
| Capacidades del equipo |  |  |  |
| Riesgo de dependencia del proveedor |  |  |  |
| Tiempo de puesta en marcha |  |  |  |
| Criterio propio: |  |  |  |
| **Total ponderado** |  |  |  |

2. **Redactad la recomendación (incluida en los 15 min).** Tres líneas: qué opción recomendáis y qué criterios la decidieron. Si pensáis que una parte de los sistemas debería quedarse en propio, explicad cuál y por qué; no hace falta que conozáis todavía el modelo híbrido.
3. **Exponed ante el comité (30 min en total para todas las parejas).** Cada pareja presenta su caso y su recomendación en 3 minutos. La pareja siguiente actúa de **abogado del diablo**: plantea una objeción en 2 minutos y la primera responde.
4. **Cerrad con el profesor (10 min).** Se comenta en la pizarra qué criterio pesó más en cada caso y qué patrones aparecen.

**Qué hay que entregar.** La matriz completa y la recomendación de tres líneas en un documento o en una foto legible, subidos a Aules antes de terminar la sesión.

**Cómo se valora.** No lleva nota. Lo importante es que los pesos estén justificados por el caso y que la recomendación se apoye en la matriz; el análisis de beneficios y riesgos de la nube lo haréis con datos reales en el informe de la empresa.

## Investigación guiada · ¿Dónde viven mis datos?

**Sesión 4 · 15 min · En pareja · El resultado se entrega dentro de la práctica 3 · Criterios b y d**

Antes de dibujar la arquitectura tenéis que decidir en qué región de la nube vais a desplegarla, y hacerlo con datos y no por intuición.

1. **Localizad (6 min).** En las páginas públicas de infraestructura global de AWS y de Azure, buscad la región más cercana a vuestro centro. Anotad su nombre, su país, cuántas zonas de disponibilidad declara AWS y si Azure ofrece zonas de disponibilidad en esa region.
2. **Medid (6 min).** Con una herramienta pública de medición de latencia desde el navegador para AWS (por ejemplo cloudping.info) y otra para Azure (por ejemplo azurespeed.com), medid la latencia hacia tres regiones y rellenad la tabla.

| Región | Proveedor | Latencia medida (ms) |
| --- | --- | --- |
| La más cercana a nosotros |  |  |
| Una de Estados Unidos |  |  |
| Una de Asia-Pacífico |  |  |

3. **Decidid (3 min).** Escribid una frase con la región que usaréis en la práctica 3 y por qué. La más cercana no siempre es la mejor elección: pensad en el precio, en los servicios disponibles y en dónde exige la normativa que estén los datos.

**Qué hay que entregar.** La información de la región, la tabla y la frase, pegadas al principio del documento de la práctica 3.

## Práctica 3 · Diagrama de infraestructura y arquitectura

**Sesión 4 · 35 min · En pareja · Se entrega en Aules al terminar la sesión · Trabajo evaluable · Criterio d, con apoyo de e y f**

Dibujad la arquitectura en la nube de la organización que defendisteis en el Comité, y distinguid con claridad qué son recursos de infraestructura y qué son decisiones de arquitectura. Usad diagrams.net en el navegador (funciona sin registro) y elegid un proveedor, AWS o Azure, con su biblioteca de iconos.

**El diagrama debe incluir como mínimo**

- La región elegida en la investigación guiada y **dos** zonas de disponibilidad dentro de ella.
- Una red virtual con al menos una subred pública y una privada.
- Una capa web con dos o más servidores repartidos entre las zonas y un balanceador de carga delante.
- Una base de datos con réplica en otra zona (o una razón escrita de por qué vuestro caso no la necesita).
- Almacenamiento de objetos para archivos estáticos o copias de seguridad.
- Al menos **cuatro decisiones de arquitectura** señaladas con un número sobre el propio dibujo.

**Qué tenéis que hacer**

1. **Dibujad (20 min).** Los elementos como iconos, las zonas y subredes como contenedores y las conexiones entre ellos.
2. **Clasificad (10 min).** Debajo del diagrama, poned una tabla con una fila por elemento o por decisión numerada.

| Elemento o número | ¿Infraestructura (I) o decisión de arquitectura (A)? | Justificación en una frase | Qué exigiría en on-premise |
| --- | --- | --- | --- |
|  |  |  |  |

3. **Revisad (5 min).** Intercambiad el diagrama con otra pareja. Vuestros compañeros marcarán en rojo cualquier punto único de fallo que vean, y vosotros lo corregiréis.

**Qué hay que entregar.** El diagrama exportado a PNG o PDF junto con el archivo `.drawio`, la tabla de clasificación y la información de la investigación guiada, subidos a Aules antes de terminar la sesión.

**Cómo se valora.** Es un trabajo evaluable con la rúbrica común de las prácticas (0 a 8 puntos). Se valora sobre todo que no confundáis regiones con zonas, que la base de datos no quede accesible directamente desde Internet y que las decisiones numeradas sean elecciones de diseño (cuántas, dónde, qué separa qué) y no simples nombres de recursos.

## Práctica 4 · Equivalencias y ruta de una petición

**Sesión 5 · 30 min · En pareja · Se entrega en Aules al terminar la sesión · Trabajo evaluable · Criterios e y f**

Dos ejercicios cortos para relacionar lo que tiene un centro de datos propio con lo que ofrece la nube, y para entender qué ocurre por dentro cuando se pide un recurso virtual.

**Parte 1 · Del centro de datos propio a la nube (15 min).** Completad la tabla con el servicio o concepto equivalente en AWS o en Azure (elegid uno de los dos y mantenedlo en toda la tabla) y con quién lo opera en la nube: el proveedor, el cliente o ambos.

| Elemento de un centro de datos propio | Equivalente en la nube | ¿Quién lo opera? |
| --- | --- | --- |
| SAI y grupo electrógeno |  |  |
| Rack con servidor físico |  |  |
| Discos SAN de las máquinas virtuales |  |  |
| NAS con carpetas compartidas |  |  |
| Cortafuegos perimetral y sus reglas |  |  |
| VLAN para separar redes |  |  |
| Servidor DNS |  |  |
| Hipervisor (Proxmox, ESXi) |  |  |
| Discos o cintas de copias de seguridad |  |  |
| Ticket a sistemas para pedir un servidor |  |  |

**Parte 2 · Ruta de una petición (15 min).** Estos ocho pasos describen lo que pasa desde que una persona pide una máquina virtual hasta que se empieza a facturar, pero están desordenados.

- A. Se empieza a contar el uso de la máquina para la factura.
- B. El plano de control elige un servidor físico con capacidad libre.
- C. La persona pide la máquina desde la consola, la CLI o la API.
- D. El hipervisor de ese servidor crea la máquina virtual con sus vCPU y su RAM.
- E. Se comprueba la identidad y que la persona tiene permiso y cuota.
- F. La máquina arranca y queda en estado «en ejecución».
- G. Se copia la imagen elegida al disco virtual de la máquina.
- H. Se conecta la máquina a la red virtual y se le asigna una IP privada.

Ordenadlos y, para cada paso, indicad qué componente actúa (plano de control, hipervisor, servidor físico, red o almacenamiento) y qué característica NIST ilustra, si alguna. Después responded:

1. ¿En qué paso decide el proveedor qué servidor físico se usa, y por qué el cliente normalmente no lo ve?
2. ¿Qué se aprovisiona en los pasos D, G y H y qué falta todavía para **implementar la carga** de una aplicación?

**Qué hay que entregar.** La tabla completa, el orden de los pasos con sus etiquetas y las respuestas, subidos a Aules antes de terminar la sesión.

**Cómo se valora.** Es un trabajo evaluable con la rúbrica común de las prácticas (0 a 8 puntos).

## Investigación y presentación por parejas

**Preparación en la sesión 5 (30 min) · Exposición en la sesión 6 (6 min por pareja más 2 de preguntas) · En pareja · Trabajo evaluable · Criterios e y f, y b en el tema 5**

Cada pareja investiga un tema con documentación oficial y lo explica al resto de la clase. Todo se prepara en clase durante estos 30 minutos y en los 10 primeros minutos de la sesión 6; no hay tarea para casa. El profesor asigna los temas por sorteo.

**Los temas**

| Tema | Qué tiene que aparecer como mínimo |
| --- | --- |
| 1. Un centro de datos por dentro | Energía, refrigeración, seguridad física, niveles Tier y PUE; qué hace una empresa en propio y qué un proveedor de gran escala |
| 2. Virtualización e hipervisores | Cómo un servidor físico se convierte en decenas de máquinas; tipo 1 y tipo 2; KVM, Hyper-V y ESXi; máquina virtual frente a contenedor |
| 3. La red de la nube | VPC o VNet, subredes, rutas, seguridad y conexión con la red de la empresa |
| 4. El almacenamiento | Bloque, archivos y objetos; niveles de acceso; durabilidad frente a disponibilidad; qué se usa para qué |
| 5. Cómo gana dinero la nube | Economías de escala, formas de pago, tráfico de salida, compromisos y gestión de costes |

**Estructura obligatoria: máximo 6 diapositivas**

1. Qué es, en una sola frase.
2. Cómo funciona, con un dibujo hecho por vosotros.
3. Equivalencia en on-premise, AWS y Azure.
4. Un caso real o un dato verificable, con su fuente.
5. Una pregunta para la clase.
6. Fuentes: al menos dos, con enlace, y preferentemente documentación oficial.

**Reglas**

- Se prepara con LibreOffice Impress y se sube en PDF a Aules antes de empezar la exposición.
- Las dos personas de la pareja hablan al menos 2 minutos cada una.
- No se leen las diapositivas.
- Durante las exposiciones de los demás, cada persona anota en una tarjeta una cosa que ha aprendido y una duda, y se la entrega al profesor.

**Cómo se valora.** Con una rúbrica de 0 a 10 puntos que mira: contenido técnico, explicación propia (el dibujo), equivalencias, fuentes y dato verificable, y exposición y respuesta a preguntas.

## Sesión 6 · Presentaciones y prueba escrita

**Sesión 6 · 100 min útiles · Criterios b, d, e y f**

| Minutos | Qué se hace |
| --- | --- |
| 0 a 10 | Últimos retoques a la presentación y subida del PDF a Aules |
| 10 a 50 | Exposiciones por parejas, en el orden del sorteo: 6 minutos de exposición y 2 de preguntas por pareja |
| 50 a 100 | Prueba escrita individual, en papel y sin apuntes |

**Qué entra en la prueba.** Todo lo trabajado en las sesiones 2 a 5 sobre los criterios b, d, e y f: el funcionamiento de la nube y su modelo de negocio, la diferencia entre infraestructura y arquitectura de nube, y los componentes de servidores, redes, almacenamiento y software. Tendrá preguntas tipo test, preguntas cortas y un pequeño caso con un diagrama.

**Cómo prepararse en clase.** Repasad las preguntas de comprobación con las que empieza cada sesión, vuestras prácticas 2, 3 y 4 y las tarjetas de dudas de las presentaciones, que el profesor usará para el repaso previo.

---
[← Teoría](RA2-teoria.md) · [Volver al índice](index.md) · [Actividades resueltas →](RA2-resueltas.md)
