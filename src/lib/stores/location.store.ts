import type { LocationInfoResp } from "$src/types/Location";

import { writable } from "svelte/store";

export const location = writable<LocationInfoResp>();
