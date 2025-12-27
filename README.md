# AI Memory-Driven Invoice Agent

## Overview
This project demonstrates a memory-driven AI agent that learns from human corrections to improve invoice processing automation over time.

## Architecture
Recall → Apply → Decide → Learn

Recall
Relevant memories are retrieved based on:
- Vendor
- Known correction patterns

Apply
Memories are applied conservatively to:
- Normalize fields
- Suggest corrections
- Increase confidence

Decide
Based on the final confidence score, the system decides:
- Auto-accept
- Auto-correct
- Escalate for human review

Learn
Approved human corrections are stored as new or reinforced memory.

## Memory Types
- Vendor Memory - Vendor-specific patterns learned over time. Example - Supplier GmbH: "Leistungsdatum" → serviceDate
- Correction Memory - Reusable correction strategies learned from repeated human actions. Examples “VAT included → recompute tax”
- Resolution Memory - Tracks whether previous automated suggestions were: Approved or Rejected

## Persistence
File-based JSON memory (memory.json)

## How to Run
- npm install
- npx ts-node src/index.ts

## Demo Flow
1. Run Invoice #1
2. Apply human correction
3. Memory updated
4. Run Invoice #2
5. Fewer flags due to learning