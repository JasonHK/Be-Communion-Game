"use strict";

export function joinPhaserNamespaces(...namespaces: [string, ...string[]]): string
{
    return namespaces.join(".");
}
