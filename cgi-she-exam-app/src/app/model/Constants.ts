import {environment} from './../../environments/environment';

export const RootApiUrl = environment.API_HOST;
export const UserTokenKey = 'userToken';
export const UserInfoKey = 'userInfo';
export const RegistrationStartInfo = 'rsStartInfo';
export const YoungestAgeFromCurrent = 14;
export const YearsAvailable = 100;
export const PasswordMinLength = 8;
export const AuthHeaderKey = 'Authorization';
export const NationalitiesKey = 'Nationalalties';

//exam constants
export const ExamStartParam = 'exam';
export const ExamShort = 'short';
export const ExamNormal = 'normal';
export const ExamLong = 'long';
export const GeneralAlias = 'Other';
export const GeneralCategory = 'general';
export const PassingScore = 70;

//study constants
export const CategorySelections = 'categoryselections';
export const AppModeStudy = 'study'; 

//question constants
export const MultipleChoiceEnglishQuestionType = 'Multiple Choice English';
export const MultipleChoiceSpanishQuestionType = 'Multiple Choice Spanish';
export const MatchingQuestionType = 'Term Matching';
export const GroupingQuestionType = 'Category Matching';
export const MatchingTermsShown = 5;
export const GroupingTermsShown = 5;

//role constants
export const GlobalAdministrator = 'Global Administrator';
export const StudyUser = 'Study User';