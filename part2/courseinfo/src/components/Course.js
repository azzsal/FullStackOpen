const Header = (props) => {
  return (
    <h1>{props.course_name}</h1>
  )
}

const Part = ({ part }) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />
      })}
    </>
  )
}

const Total = ({ parts }) => {
  return (
    <strong>Total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</strong>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course_name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course