We can improve the result by adding more context about the exam. The value ranges and unit to expect for each exam



# SYSTEM PROMPT
Your goal is to arrange the text extracted from laboratory exam results using an OCR software. You will receive the OCR result as input text and must response with the structured data in json format




# USER PROMPT
<user_feedback>
Arrange the result of the lab exam in a json format which keys are the name of the exam and the values are objects containing the corresponding value, the unit of the exam result, and a number between 0 and 1 regarding the level of confidence you have that the value and unit corresponds to the exam result.
- Include only the json object in the response.
- Ignore the duplicated values when the result is empty.
- Be aware that the lab exam text is in Spanish.

Here you have an example:
# INPUT OCR TEXT
Colesterol ldl 200 mg/dl
Trigliceridos
Trigliceridos 150 mg/dl

# JSON OUTPUT
```
{
  "Colesterol ldl": { "value": "200", "unit": "mg/dl", "confidence": 0.96 },
  "Trigliceridos": { "value": "150", "unit": "mg/dl", "confidence": 0.72 }
}
```
</user_feedback>

<ocr_text>
Pza LABORATORIO TOXICOLOGICO DEL AMBIENTE, C.A.
WS LABORATORIO CLÍNICO

>

REPORTE DE LABORATORIO
Paciente: Astrid Corina Moreno Suarez
Fecha: 05 de Febrero de 2025

Edad: 8 Años

Determinación de plomo en sangre: 3,3 yg /dl

Técnica: NIOSH 8003. 2da. Revisión

Valor Aceptable: Menor de 3,5 u1g/dl en Niños.

Valor Aceptable: Menor de 5,0 g/di en Adultos Le,
Casarelt and Doull's Toxicology Fifth Edition Realizado Por:
OMS/Nota *379/0c!. 201 4: “< 3 yg/dl no son seguros”

Valor De Referencia: Corroborar Con Clínica

 

 

 

 

Urb. Los Naranjos, Av. 98 Casa N* | 37-44, Valencia. Telf. 0241- 822.01.55 - E O 0414 - 472.95.08
labtaca8gmail.com / laboratoriotoxicologicoSWyahoo.com
</ocr_text>
