https://cursor.directory/rules/node.js
https://cursor.directory/rules/cpp
https://cursor.directory/rules/data-analyst
https://cursor.directory/rules/llm
https://cursor.directory/rules/devops
https://cursor.directory/rules/microservices
https://cursor.directory/rules/serverless
https://cursor.directory/rules/typescript
https://cursor.directory/rules/html
https://cursor.directory/rules/css
https://cursor.directory/rules/typescript
https://cursor.directory/rules/mobile
https://cursor.directory/rules/testing
https://cursor.directory/rules/technical-writing
https://cursor.directory/rules/cloud
https://cursor.directory/rules/infrastructure-as-code


PARA MEJORAR TEXTOS EN UNA APP:
Give me suggestions for the microcopy to optimize clarity, in plain text.



How to make evals on LLM answers?


https://github.com/danielmiessler/fabric/blob/main/patterns/create_idea_compass/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/create_keynote/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/create_tags/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/explain_docs/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/export_data_as_csv/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/extract_article_wisdom/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/extract_core_message/system.md

https://github.com/danielmiessler/fabric/blob/main/patterns/explain_project/system.md


LLM AS CHARACTER
https://github.com/danielmiessler/fabric/blob/main/patterns/dialog_with_socrates/system.md


CREATE zanahoria SVG LOGO
https://github.com/danielmiessler/fabric/blob/main/patterns/create_logo/system.md


COULD BE USEFUL TO EXPLAIN MEDICAL TERM TO ANOTHER LLM
https://github.com/danielmiessler/fabric/blob/main/patterns/explain_terms/system.md



# Standard Operating Procedure (SOP)
The SOPs are defined to be consumed by an LLM, meaning the main goal of the procedures is to describe the task to the LLM, not to humans.

# Workflow Overview
All the task will be ahdned to an LLM with it corresponding SOP. See sop_template.md.

The default workflow should be as follow:
Product Owner - Acceptance definition ->
UX/UI Designer - Define UX with Mermaid Diagrams ->
Product Owner - Update acceptance definition ->
Developers - Write acceptance tests for ATDD ->
UX/UI Designer - Define UI (theme variables, animations, etc) ->
Developers - Code implementation ->
Product Owner - Validate that ATDD test passes

# Roles

## Product Owner
A product owner is a role in Agile and Scrum development that focuses on maximizing the value of a product by defining the product vision, prioritizing features, and managing the product backlog. They work closely with the development team to ensure that the right features are built in the right order to meet business goals.

**Related SOPs**:

**Expected Output**:
- Acceptance Test definition.

## UX/UI Designer
A UX (User Experience) designer focuses on making products, services, and technology usable, enjoyable, and accessible for humans, particularly in digital contexts like websites and apps. They strive to ensure a positive and efficient interaction between users and the product.

**Related SOPs**:
- design_system_from_image.md
- build_base_ui.md

**Expected Output**:
- Mermaid Diagrams for each user flow.
- UI design with detailed instruction for each UI change for user interactions (hover effeects, animations, toggles, etc).
- Theme variables (design system) like colors, typography, etc.
- Layout implementation in HTML + CSS.

## Frontend Developer
A front-end developer, also known as a client-side developer, focuses on building the user interface of a website or application that users directly interact with, using languages like HTML, CSS, and JavaScript. 

**Related SOPs**:
- define_execution_plan.md

**Expected Output**:
- `execution_plan_[task-name].md` file containing a checklist with all the steps required to complete the task.
- Completely functional app that met all the acceptance criteria.
- Report of the successful execution of all acceptance tests.

## Backend Developer
