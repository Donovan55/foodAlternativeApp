import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [creator, setCreator] = useState('mario');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

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
            history.push('/');
        })


    }

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Workout title:</label>
                <input
                    type = "text"
                    required
                    value = {title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Workout body:</label>
                <textarea
                    required
                    value = {body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <label>Workout creator</label>
                <select
                    value = {creator}
                    onChange={(e) => setCreator(e.target.value)}  
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add workout</button>}
                {isPending && <button disabled>Adding workout...</button>}
            </form>
        </div>
     );
}
 
export default Create;