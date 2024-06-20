import { Footer, Header } from "./layouts";
import { AppRoutes } from "./routes";
import { BasketProvider } from "./context/BasketContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BasketProvider>
      <ToastContainer />
      <Header />
      <main className="main">
        <AppRoutes />
      </main>
      <Footer />
    </BasketProvider>
  );
}

export default App;
