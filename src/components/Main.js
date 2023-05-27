import { defaultClothingItems } from "../utils/constants";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";

function Main({ weatherTemp }) {
  return (
    <main>
      <WeatherCard day={true} type="clear" weatherTemp={weatherTemp} />
      <section className="card__section">
        Today is {weatherTemp} / You may want to wear:
        <div className="card-section__items">
          {defaultClothingItems.map((clothingItem) => (
            <ItemCard clothingItem={clothingItem} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;
