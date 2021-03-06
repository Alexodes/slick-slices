/* eslint-disable */
import React, {useState} from 'react';
import SEO from "../components/SEO";
import useForm from "../utils/useForm";
import {graphql} from "gatsby";
import Img from "gatsby-image";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";
import OrderStyles from "../styles/OrderStyles";
import MenuItemStyles from "../styles/MenuItemStyles";
import usePizza from "../utils/usePizza";
import PizzaOrder from "../components/PizzaOrder";
import calculateOrderTotal from "../utils/calculateOrderTotal";

export default function Orderpage({ data }){
    const pizzas = data.pizzas.nodes;
    const { values, updateValue} = useForm({
        name:'',
        email:''
    });
    const { order, addToOrder, removeFromOrder, error, loading, message, submitOrder } = usePizza({ pizzas, values });

    if(message) return <p>{message}</p>;

    return (
        <>
            <SEO title="Order a Pizza!"></SEO>
            <OrderStyles onSubmit={submitOrder}>
                <fieldset>
                    <legend>Your info</legend>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={values.name} onChange={updateValue} id="name"/>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={values.email} onChange={updateValue} id="email"/>
                    <input className="hummus" type="hummus" name="hummus" value={values.email} onChange={updateValue} id="hummus"/>
                </fieldset>
                <fieldset className="menu">
                    <legend>Menu</legend>
                    {pizzas.map(pizza => (
                        <MenuItemStyles key={pizza.id}>
                            <Img width="50" height="50" fluid={pizza.image.asset.fluid} />
                            <div><h2>{pizza.name}</h2></div>
                            <div>
                                {['S', 'M', 'L'].map(size => (
                                    <button
                                        type="button"
                                        key={size}
                                        onClick={() => addToOrder({id: pizza.id, size})}
                                    >{size} {formatMoney(calculatePizzaPrice(pizza.price, size))}</button>
                                ))}
                            </div>
                        </MenuItemStyles>
                    ))}
                </fieldset>
                <fieldset className="order">
                    <legend>Order</legend>
                    <PizzaOrder order={order} removeFromOrder={removeFromOrder} pizzas={pizzas}/>
                </fieldset>
                <fieldset>
                    <h3>Your Total is {formatMoney(calculateOrderTotal(order, pizzas))}</h3>
                    <div>
                        {error ? <p>Error: {error}</p> : ''}
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Placing Order...' : 'Order Ahead'}
                    </button>
                </fieldset>
            </OrderStyles>
        </>
    );
}

export const query = graphql`
    query {
        pizzas: allSanityPizza {
            nodes {
                name
                id
                slug { current }
                price
                image {
                    asset {
                        fluid(maxWidth: 100) {
                            ...GatsbySanityImageFluid
                        }
                    }
                }
            }
        }
    }
`;
