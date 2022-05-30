const Course = ({course}) => {
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
const Header = ({course}) => <h1>{course}</h1>
  
const Content = ({parts}) =>
    <>
      {parts.map(part => <p key={part.id}> <Part part={part} /></p>)}
    </>
  
const Part = ({part}) => <>{part.name} {part.exercises}</>
  
  
const Total = ({parts}) => <>
    <b>Total of exercises </b>
    {parts.reduce((sum, part) => sum + part.exercises, 0)}
</>

export default Course