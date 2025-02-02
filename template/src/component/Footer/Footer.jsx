import "./script.js?vanilla&inline"
import "./Footer.css"

export default function Footer() {
    return (
        <footer>
            <hr />
            <p>HTML generated at {new Date().toISOString()}</p>
            <p id="access-time">Site accessed at </p>
        </footer>
    )
}
