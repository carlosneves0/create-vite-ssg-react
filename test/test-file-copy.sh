tmpdir="$(mktemp -d)"
rmdir "${tmpdir}"
cleanup()
{
    rm -rf "${tmpdir}"
}

(set -x

    node -v

    # NOTE: assuming work-dir == project-root
    node main.js "${tmpdir}"
)

# Compare each file
_sha256sum()
{
    sha256sum "${1}" | cut -d' ' -f1
}

for template_file in $(find template | tail -n +2)
do
    if test -d "${template_file}"; then
        continue # Ignore directories
    fi
    
    target_file="${tmpdir}/$(echo "${template_file}" | sed -E 's/^template\///')"
    if test "$(basename "${template_file}")" = '_gitignore'; then
        target_file="$(dirname "${target_file}")/.gitignore"
    fi

    if test "$(_sha256sum "${template_file}")" != "$(_sha256sum "${target_file}")"; then
        echo 1>&2 "ERROR: file \`${template_file}\` differs from target"
        cleanup
        exit 1
    fi
done

echo 'OK'
cleanup
exit 0