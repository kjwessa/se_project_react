import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import ModalWithForm from "./components/ModalWithForm";
// import ClothesSection from "./components/ClothesSection";

function App() {
  const weatherTemp = "90° F";
  return (
    <div>
      <Header />
      <Main weatherTemp={weatherTemp} />
      <Footer />
      <ModalWithForm title="New Garment">
        <label>
          name<input type="text" name="name " minLength="1" maxLength="30"></input>
        </label>
        <label>
          Image<input type="url" name="link " minLength="1" maxLength="30"></input>
        </label>
        <p>Select the weather type:</p>
        <div>
          <div>
            <input type="radio" id="hot" value="hot" />
            <label for="hot">Hot</label>
          </div>
          <div>
            <input type="radio" id="warm" value="warm" />
            <label for="warm">Warm</label>
          </div>
          <div>
            <input type="radio" id="cold" value="cold" />
            <label for="cold">Cold</label>
          </div>
        </div>
      </ModalWithForm>
    </div>
  );
}

export default App;
