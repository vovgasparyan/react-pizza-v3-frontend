import React from "react";
import axios from 'axios';
import { Categories, Sort } from '../components';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [isPizzaLoading, setPizzaLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState<string | null>(null); // for categoryId
    const [sortType, setSortType] = React.useState({
        name: "популярности", sortProperty: "popular", order: "desc"
    }); // for search filters

    React.useEffect(() => {
        setPizzaLoading(true);
        axios.get("http://localhost:4900/pizzas", {
            params: {
                ...(categoryId !== null && { category: categoryId }),
                sort: sortType.sortProperty,
                order: sortType.order
            }
        })
            .then((res) => {
                setPizzas(res.data.pizzas);
                setPizzaLoading(false);
            })
            .catch((err) => {
                console.error("Статус:", err.response.status);
                console.error("Сообщение:", err.response.data.message);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    console.log(categoryId, sortType);

    return (
        <div className="container">
            <div className="content__top">
                <Categories categoryObjectId={categoryId} onClickChangeCategory={(id: string) => setCategoryId(id)} />
                <Sort value={sortType} onClickChangeSortType={(i: any) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isPizzaLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : pizzas.map((obj: any) => (<PizzaBlock key={obj.id || obj._id} {...obj} />))
                }
            </div>
        </div>
    )
}