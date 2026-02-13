import { useRoutes } from "react-router-dom";
import { ExpenseRoutes } from "./routes/expense-tracker";

function App() {
  const routes = useRoutes(ExpenseRoutes);
  return routes;
}

export default App;
