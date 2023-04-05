import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
//import GetFood from './GetFood.mjs';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [creator, setCreator] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nutrition, setNutrition] = useState(<h2></h2>);
    const history = useHistory();
    
    var resultsMap2 = new Map()
    const mapIter = resultsMap2.keys();
    
    const handleFoodSearch = async (query) => {
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
        //getData().then(data => console.log(data.foods[0].brandOwner + " : " + data.foods[0].description + "\n"));
        var info = await getData().then(data => {return (data).foods});
        var nutritionInfo = await getData().then(data => {return (data).foods} )
        
        var resultsMap = new Map();
        console.log("Map created");
        for(let i = 0; i < 5; i++)
        {
            console.log("loop entered");
            var nutritionDict = [];
            var nutrients = nutritionInfo[i].foodNutrients;
            for(let j = 0; j < 5; j++)
            {
                nutritionDict.push({Nutrient : nutrients[j].nutrientName, Grams :  nutrients[j].value})
                
            }
            resultsMap.set(info[i].brandName +', '+ info[i].description,nutritionDict)
        }
        resultsMap2.clear();
        for(let i = 0; i < 5; i++)
        {
            var nutritionDict = {}
            var nutrients = nutritionInfo[i].foodNutrients
            for(let j = 0; j < 10; j++)
            {
                var nutrient;
                var value;
                nutrient = ((nutrients[j].nutrientName).split(' ')[0]).split(',')[0]
                value = nutrients[j].value
                nutritionDict[nutrient] = value   
            }
            resultsMap2.set(info[i].brandName +', '+ info[i].description,nutritionDict)
        }
        console.log(resultsMap2);

        const mapToArray = Array.from(resultsMap2.entries());
		//this render function is where the new array is actually printed
		let newRender = mapToArray.map(([key, value]) => 
			<>
			<ul key={key}>{key}</ul>
			{Object.entries(value).map(([type, amount]) => <li>{`${type}: ${amount}` }</li>)    
            
			}
			</>
        );
        setNutrition(newRender);
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const workout = {title, body, creator}; 
        setIsPending(true);
        fetch('http://localhost:8000/workouts', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(workout)
        }).then(() => {
            console.log('new workout added');
            setIsPending(false);
            setIsSubmitted(true);
        })
    }

    return ( 
        <div className="create">
            <h2>Find your food alternatives!</h2>
            <form onSubmit={handleSubmit}>
                <label>Food Item:</label>
                <input
                    type = "text"
                    required
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {!isPending && <button onClick={() => handleFoodSearch(title)}>Find me better options!</button>}
                {isPending && <button disabled>Finding better options...</button>}
                
                {isSubmitted && <p>{title}</p>}

                {nutrition}
                
                
            </form>
            
        </div>
        
     );
}
 
export default Create;