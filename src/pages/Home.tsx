import React from "react";
import axios from 'axios';
import { Categories, Sort } from '../components';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isPizzaLoading, setPizzaLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get("http://localhost:4900/pizzas")
            .then((res) => {
                setPizzas(res.data);
                setPizzaLoading(false);
            })
            .catch((err) => {
                console.error("Статус:", err.response.status);
                console.error("Сообщение:", err.response.data.message);
            });
    }, []);

    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isPizzaLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : pizzas.map((obj: any) => (<PizzaBlock key={obj.id || obj._id} {...obj} />))
                }
            </div>
        </>
    )
}