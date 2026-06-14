
import AppRoutes from "./Router/AppRouter";
import DataProvider from "./Context/ApiContext";


function App() {

  return (
        <DataProvider>

          <AppRoutes  />

        </DataProvider>
  );
}

export default App;