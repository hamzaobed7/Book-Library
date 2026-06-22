
import AppRoutes from "./Router/AppRouter";
import DataProvider from "./Context/ApiContext";
import BookProvider from "./Context/BookContext";
import AuthonticationProvider from "./Context/AuthonticationContext";


function App() {

  return (
    <AuthonticationProvider>
       <BookProvider>
        <DataProvider>
          <AppRoutes  />
        </DataProvider>
        </BookProvider>
        </AuthonticationProvider>
  );
}

export default App;