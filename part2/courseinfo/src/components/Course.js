import Total from './Total'


const CourseDetails = (props) => {
 //  console.log(props.details[0].id)
   return (
       <ul>
           {props.details.map((detail)=> {
              //  id++;
              // console.log("Detail ",detail)
                return (
                    <div>
                        <li>{detail.name}{" "}{detail.exercises}</li>
                    </div>
                    )
                }
            )}
       </ul>
   )
}
const Course = (props) => {
    return (
        <div>
            {props.course.map((course) => {
           // console.log("Course",course.parts)
            return (
                <>
                    <h3 key = {course.id}>{course.name}</h3> 
                    <CourseDetails details = {course.parts}/>
                    <Total course = {course.parts}/>
                </>
                )}   
            )
            }

        </div> 
    )

    
}
export default Course