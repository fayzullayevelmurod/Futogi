import { Footer, Header } from "./layouts";
import { AppRoutes } from "./routes";
import { BasketProvider } from "./context/BasketContext";

function App() {
  return (
    <BasketProvider>
      <Header />
      <main className="main">
        <AppRoutes />
      </main>
      <Footer />
    </BasketProvider>
  );
}

export default App;
