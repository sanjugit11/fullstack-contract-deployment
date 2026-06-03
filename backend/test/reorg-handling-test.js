class ReorgAwareIndexer {
  constructor() {
    this.blocks = new Map();
    this.events = [];
    this.reorgLogs = [];
  }

  indexBlock(block) {
    const previous = this.blocks.get(block.number - 1);
    console.log("previous==>",previous)
    if (previous && previous.hash !== block.parentHash) {
      this.reorgLogs.push(`Reorg detected at block ${block.number}`);
      this.events = this.events.filter((event) => event.blockNumber < block.number);
      console.log("Reorg event logged:", this.reorgLogs.at(-1));
      console.log("Affected events removed from block:", block.number);
    }

    this.blocks.set(block.number, block);
    this.events.push(...block.events);
    console.log("Indexed events:", this.events.map((event) => event.id).join(", "));
  }
}

describe("Reorg Handling Simulation", () => {
  test("backend detects reorg, removes affected events, and re-indexes", () => {
    const indexer = new ReorgAwareIndexer();

    indexer.indexBlock({
      number: 1,
      hash: "0xaaa",
      parentHash: "0x000",
      events: [{ id: "event-1", blockNumber: 1 }]
    });
    indexer.indexBlock({
      number: 2,
      hash: "0xbbb",
      parentHash: "0xaaa",
      events: [{ id: "old-event-2", blockNumber: 2 }]
    });

    console.log("Simulating chain reorganization...");
    indexer.indexBlock({
      number: 2,
      hash: "0xccc",
      parentHash: "0xreorg-parent",
      events: [{ id: "new-event-2", blockNumber: 2 }]
    });

    expect(indexer.reorgLogs).toEqual(["Reorg detected at block 2"]);
    expect(indexer.events.map((event) => event.id)).toEqual(["event-1", "new-event-2"]);
    expect(indexer.events.map((event) => event.id)).not.toContain("old-event-2");
  });
});
