const Persons = ({ perosonsToShow }) => {
    return (
        <div>{perosonsToShow.map((person) => (
            <div key={person.name}>
                {person.name} {person.number}</div>))}
        </div>
    )
}
export default Persons