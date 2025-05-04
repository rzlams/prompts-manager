YO LE HABLO AL developer COMO SI FUERA EL product_owner

NOTA: recibe informacion completa sobre la feature desde el product_owner y la implementa en cursor. Ir agregando herramientas con MCP para que pueda probar en el navegador y automatizar todo lo que se pueda.

NOTA: para esto me puede servir incluir en el system prompt diferentes "modes". Asi al decirle al agente en que modo operar, el ya sabe que hacer. Ejemplo: en design mode estamos solo refinando la tarea, en dev mode estamos implementando con TDD y en debug mode estamos conversando sobre el bug para intentar entender que pasa antes de volver a dev mode para implementar la solucion.

- Armar un blueprint o framework que describa en detalle toda la informacion necesaria para implementar una feature y los pasos a seguir. Por ejemplo:
	- De ser necesario, separar la feature en tareas mas pequeñas.
	- What we are doing. Context about the global task and how the current step contribute to achieve the task.
	- Include relevant files.
	- How to execute. Include what not to do.
	- Repeat relevant core instructions.
	- Output format (short answer, detailed answer, write code, debug issue, etc).
	- Definir estructuras de datos.
	- Links a documentacion oficial.
- En base a esa descripcion hacer TDD. Con human in the loop, que discuta todos los test cases conmigo antes de escribir la implementacion. Es importante incluir todos los posibles escenarios y manejar casos de error.
- OPCIONAL: speech-to-text, que no tenga que escribir toda la info del blueprint. Que grabe un audio y que la transcripcion la organice un modelo que me la entregue como se la debo pasar a curso/cline


IMPORTANTE: debe existir otro developer que haga code review (technical lead?) en base a las buenas practicas que tenga definidas (codigo, seguridad, etc) y el input del product_owner.



TENER ESTO EN CUENTA TAMBIEN PARA EL PROMPT DEL product_owner







- Que para maquetar que use solo flexbox. Solo usa grid cuando te lo diga explicitamente
