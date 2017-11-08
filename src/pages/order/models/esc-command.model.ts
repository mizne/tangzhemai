export class EscCommand {
  static ESC: string = '\u001B'
  static GS: string = '\u001D'
  static INITIALIZE_PRINTER: string = EscCommand.ESC + '@'

  static BOLD_ON: string = EscCommand.ESC + 'E' + '\u0001'
  static BOLD_OFF: string = EscCommand.ESC + 'E' + '\0'

  static DOUBLE_HEIGHT: string = EscCommand.GS + '!' + '\u0001'
  static DOUBLE_WIDTH: string = EscCommand.GS + '!' + '\u0010'

  static DOUBLE_ON: string = EscCommand.GS + '!' + '\u0011'
  static DOUBLE_OFF: string = EscCommand.GS + '!' + '\0'

  static PRINT_AND_FEED_MAXLINE = EscCommand.ESC + 'J' + '\u00FF' // 打印并走纸 最大255
  static TEXT_ALIGN_LEFT = EscCommand.ESC + 'a' + '0'
  static TEXT_ALIGN_CENTER = EscCommand.ESC + 'a' + '1'
  static TEXT_ALIGN_RIGHT = EscCommand.ESC + 'a' + '2'

  static PrintAndFeedLine(verticalUnit?: number): string {
    if (verticalUnit === void 0) {
      return EscCommand.ESC + 'v' + 1
    }
    if (verticalUnit > 255) verticalUnit = 255
    if (verticalUnit < 0) verticalUnit = 0
    return EscCommand.ESC + 'V' + String.fromCharCode(verticalUnit)
  }

  static CutAndFeedLine(verticalUnit?: number): string {
    if (verticalUnit === void 0) {
      return EscCommand.ESC + 'v' + 1
    }
    if (verticalUnit > 255) verticalUnit = 255
    if (verticalUnit < 0) verticalUnit = 0
    return EscCommand.ESC + 'V' + String.fromCharCode(verticalUnit)
  }
}


