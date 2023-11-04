import MovieList from "./components/movieList/MovieList";
import NavBar from "./components/navBar/NavBar";
import { createStore } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { Provider } from "react-redux";
import "./App.css";

const store = createStore(rootReducer);

function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
        <div className="container">
          <MovieList />
        </div>
      </Provider>
    </>
  );
}

export default App;
