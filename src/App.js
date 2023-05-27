import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <main>
        <WeatherCard day={true} type="clear" />
        <section id="card Section"></section>
      </main>
    </div>
  );
}

export default App;
