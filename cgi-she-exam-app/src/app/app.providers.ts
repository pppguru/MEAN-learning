// App
export * from './app.component';

import {EventService} from './services/event.service';
import {AnalyticsService} from './services/analytics.service';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/authguard.service';
import {StudyGuardService} from './services/studyguard.service';
import {LoggingService} from './services/logging.service';
import {SessionService} from './services/session.service';

// Application wide providers
export const CUSTOM_APP_PROVIDERS = [
  EventService,
  AnalyticsService,
  AuthService,
  AuthGuardService,
  SessionService,
  StudyGuardService,
  LoggingService
];