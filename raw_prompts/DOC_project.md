- STACK: server nodejs que sirva un front en angular. Usar SQLite como DB.
https://www.npmjs.com/package/ngx-markdown



Crear una interfaz basica que me permita crear prompts para enviar a los chat de los LLMs. Features que debe soportar:
- Pagina de settings para configurar credenciales y modelos a usar para cada accion.
- Pagina principal donde se tengan todas las opciones para armar los prompts. Poder crear "tareas" y que queden registradas en el historial como lo hace Cline.
- Tener interfaz de chat. Poder copiar al portapapeles cada mensaje del chat.
- Debe guardar un historial de lo que haga.
- Elegir system prompt que quiero usar.
- Recordatorios asociados a cada system propmt que se deben incluir a cada user template prompt. Ejemplo: preferir @if sobre *ngIf para angular.
- Parte del system prompt propia de cada proyecto: estrucutura del proyecto, 
- Elegir prompt (o templates de prompt) para tareas comunes.
- Navegar por el sistema de archivos y seleccionar los archivos que quiero incluir como contexto.
- Poder buscar un archivo en la carpeta actual o carpetas hijas por nombre de archivo.
- Transcripcion de audio para que al enviar a un LLM el texto transcrito, junto al template del prompt, me responda con el prompt mejorado.




Features futuras:
- Mejorar prompts. Inicialmente tratar de replicar prompts de cline.
- Pensar como puedo incluir evals o como me puede ayudar a manejarlas de manera mas comoda.
