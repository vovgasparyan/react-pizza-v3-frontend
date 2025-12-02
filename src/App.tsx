import React from 'react';
import axios from 'axios';
import './scss/app.scss';
import { Header, Categories, Sort, PizzaBlock } from './components/index';


function App() {

  const [pizzas, setPizzas] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:4900/pizzas")
      .then((res) => {
        setPizzas(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Ошибка загрузки пицц:", err);
      });
  }, []);

  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                pizzas.map((obj: any) => (
                  <PizzaBlock key={obj.id || obj._id} {...obj} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
