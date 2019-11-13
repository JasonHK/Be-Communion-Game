"use strict";

export function joinAssetsPath(...segments: [string, ...string[]]): string
{
    return segments.join("/");
}
