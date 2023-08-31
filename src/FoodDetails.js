import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const FoodDetails = () => {
    const {id} = useParams();
    const {data : food, error, isPending } = useFetch('http://localhost:3000/foods/' + id);
    const history = useHistory();

    const handleClick = () => { 
        fetch('http://localhost:3000/foods/' + food.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="food-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {food && (
                <article>
                    <h2>{food.product}</h2>
                    <p>Produced by {food.brand}</p>
                    <div>Calories: {food.calories}</div>
                    <div>Protein: {food.protein}</div>
                    <div>Fats: {food.fats}</div>
                    <div>Carbs: {food.carbs}</div>
                    <button onClick={handleClick}>Delete</button>
                    <button onClick={() => history.goBack()}>Go Back</button> {/* New Back Button */}
                </article>
            )}
        </div>
     );
}
 
export default FoodDetails;