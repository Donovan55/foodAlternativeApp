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
                    <p>Created by {food.brand}</p>
                    <div>{food.calories}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default FoodDetails;