/**
 * Deposit where the transaction flow in/out. It describes a money deposit.
 */
export class Deposit {
  id: number;
  name: string;
  iconPath: string;

  constructor(name?: string, iconPath?: string) {
    this.id = -1;
    this.name = name || "";
    this.iconPath = iconPath || "";
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
    return this.id !== -1 && this.name !== "" && this.iconPath !== "";
  }
}
