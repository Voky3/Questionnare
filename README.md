# OnlineDotaznik

- Last updated: 9.4.2025  
- Project using ASP.NET backend with pre-compiled React + TS frontend

---

## 🛠️ Setup

1. Download and open the `.sln` in **Visual Studio**  
2. Make sure `OnlineDotaznik.API` is set as the **Startup project**
3. **Create the database**:
   - Open **SQL Server Management Studio** (or any alternative)
   - Connect to your local SQL Server
   - Right-click `Databases` → **New Query**
   - Open `create_database.sql` from the `OnlineDotaznik.API` folder

	<div style="display: flex; align-items: flex-start;">
   <img src="./ReadmeSources/openScript.png" alt="" style="width: 60%; margin-right: 20px;"/>
   </div>
   <br>
   - Press <b>Execute</b>
   <div style="display: flex; align-items: flex-start;">
   <img src="./ReadmeSources/execute.png" alt="" style="width: 50%; margin-right: 20px;"/>
   </div>

4. Run the project in Visual Studio  
   → The prebuilt frontend will open in your browser

---

## 🌐 Frontend

- React (with TypeScript) + Vite project
- Prebuilt version is embedded in `OnlineDotaznik.API/wwwroot` => can be deleted if you want to work actively in React
- Full source is located in `/frontend` (not part of `.sln`)
- Configurations: prepared in `.env` and `.env.production`

If you want to edit and rebuild the frontend:

```bash
cd frontend
npm install
npm run build
