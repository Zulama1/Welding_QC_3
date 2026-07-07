
A real-time, Role-Based Access Controlled (RBAC) data logging and analytics system engineered for heavy industrial engineering fabrication pipelines, specifically tailored for high-pressure boiler piping installations at **NTPC Darlipali**. This system coordinates Non-Destructive Testing (NDT) workflows—including Radiography Testing (RT), Phased Array Ultrasonic Testing (PAUT), and Magnetic Particle Inspection (MPI)—and seamlessly reconciles them with Pre-Heating/Post-Weld Heat Treatment (PWHT) compliance criteria.


## 🚀 System Architecture & Impact


```

┌────────────────┐       ┌───────────────────────┐       ┌──────────────────────┐
│  React Client  │ <───> │  Express.js Gateway   │ <───> │    MySQL Database    │
│ (Tailwind CSS) │       │  (Sequelize / Knex)   │       │ (JSON Column Store)  │
└────────────────┘       └───────────────────────┘       └──────────────────────┘

```

* **Data Centralization:** Replaces fragmented Excel spreadsheets with a centralized, relational source of truth, eliminating data silos across independent testing branches.
* **Role-Based Access Isolation:** Restricts field parameter modification, results updates, and artifact verification exclusively to certified verifiers while allowing supervisors to manage structural offer sheets.
* **Audit Velocity:** Features a scroll-locked, timeline-sorted analytics dashboard with dynamic date-boundary filtering to track project velocity and structural pass rates instantly.

---

## 🛠️ Tech Stack

* **Frontend:** Single Page Application (SPA) built via React (v18+) utilizing functional context wrappers for global state tracking, custom Tailwind CSS layout engines, and asynchronous token transmission handlers.
* **Backend Framework:** Express.js (Node.js) handling low-latency RESTful endpoint orchestration, asynchronous route middleware pooling, and strict request validation layers.
* **ORM:** Sequelize / Knex.js abstracting complex queries and relational mapping patterns into clean object models.
* **Database Management:** MySQL Server storing core spatial structural tracking attributes inside indexed tables, with nested testing sub-sequences neatly managed inside queryable JSON cell structures.

---

## ⚙️ Core Algorithmic & Logical Pipelines

### 1. Unique Identification Signature
To prevent duplicate entry exceptions across alternative diagnostic centers, every registered component features a compressed, immutable alphanumeric code string generated via spatial relational variables:
```text
Unique ID = Joint ID + Area System + Coil No + Tube No

```

### 2. Case-Insensitive Relational Filtering

The system handles strict pipeline dependencies across sequential modules. Components entering the Post-Weld Heat Treatment node are automatically evaluated and filtered using case-insensitive criteria to ensure data continuity:

```text
Filter Condition => (row.pwht_required === true) || (String(row.pwht_required).toLowerCase() === "yes")

```

### 3. Progressive NDT Lifecycle Matrix

Welds that fail initial checks can be run through infinite repair and inspection re-cycles. The system logs a continuous sequence matrix tracking incremental attempt cycles independently:

```text
Attempt Cycle = [1st Attempt, Attempt #2, ..., Attempt #N]

```

Each cycle logs specific categorical evaluations (*Pending*, *Pass*, *Fail*) along with strict defect taxonomy data.

### 4. Aggregate Performance Velocity

To track project compliance metrics, the dashboard aggregates row-level records by execution date to solve for production pass benchmarks:

```text
Pass Rate (%) = (Passed Joints / Total Completed Joints) * 100

```

---

## ⚙️ Installation & Setup

### Prerequisites

* **Node.js:** v18.x or higher
* **MySQL Server:** v8.x or higher

### 1. Database Configuration

Log into your MySQL terminal or GUI environment and establish your base data schema:

```sql
CREATE DATABASE welding_qc_db;

```

### 2. Backend Setup

1. Navigate into the backend root workspace directory:
```bash
cd backend

```


2. Install the necessary system and runtime dependencies:
```bash
npm install

```


3. Establish a `.env` configuration file in the backend root directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_username
DB_PASS=your_password
DB_NAME=welding_qc_db
JWT_SECRET=your_system_secret_token

```


4. Fire up the development engine backend server instance:
```bash
npm run dev

```



### 3. Frontend Setup

1. Open a new terminal cell and navigate into the frontend directory:
```bash
cd frontend

```


2. Fetch frontend package configurations:
```bash
npm install

```


3. Execute the local hot-reload compilation framework:
```bash
npm run dev

```


4. Access the web client instance via your browser viewport at `http://localhost:5173`.

## 📄 License

This project is structured as open-source empirical proof of structural architectural stability under the [MIT License](https://www.google.com/search?q=LICENSE).