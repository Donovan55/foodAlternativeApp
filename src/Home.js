import FoodList from "./FoodList";
import useFetch from './useFetch';

const Home = () => {
    const {data : foods, isPending, error} = useFetch('http://localhost:3000/foods?_sort=calories');

    return (
        <div className="home">
            {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {foods && <FoodList foods={foods} title="All Food Searches!" />} 
        {/*evals left side first, so it doesnt err on right side*/}
        
        </div>
    );
}
 
export default Home;