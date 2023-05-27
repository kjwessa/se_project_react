import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
// import ClothesSection from "./components/ClothesSection";

function App() {
  const weatherTemp = "90° F";
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
    </div>
  );
}

export default App;
