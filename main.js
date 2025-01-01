#!/usr/bin/env node

import { basename, dirname, join, relative, resolve } from "node:path"
import { copyFile, mkdir, opendir, readdir, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import prompts from "prompts"
import picocolors from "picocolors"
import prettyMs from "pretty-ms"

const argv = process.argv.slice(2),
    { bold, dim, green, red } = picocolors

// TO-DO: help?
// TO-DO: version?

const defaultTargetPath = "vite-react-ssg-project",
    argTargetPath = argv[0]?.trim().replace(/\/+$/, ""),
    targetPath = resolve(argTargetPath || defaultTargetPath)

let targetDirPath, projectName

try {
    const targetDir = await opendir(targetPath)
    await targetDir.close()
    targetDirPath = targetPath
    projectName = defaultTargetPath
} catch (error) {
    if (error.code === "ENOENT") {
        targetDirPath = dirname(targetPath)
        projectName = basename(targetPath)
    } else {
        console.error(red(error.message))
        process.exit(1)
    }
}
console.log(`${green("✔")} ${bold("Target directory:")} ${dim("…")} ${targetDirPath}`)

if (projectName !== defaultTargetPath) {
    console.log(`${green("✔")} ${bold("Project name:")} ${dim("…")} ${projectName}`)
} else {
    await prompts(
        {
            type: "text",
            message: "Project name:",
            initial: defaultTargetPath,
            onState: state => {
                projectName =
                    state.value?.trim().replace(/[\/\\]/g, "-") || defaultTargetPath
            },
        },
        {
            onCancel: () => {
                console.error(red("✖") + " Operation cancelled")
                process.exit(1)
            },
        },
    )
}

const rootPath = join(targetDirPath, projectName)

await assertEmpty(rootPath)

const startTime = new Date()

console.log(`${dim("…")} Copying template files...`)

// Node18 doesn't have `import.meta.dirname`.
const __dirname = dirname(fileURLToPath(import.meta.url)),
    files = await readdir(join(__dirname, "template"), {
        recursive: true,
        withFileTypes: true,
    })

await mkdir(rootPath, { recursive: true })

for (const file of files) {
    const fileRelPath = relative(
        join(__dirname, "template"),
        join(file.parentPath, file.name),
    )
    if (file.isDirectory()) {
        await mkdir(join(rootPath, fileRelPath), { recursive: true })
    } else {
        await copyFile(
            join(__dirname, "template", fileRelPath),
            join(rootPath, fileRelPath !== "_gitignore" ? fileRelPath : ".gitignore"),
        )
    }
}

console.log(`${green("✔")} Done in ${prettyMs(new Date() - startTime)}`)

const cwd = process.cwd(),
    rootRelPath = relative(cwd, rootPath)
console.log(`\n  Now run:\n`)
if (rootPath !== cwd) {
    console.log(
        `    ${bold(`cd ${rootRelPath.includes(" ") ? `'${rootRelPath}'` : rootRelPath}`)}`,
    )
}
console.log(`    ${bold("npm install")}`)
console.log(`    ${bold("npm run dev")}`)
console.log()

async function assertEmpty(path) {
    try {
        await stat(path)
        console.error(red(`EEXIST: file already exists, stat '${path}'`))
        process.exit(1)
    } catch (error) {
        if (error.code !== "ENOENT") {
            console.error(red(error.message))
            process.exit(1)
        }
    }
}
