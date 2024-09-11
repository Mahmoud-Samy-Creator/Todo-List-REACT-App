export function ToastMessage({ style, message }) {
    return (
        <div style={style}>
            <span>{message} </span>
        </div>
    );
}