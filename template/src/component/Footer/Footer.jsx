import scriptJS from "./script.js?url&worker"
import "./Footer.css"

export default function Footer() {
    return (
        <footer>
            <hr />
            <p>HTML generated at {new Date().toISOString()}</p>
            <p id="access-time">Site accessed at </p>
            <script type="module" src={scriptJS} />
        </footer>
    )
}
