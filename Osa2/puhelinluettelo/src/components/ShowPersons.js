const ShowPersons = ({ perosonsToShow, deletePerson }) => {
    return (
        <div>{perosonsToShow.map((person) => (
            <div key={person.name}>
                {person.name} {person.number} <button onClick ={() => deletePerson(person.id)}>Delete</button>
                </div>))}
        </div>
    )
}
export default ShowPersons