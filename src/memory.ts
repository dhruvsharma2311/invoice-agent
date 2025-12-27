// This file makes memory persistent.

import fs from "fs";

// file acting as a database
const MEMORY_FILE = "memory.json";

// loads memeory into RAM
export function loadMemory() {
    if (!fs.existsSync(MEMORY_FILE)) {
        return {
            vendorMemory: {},
            correctionMemory: [],
            resolutionMemory: []
        };
    }
    // read memory from disk
    return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf8"));
}

// writes updated memory back
export function saveMemory(memory: any) {
    fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
}
