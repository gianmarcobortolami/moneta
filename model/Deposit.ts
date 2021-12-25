/**
 * Deposit where the transaction flow in/out. It describes a money deposit.
 */
class Deposit {
  id: string;
  name: string;
  iconPath: string;

  constructor() {
    this.id = "";
    this.name = "";
    this.iconPath = "";
  }

  /**
   * Description of Deposit instance
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
   * Check if the deposit isn't initialized.
   * @returns True if the deposit is initialized with no-default value, False otherwise.
   */
  isInit(): boolean {
    return this.id !== "" && this.name !== "" && this.iconPath !== "";
  }
}
