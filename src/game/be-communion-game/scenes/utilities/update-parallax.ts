"use strict";

import isNullLike from "@jasonhk/is-null-like";

export function updateParallax(offset: number, step: number, limit?: number): number
{
    if (isNullLike(limit) || (offset < limit))
    {
        return offset + 1;
    }
    else
    {
        return 0;
    }
}
