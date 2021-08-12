/*eslint-disable*/
import calculatePizzaPrice from "./calculatePizzaPrice";

export default function calculateOrderTotal(order, pizzas){
    return order.reduce((runnigTotal, singleOrder) => {
        const pizza = pizzas.find(singlePizza => singlePizza.id === singleOrder.id);
        return runnigTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
    }, 0);
}
