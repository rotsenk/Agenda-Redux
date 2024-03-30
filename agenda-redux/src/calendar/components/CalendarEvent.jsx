export const CalendarEvent = ({ event }) => {
    // d e s t r u c t u r i n g
    const { title, user } = event;

    // titulo del evento
    // nombre del usuario que creó ese evento
    return(
        <>
            <strong>{ title }</strong>
            <span> - { user.name } </span> 
        </>
    )
}