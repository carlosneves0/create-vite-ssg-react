export default function NavBar({ links }) {
    return (
        <nav>
            <ul>
                {links.map(({ text, href, isDisabled }) => (
                    <a
                        key={href}
                        href={href}
                        className={isDisabled ? "disabled" : undefined}
                    >
                        <li>{text ?? href}</li>
                    </a>
                ))}
            </ul>
        </nav>
    )
}
