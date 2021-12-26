/**
 * Category to which each transaction belongs to. It provides a brief description of the transaction causal.
 */
export class Category {
  id: number;
  name: string;
  iconPath: string;

  constructor(name?: string, iconPath?: string) {
    this.id = -1;
    this.name = name || "";
    this.iconPath = iconPath || "";
  }

  /**
   * Description of Category instance
   */
  toString(): string {
    return (
      "Category(" +
      "id:" +
      this.id +
      ",name:" +
      this.name +
      ",iconPath:" +
      this.iconPath +
      ")"
    );
  }

  /**
   * Check if the category isn't initialized.
   * @returns True if the deposit is initialized with no-default value, False otherwise.
   */
  isInit(): boolean {
    return this.id !== -1 && this.name !== "" && this.iconPath !== "";
  }
}
