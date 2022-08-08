export const Error = (props) => {
    return (
        <p
            id={props.message === '' ? "error-paragraph-disabled" : "error-paragraph"}
        >
            {props.message}
        </p>
    );
}