import { Injectable } from '@angular/core'
import { DeviceFeedback } from '@ionic-native/device-feedback'
import { environment } from '../../environments/environment'

@Injectable()
export class FeedbackService {
  constructor(private deviceFeedback: DeviceFeedback) {}

  feedback() {
    if (environment.production) {
      this.deviceFeedback.acoustic()

      // 触觉震感反馈
      // this.deviceFeedback.haptic(0)
    } else {
      console.log('fake feedback')
    }
  }
}
