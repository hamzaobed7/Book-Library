
import AppRoutes from "./Router/AppRouter";
import DataProvider from "./Context/ApiContext";
import { useState } from "react";

function App() {

  return (
        <DataProvider>

          <AppRoutes  />

        </DataProvider>
  );
}

export default App;