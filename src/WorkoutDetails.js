import { useHistory, useParams } from "react-router-dom";
import useFetch from './useFetch';

const WorkoutDetails = () => {
    const {id} = useParams();
    const {data : workout, error, isPending } = useFetch('http://localhost:8000/workouts/' + id)
    const history = useHistory();

    const handleClick = () => { 
        fetch('http://localhost:8000/workouts/' + id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/');
        })
    }

    return ( 
        <div className="workout-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {workout && (
                <article>
                    <h2>{workout.title}</h2>
                    <p>Created by {workout.creator}</p>
                    <div>{workout.body}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
     );
}
 
export default WorkoutDetails;