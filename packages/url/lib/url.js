const pattern = /^(?:([^:]*?:)\/\/(?:([^:@]*?:[^:@]*)@)?((?:([^:\/?#]*)?(?::(\d+))?)))?(\/[^#?]*)?(\?([^#]*))?(?:(#.*))?/;

function parse(url) {
    if (!url) {
        return {};
    }
    const groups = url.match(pattern) || [];
    return {
        protocol: groups[1],
        auth: groups[2],
        host: groups[3],
        hostname: groups[4],
        port: groups[5],
        pathname: groups[6],
        search: groups[7],
        query: groups[8],
        hash: groups[9]
    };
}

module.exports = parse;