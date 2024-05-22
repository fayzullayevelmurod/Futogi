import { Footer, Header } from "./layouts";
import { AppRoutes } from "./routes";
function App() {
  return (
    <>
      <Header />
      <main className="main">
        <AppRoutes />
      </main>
      <Footer />
    </>
  );
}

export default App;
