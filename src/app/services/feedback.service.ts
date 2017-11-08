import { Injectable } from '@angular/core'
import { DeviceFeedback } from '@ionic-native/device-feedback'

@Injectable()
export class FeedbackService {
  constructor(private deviceFeedback: DeviceFeedback) {}

  feedback() {
    this.deviceFeedback.acoustic()
    this.deviceFeedback.haptic(0)
  }
}
