import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import FoodList from './FoodList';
import useFetch from './useFetch';
const searchForm = document.querySelector('.search');
//import RNFS from "react-native-fs";
//import GetFood from './GetFood.mjs';

const Create = (searchTerm) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [creator, setCreator] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nutrition, setNutrition] = useState(<h2></h2>);
    //let uri = 'http://localhost:3000/foods?_sort=calories';
    const [uri, setUri] = useState('http://localhost:3000/foods?_sort=calories');
    const[highestFirst, setHighestFirst] = useState(false);
    const[sortingByWhat, setSortingByWhat] = useState('default');
    if(searchTerm)
    {
        //uri+= `&q=${searchTerm}`;
        console.log(searchTerm);
    }
    const {data : foods, isPending2, error} = useFetch(uri);
    const history = useHistory();

    
    const HandleFoodSearch = async (query) => {
        const params = {
            api_key: 'adGOkaniwDcX5OGdQwBKtAG4NnaCknGEsJrpcCX5',
            //query: 'cheddar cheese',
            //dataType: ["Survery (FNDDS)"],
            pagesize: 5,
        }
        const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=${encodeURIComponent(params.pagesize)}&api_key=${encodeURIComponent(params.api_key)}`
        async function getData() {
            return fetch(api_url)
            .then(response => response.json())
            
        }

        var info = await getData().then(data => {return (data).foods} )
        for(let i =0; i<params.pagesize; i++)
        {
            const doc = {
                brand : info[i].brandName,
                product : info[i].description,
                calories : info[i].foodNutrients[3].value,
                protein : info[i].foodNutrients[0].value,
                fats : info[i].foodNutrients[1].value,
                carbs : info[i].foodNutrients[2].value
            }
    
            await fetch('http://localhost:3000/foods', {
                method : 'POST',
                body : JSON.stringify(doc),
                headers : { 'Content-Type': 'application/json'}
            });

        } 
        //Create(searchForm.searchTerm.value.trim());
        console.log("Search term is "+ title);
        console.log("Url is " + uri);
        setUri('http://localhost:3000/foods?_sort=calories' + `&q=${title}`)
        console.log("Url is " + uri);
        setIsSubmitted(true);
        //uri = 'http://localhost:3000/foods?_sort=calories&q=egg';
    }
    
    
    const HandleSortByProtein = () => {
        if(highestFirst)
        {
            setUri('http://localhost:3000/foods?_sort=protein&_order=desc' + `&q=${title}`);
        }
        else
        {
            setUri('http://localhost:3000/foods?_sort=protein&_order=inc' + `&q=${title}`);
        }
        setSortingByWhat("Protein");
        console.log("Sorting by Protein");
    }

    const HandleSortByCalories = () => {
        if(highestFirst)
        {
            setUri('http://localhost:3000/foods?_sort=calories&_order=desc' + `&q=${title}`);
        }
        else
        {
            setUri('http://localhost:3000/foods?_sort=calories&_order=inc' + `&q=${title}`);
        }
        setSortingByWhat("Calories");
        console.log("Sorting by Cals");
    }

    const HandleSortByCarbs = () => {
        if(highestFirst)
        {
            setUri('http://localhost:3000/foods?_sort=carbs&_order=desc' + `&q=${title}`);
        }
        else
        {
            setUri('http://localhost:3000/foods?_sort=carbs&_order=inc' + `&q=${title}`);
        }
        setSortingByWhat("Carbs");
        console.log("Sorting by Carbs");
    }

    const HandleSortByFats = () => {
        if(highestFirst)
        {
            setUri('http://localhost:3000/foods?_sort=fats&_order=desc' + `&q=${title}`);
        }
        else
        {
            setUri('http://localhost:3000/foods?_sort=fats&_order=inc' + `&q=${title}`);
        }
        setSortingByWhat("Fats");
        console.log("Sorting by Fats");
    }

    const HandleHighestFirst = () => {
        setHighestFirst(true);
        console.log("Highest First");
    }

    const HandleLowestFirst = () => {
        setHighestFirst(false);
        console.log("Lowest First");
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        
    }

    console.log('Component re-rendered');
    
    return ( 
        <div className="create">
            <h2>Find your food alternatives!</h2>
            <form onSubmit={handleSubmit} class="search">
                <label>Food Item:</label>
                <input
                    type = "text"
                    name = "searchTerm"
                    required
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {!isPending && <button onClick={() => HandleFoodSearch(title)}>Find me better options!</button>}
                {isPending && <button disabled>Finding better options...</button>}
                

                
                <p></p>
                {isSubmitted && <button onClick ={() => HandleHighestFirst()} className={`create-button ${highestFirst ? 'bold' : ''}`}>Highest First</button>}
                {isSubmitted && <button onClick ={() => HandleLowestFirst()} className={`create-button ${!highestFirst ? 'bold' : ''}`}>Lowest First</button>}
                
                <p></p>
                {isSubmitted && <button onClick ={() => HandleSortByCalories()} className={`create-button ${sortingByWhat == "Calories" ? 'bold' : ''}`}>Sort by Calories</button>}
                {isSubmitted && <button onClick ={() => HandleSortByProtein()} className={`create-button ${sortingByWhat == "Protein" ? 'bold' : ''}`}>Sort by Protein</button>}
                {isSubmitted && <button onClick ={() => HandleSortByCarbs()} className={`create-button ${sortingByWhat == "Carbs" ? 'bold' : ''}`}>Sort by Carbs</button>}
                {isSubmitted && <button onClick ={() => HandleSortByFats()} className={`create-button ${sortingByWhat == "Fats" ? 'bold' : ''}`}>Sort by Fats</button>}
                
                {isSubmitted && foods && <FoodList foods={foods} title="All Food Searches!" />} 
                
                
            </form>
            
        </div>
        
     );
}
 
export default Create;