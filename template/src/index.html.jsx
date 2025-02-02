import NavBar from "./component/NavBar.jsx"
import Footer from "./component/Footer"
import reactSVG from "./asset/react.svg"
import "./index.css"

export const __IMPORT_HTML_MODULES = true

export const title = "Home"

export default function HomeHTML({ htmls, cssLinks, jsLinks }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,user-scalable=yes" />
                <meta name="color-scheme" content="light dark" />
                <link rel="icon" type="image/svg+xml" href={reactSVG} />
                {cssLinks.map(cssLink => (
                    <link key={cssLink} rel="stylesheet" href={cssLink} />
                ))}
                <title>{title}</title>
            </head>
            <body>
                <NavBar
                    links={htmls.map(html => ({
                        href: html.link,
                        isDisabled: html.link === "/",
                        text: html.module.title,
                    }))}
                />
                <h1>{title}</h1>
                <p>Hello, world.</p>
                <p id="thanks">
                    Many thanks to{" "}
                    <a href="https://vite.dev/" target="_blank">
                        <img src="/vite.svg" />
                    </a>{" "}
                    and{" "}
                    <a href="https://react.dev/" target="_blank">
                        <img src={reactSVG} />
                    </a>
                    !
                </p>
                <Footer />
                {jsLinks.map(jsLink => (
                    <script key={jsLink} src={jsLink} />
                ))}
            </body>
        </html>
    )
}
