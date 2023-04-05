const searchResults = () => {
    
    const renderPosts = async () => {
        let uri = 'http://localhost:3000/foods';
    
        const res = await fetch(uri);
        const foods = await res.json();
        console.log(foods);
    }
    
    windows.addEventListener('DOMContentLoaded', () => scryRenderedDOMComponentsWithClass());
    
    
    
    
    return ( 

    


     );
}
 
export default searchResults;


