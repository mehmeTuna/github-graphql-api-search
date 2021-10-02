import starCountFormat from "@/utils/starCountFormat";

describe("utils function", () => {
  it("starCountFormat", () => {
    const count = 188745;
    const result = starCountFormat(count);

    expect(result).toBe("188K");
  });
});
