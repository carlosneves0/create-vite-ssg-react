import Footer from "./component/Footer"
import reactSVG from "./asset/react.svg"
import "./index.css"

export const title = "Bar"

export default function HomeHTML({ cssLinks, jsLinks }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,user-scalable=yes" />
                <link rel="icon" type="image/svg+xml" href={reactSVG} />
                {cssLinks.map(cssLink => (
                    <link key={cssLink} rel="stylesheet" href={cssLink} />
                ))}
                <title>{title}</title>
            </head>
            <body>
                <a href="/">&lt; Back</a>
                <h1>{title}</h1>
                <Footer />
                {jsLinks.map(jsLink => (
                    <script key={jsLink} src={jsLink} />
                ))}
            </body>
        </html>
    )
}
