# Lightweight database for tracking work

| Author : csy@ Refs : [Team site](#) Status : REVIEWED Updated : 2019.11.08 | Key Links [Strategy Doc](#) [UX Mocks](#) [Eng Design Doc](#) | Owners PM : csy@ UX : email@ ENG : email@  |  |
| :---- | :---- | :---- | :---- |

---

[Problem](#problem)

[Vision & Opportunity](#vision-&-opportunity)

[Target Use Cases](#target-use-cases)

[Proposed Solution](#proposed-solution)

[Goals](#goals)

[Conceptual Model](#conceptual-model)

[Requirements](#requirements)

[Assessing a solution for my project mgmt needs](#assessing-a-solution-for-my-project-mgmt-needs)

[Sharing and collaborating with my project team](#sharing-and-collaborating-with-my-project-team)

[Keeping the tracker up-to-date](#keeping-the-tracker-up-to-date)

[Summarizing progress on the project](#summarizing-progress-on-the-project)

[Wrapping up and moving onto the next project](#wrapping-up-and-moving-onto-the-next-project)

[Transitioning to another solution](#transitioning-to-another-solution)

[\[Post-MVP\] More use cases and complex project mgmt](#[post-mvp]-more-use-cases-and-complex-project-mgmt)

[Appendix](#appendix)

---

# Problem {#problem}

**Lots of teams and businesses use spreadsheets to track, organize, and manage data[^1], but they create a lot of manual work, fragmented duplicate data, and opportunity for human error[^2].**

* Spreadsheets were created for financial analysts and are great for analysis/reporting, but they’re poorly suited for tracking and managing data for business processes.  
* Managing business processes (tasks, inventory, cases, ...) requires data to be clean, centralized, and up-to-date, but spreadsheets lack structure and relationships to do so.  
* Alternative solutions (custom apps, databases, dedicated enterprise IT solutions) have high dev/support costs, steep learning curves, or aren’t flexible enough[^3].

## Vision & Opportunity  {#vision-&-opportunity}

**Offer a lightweight database solution for knowledge workers that is as easy to use as spreadsheets, but works like a real database.** We believe this is a strong complementary offering in the product portfolio (a lightweight MS Access), which will drive IT spend and user retention. Strategically, this data play helps businesses structure and bring more of their business data into the cloud, enabling opportunities to further create insights and automate workflows.

* There’s a **gap for a low/no-code database solution** between app builders and spreadsheets[^4].  
* Competitors in the market have shown that there’s a **$1B+ opportunity** in this area[^5].  
* Forrester reports low-code software platform market spend to hit **$21B by 2022[^6]**.

See: [strategy doc](#), [future press release](#), [competitive analysis](#).

## Target Use Cases {#target-use-cases}

Based on the top use cases for “tracking data in spreadsheets” from survey results and UXR[^7]:

1. General knowledge workers tracking their personal tasks.  
2. Project/Program Managers responsible for managing a project.  
3. Customer Support Specialists responsible for a pipeline of tickets/cases/requests[^8].

# Proposed Solution {#proposed-solution}

**Offer a lightweight database tool that is “as easy to use as spreadsheets, but works like a real database.”**

* We will **focus on lightweight project management first**. It is a common target use case and with high usage, and can be supported with less scope and fewer dependencies.  
* Our 3 key MVP value prop statements:  
  1. **Easy to use as a spreadsheet** (the vitamin)  
  2. **Can keep your data clean** (the painkiller)  
  3. **Can automate actions** (the steroid)

## Goals {#goals}

* Help people easily input, structure, and track data to get their job done.  
* Automate data changes and workflow handoffs to reduce busywork.  
* Promote sharing and reuse of business data to avoid duplicate data silos.

Non-Goals

* Supporting data analysis and reporting use cases, we’ll integrate with spreadsheets for that.  
* Supporting developer needs. We plan to offer an API, but not our immediate focus.

Y1 Success Metrics

|  | GOALS | SIGNALS | METRICS | TARGETS |
| ----- | ----- | ----- | ----- | ----- |
| **Engagement & Adoption** | Users find the product valuable. Grow user base | User interaction. Users returning. User base size. | **Weekly active users** **1-wk retention rate** **7d stickiness** (% 7DAU who return) **MoM 28DAU growth rate** | **\>X** 7DAUs **\>X%** 1-wk retention **\>X%** 7d stickiness **\>X%** MoM user growth |
| **Business Value** | Businesses stick with the product. | Businesses using the product. | **Monthly active domains** (\# of customers on the site over 28d) | **\>X** 28DA domains |

## Conceptual Model {#conceptual-model}

Here’s the high-level conceptual model for the key parts of the product:

* **Tables are containers for a list of data viewed via a grid-UI.** It has a defined set of columns, which define the table “schema,” and an ordered list of **rows or records** that have a value per column.  
* **Workspaces are a way to group tables together in a tabbed view,** making it easy to switch between tables as you work (like tabs in a spreadsheet). Tables can be in more than one workspace.  
* **Columns are a way to keep the data clean and consistent.** They have a defined type (text, \#, date, person, etc), or link/reference another table (acts like a VLOOKUP in a way).  
* **Views** **are a way to show a customized, controlled view of the data.** Views are associated with a table and you can create multiple views with different grouping, filters, sorting, or layouts.  
  * Post-MVP, a special view is a “**intake form**”, which can be a published form url.  
* **Triggers are a way to automate mundane actions on table row content**. Triggers are defined at a table level and you can create multiple triggers to fire automatically based on certain conditions.  
* **Access permissions (Access Control List or ACL) allow users to share with others,** to collaborate or share data. ACLs are set at Tables and Workspaces separately, eventually also for Views.

Strawman for high-level navigation  
 

## Requirements {#requirements}

**Focus on an MVP that solves for the first use case: knowledge workers who need to manage projects.**   
Phasing starts with lightweight task mgmt first, and then expands to support more complex project mgmt. 

Requirements are organized by critical journeys for [the user lifecycle](#):

1. Assessing a solution for my project mgmt needs  
2. Sharing and collaborating with my project team  
3. Keeping the tracker up-to-date  
4. Summarizing progress on the project  
5. Wrapping up and moving onto the next project  
6. Transitioning to another solution

Legend  
**\[P0\]** \= MVP for customer release  
**\[P1\]** \= Important for delightful experience  
**\[P2\]** \= Nice-to-have

### Assessing a solution for my project mgmt needs {#assessing-a-solution-for-my-project-mgmt-needs}

*Onboarding*

* **\[P0\]** Anyone can login with their Google account to try the app.  
* **\[P0\]** Users can access help resources from anywhere in the app.  
* **\[P0\]** Team can monitor the user funnel.  
* **\[P1\]** First-time users can get an onboarding intro to the app to learn how to use it.  
* **\[P1\]** Anyone can find and learn more about the app without signing in (mktg page).

*Setting up a tracker for my project*

* **\[P0\]** Users can see a list of their workspaces and the tables in them.  
* **\[P0\]** Users can create a new project tracker workspace from a template.  
  * [Mini-PRD for template gallery](#).  
* **\[P0\]** Users can create a new workspace from scratch.  
* **\[P1\]** Users can import from a spreadsheet to create a workspace.  
* **\[P2\]** Users can see a way to get started if they don’t have any workspaces/tables.

*Customizing the tracker*

* **\[P0\]** Users can add/edit/reorder/delete tables in a workspace.  
* **\[P0\]** Users can add/edit/reorder/delete columns in a table.  
* **\[P0\]** Users can set a data type for a column to ensure the data stays consistent.  
  * [Mini-PRD for MVP data types](#).  
* **\[P0\]** Users can add/edit/delete rows in a table.  
* **\[P0\]** Team can understand most commonly used features and data types.

*Understand billing/pricing*

* **\[P0\]** Users can submit feedback / ask questions to the team.  
* **\[P1\]** Users can understand the expected pricing for the product.  
* **\[P2\]** Users can tell when they’ve hit app limits.  
* **\[P2\]** Users can upgrade to a higher paid tier.

### Sharing and collaborating with my project team {#sharing-and-collaborating-with-my-project-team}

* **\[P0\]** Users can share their workspace with others on their team.  
  * [Mini-PRD for the sharing & access levels](#).  
* **\[P0\]** Collaborators can update the data in a workspace/table if they have access.  
* **\[P0\]** Users can adjust the sorting and filtering of data in the table.  
  * [Mini-PRD for table sort/filter options](#).  
* **\[P1\]** Users can create separate “views” to show only rows that are relevant to them.  
  * [Mini-PRD for saving custom views](#).  
* **\[P1\]** Users can receive an email notification if a workspace/table has been shared with them.  
* **\[P1\]** Collaborators can tell if other collaborators are actively editing the same table.  
* **\[P2\]** Collaborators can add comments to rows in a table.  
  * [Mini-PRD for table comments](#).

### Keeping the tracker up-to-date {#keeping-the-tracker-up-to-date}

* **\[P0\]** Users can link a row to another row so you can connect tasks to projects.  
* **\[P0\]** Users can configure automatic email notifications / data updates.  
  * [Mini-PRD for automatic triggers & actions](#).  
* **\[P1\]** Users can easily copy and paste data to fill in data faster.  
* **\[P1\]** Users can duplicate rows or columns to fill in data faster.  
* **\[P2\]** Users can update information across multiple rows in bulk.

### Summarizing progress on the project {#summarizing-progress-on-the-project}

* **\[P0\]** Users can group data together to easily see what is done vs in progress or what's left in a milestone.  
  * [Mini-PRD on table groupings](#).  
* **\[P1\]** Users can configure a summary of the data in a group, to understand %done in a milestone.  
* **\[P2\]** Users can see a live summary of the status of linked tasks for each project in a table.  
  * [Mini-PRD for summary columns](#).  
* 

### Wrapping up and moving onto the next project {#wrapping-up-and-moving-onto-the-next-project}

* **\[P0\]** Users can delete a workspace if they own it.  
* **\[P1\]** Users can change ownership of a workspace/table if they are the owner.  
* **\[P2\]** Users can indicate favorite workspaces and tables they commonly use.

### Transitioning to another solution {#transitioning-to-another-solution}

* **\[P0\]** Users can logout of the app.  
* **\[P0\]** Users can delete their account and all the data in it.  
* **\[P1\]** Users can export a workspace/table to a spreadsheet or CSV file.  
* **\[P2\]** Users can use an API to programmatically manage their workspace/table data in bulk.

### \[Post-MVP\] More use cases and complex project mgmt {#[post-mvp]-more-use-cases-and-complex-project-mgmt}

* **Expand view layouts/types:** Kanban board, Calendar, Ticketing queue, Input forms  
* **Expand column types:** Attachments, Formulas  
* **Expand integrations:** Sync with spreadsheets, 3P integrations  
* **Expand permissions:** View-level permissions

## Appendix {#appendix}

*Product/design considerations* 

* [Not building off spreadsheets](#)  
* [Focus on non-technical knowledge workers vs app builders](#)  
* [Simplified MVP sharing model](#)  
* [Updated ACL model and long-term proposal](#)

*GTM*

* [Product positioning in portfolio](#)  
* [Example press release](#)  
* [Proposed pricing and packaging strategy](#)

[^1]:  [Customer IT admin survey: % companies that use spreadsheet for tracking data](#).

[^2]:  [Market Research & Pain Points](#), [Customer pain points survey analysis](#).

[^3]:  [Customer IT admin survey: reasons for switching](#), [SMB customer interviews](#).

[^4]:  [OurApp strategy doc: SWOT analysis](#)

[^5]:  [Market competitive analysis](#).

[^6]:  [What You Need To Know About The Low-Code Market (Forbes)](https://www.forbes.com/sites/tomtaulli/2019/02/17/what-you-need-to-know-about-the-low-code-market/#6cdfb085afc4).

[^7]:   [Customer IT admin survey: top use cases](#), [Customer pain points survey: top use cases](#).

[^8]:  This can be support tickets, or sales leads, or interview candidates, or expense requests, etc.