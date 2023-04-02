import { Link } from "react-router-dom";

const WorkoutList = ({workouts, title}) => {
    
    
    
    return ( 
        <div className="workout-list">
            <h2>{title}</h2>
            {workouts.map(workout => (
                <div className="workout-preview" key={workout.id} >
                    <Link to={`/workouts/${workout.id}`}>
                        <h2>{ workout.title }</h2>
                        <p>Written by { workout.creator }</p>
                    </Link>
                    
                </div>
      ))}
        </div>
     );
}
 
export default WorkoutList;