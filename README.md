# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

# AutoPartsService 🚗⚙️

**AutoPartsService** is a service for managing auto parts data, developed using the **SAP Cloud Application Programming Model (CAP)** and **Node.js**. The project provides an OData API for database interaction and a foundational structure for the user interface.

## 📁 Project Structure

The project follows the standard SAP CAP architecture and includes the following main directories and files:

| Folder / File | Description |
|---|---|
| `app/` | Contains UI frontend code (e.g., SAPUI5 or SAP Fiori Elements). |
| `db/` | Contains domain models (database schemas) in CDS format and initial mock data. |
| `srv/` | Contains service models (OData) and business logic (JavaScript/TypeScript handlers). |
| `test/` | Folder for writing and storing automated tests. |
| `package.json` | Project metadata, dependencies, and scripts. |
| `db.sqlite` | Local SQLite database used for development and testing. |

## 🛠 Technologies

- **Backend:** Node.js, SAP CAP (Core Data Services / CDS)
- **Database:** SQLite (for local development)
- **Frontend:** HTML, CSS, JavaScript (SAP Fiori / SAPUI5)
- **Protocol:** OData (RESTful API)

## 🚀 Quick Start

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (version 18 or higher is recommended)
- The `@sap/cds-dk` global utility (install it via `npm install -g @sap/cds-dk`)

### Installation and Running

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/danila-mikhaliou-LX/AutoPartsService.git](https://github.com/danila-mikhaliou-LX/AutoPartsService.git)
   cd AutoPartsService

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).


## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
