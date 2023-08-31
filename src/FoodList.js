import { Link } from "react-router-dom";

const FoodList = ({foods}) => {
    return ( 
        <div className="food-list">
            
            {foods.map(food => (
                <div className="food-preview" key={food.id} >
                    <Link to={`/foods/${food.id}`}>
                        <h2>{food.brand} { food.product }</h2>
                        <p>Calories: {food.calories}</p>
                        <p>Protein: {food.protein}</p>
                    </Link>
                    
                </div>
      ))}
        </div>
     );
}
 
export default FoodList;