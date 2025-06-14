import { useEffect, useState } from 'react';
import './App.css';
import { Nutrition } from './Nutrition';
import RipplePage from './Ripple/RipplePage';
import Swal from 'sweetalert2';

function App() {
  const APP_ID = "6de0115b";
  const APP_KEY = "334f1ba8e1a6c6fddfed20203585a585";
  const APP_URL = "https://api.edamam.com/api/nutrition-details";
  // const FULL_URL = "https://api.edamam.com/api/nutrition-details?app_id=6de0115b&app_key=334f1ba8e1a6c6fddfed20203585a585";

  const [mySearch, setMySearch] = useState("");
  const [wordSubmit, setWordSubmit] = useState("1 avocado");
  const [myResult, setMyResult] = useState();
  const [stateRipper, setStateRipper] = useState(false);

  useEffect(() => {
    // console.log("UseEffect");
    if (wordSubmit !== '') {
      let ingr = wordSubmit.split(/\s*[,,;,+,\n,\r]\s*/);
      // console.log(ingr);
      getResult(ingr);
    }
    else {
      // console.log("Empty");
      // alert('You have not entered anything');
      Swal.fire({
        title: "You have not entered anything",
        text: "",
        icon: "warning",
        confirmButtonColor: '#c3d196'
      });
    }
  }, [wordSubmit])

  const getResult = async (ingr) => {
    setStateRipper(true);

    const response = await fetch(`${APP_URL}?app_id=${APP_ID}&app_key=${APP_KEY}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingr: ingr })
    });

    if (response.ok) {
      setStateRipper(false);
      const data = await response.json();
      // console.log(data);
      setMyResult(data);
    } else {
      setStateRipper(false);
      // alert('Ingredients entered incorrectly');
      Swal.fire({
        title: "Ingredients entered incorrectly",
        text: "",
        icon: "warning",
        confirmButtonColor: '#c3d196'
      });
    }
  }

  const myAnalyseSearch = (e) => {
    // console.log(e.target.value);
    setMySearch(e.target.value);
  }

  const executeSearch = (e) => {
    e.preventDefault(e);
    setWordSubmit(mySearch);
  }

  return (
    <div className="App container">
      { stateRipper && <RipplePage /> }

      <div>
        <h1>Nutrition Analysis</h1>
      </div>

      <div>
        <form onSubmit={executeSearch}>
          <input onChange={myAnalyseSearch} placeholder="Search..." className="inp" value={mySearch} />
          <button type="submit" className="btn">Search</button>
        </form>
      </div>

      <div>
        <p className="kkl">Введенные продукты - {wordSubmit}</p>
      </div>

      <div>
        {
          myResult && <p className="kkl">Энергетическая ценность - <b>{myResult.calories}</b> kcal</p>
        }

        {
          myResult && Object.values(myResult.totalNutrients)
            .map(({ label, quantity, unit }, index) =>
              <Nutrition key={index}
                label={label}
                quantity={quantity}
                unit={unit}
              />
            )
        }

      </div>
    </div>
  );
}

export default App;