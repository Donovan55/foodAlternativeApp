import WorkoutList from "./WorkoutList";
import useFetch from './useFetch';

const Home = () => {
    const {data : workouts, isPending, error} = useFetch('http://localhost:8000/workouts');

    return (
        <div className="home">
            {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {workouts && <WorkoutList workouts={workouts} title="All Workouts!" />} 
        {/*evals left side first, so it doesnt err on right side*/}
        
        </div>
    );
}
 
export default Home;