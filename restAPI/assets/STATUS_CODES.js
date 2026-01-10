statusRanges = {
    // 1XX - Informational
    '1XX': { min: 100, max: 199 }, // 101- continue, 101- switching protocols
    // 2XX - Success
    '2XX': { min: 200, max: 299 }, // 200- ok, 201- created, 202- accepted, 204- no content, 206- partial content
    // 3XX - Redirection
    '3XX': { min: 300, max: 399 }, // 301- moved permanently, 302- found/ temporary moving, 304- not modified
    // 4XX - Client Error
    '4XX': { min: 400, max: 499 }, // 400- bad request, 401- unauthorized, 403- forbidden/ authorization, 404- not found,405-not found ,409- conflict, 429- too many requests
    // 5XX - Server Error
    '5XX': { min: 500, max: 599 }, // 500- internal server error, 502- bad gateway, 503- service unavailable, 504- gateway timeout, 505-http version not supported, 507- insufficient storage
};
