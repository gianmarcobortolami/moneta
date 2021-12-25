/**
 * Category to which each transaction belongs to. It provides a brief description of the transaction causal.
 */
class Category {
  id: string;
  name: string;
  iconPath: string;

  constructor() {
    this.id = "";
    this.name = "";
    this.iconPath = "";
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
    return this.id !== "" && this.name !== "" && this.iconPath !== "";
  }
}
