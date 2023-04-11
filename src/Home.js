import FoodList from "./FoodList";
import useFetch from './useFetch';
import {useState, useEffect} from 'react';
import Create from "./Create";

const Home = () => {
    let uri = 'http://localhost:3000/foods?_sort=calories&_order=desc';
    /*if (1 == 1)
    {
        let termterm = "pizza";
        uri += `&q=${termterm}`
        //console.log("title is: " + title)
    } */ 
    const {data : foods, isPending, error} = useFetch(uri);
    const [title, setTitle] = useState('');
    const searchForm = document.querySelector('.search');


    return (
        <div className="home">
            {error && <div>{error}</div>}
        
        {isPending && <div>Loading...</div>}
        

        <label>Food Item:</label>
            <form className="search">
                <input type="text" name="term" placeholder="search term" />
            </form>
            
        {foods && <FoodList foods={foods} title="All Food Searches!" />} 
        {/*evals left side first, so it doesnt err on right side*/}
        
        </div>
    );
}

 
export default Home;