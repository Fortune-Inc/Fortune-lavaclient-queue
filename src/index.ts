function isInstalled(id: string): boolean {
  try {
    require(id);
    return true;
  } catch (error) {
    return false;
  }
}

if (!isInstalled("@fortune-inc/lavaclient"))
  throw new Error("Please install @fortune-inc/lavaclient.");

export * from "./Queue";
export * from "./Plugin";
export * from "./Song";
