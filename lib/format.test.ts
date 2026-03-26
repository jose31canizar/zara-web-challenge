import { formatEuro } from "@/lib/format";

describe("formatEuro", () => {
  it("formats integer values in EUR", () => {
    expect(formatEuro(1329)).toBe("1,329 EUR");
  });
});
