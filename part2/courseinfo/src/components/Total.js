const Total = (props) => {
    let grandTotal = 0;
    props.course.reduce((total,item) => {
        grandTotal+=item.exercises;
    },0);
    return (
        <div>Total of {grandTotal} excercises.</div>
    )
}



export default Total;