import {
  // Level Icons
  Users as ExtracurricularIcon,
  School as SchoolIcon,
  University as UniversityIcon,
  Building as SubdistrictIcon,
  Building2 as CityOrDistrictIcon,
  Landmark as ProvinceIcon,
  Earth as NationalOrRegionalIcon,
  Globe as InternationalIcon,
  MoonStar as SpaceIcon,
  // Title Icons
  Award as BadgeIcon,
  StarHalf as FinalistIcon,
  Rabbit as RunnerUpIcon,
  Sparkles as HonorableMentionIcon,
  Star as BestParticipantIcon,
  CircleHelp as OtherIcon,
  type Icon as IconType,
  // Achiev Event Type Icons
  Drama as StoryTellingIcon,
  Speech as SpeechContestOrDebateIcon,
  MessageSquareDashed as GuessingWordIcon,
  Flower2 as SpellingBeeIcon,
  NotebookText as TOEFL_CompetitionIcon,
  BookOpenText as EssayCompetitionIcon,
  MicVocal as SingingCompetitionIcon,
  Feather as PoetryIcon,
} from "@lucide/svelte";

interface LabelIconMap {
  [key: string]: typeof IconType;
}

export const awardLevelLabelIconMap: LabelIconMap = {
  "extracurricular": ExtracurricularIcon,
  "school": SchoolIcon,
  "university": UniversityIcon,
  "subdistrict": SubdistrictIcon,
  "district": CityOrDistrictIcon,
  "city": CityOrDistrictIcon,
  "province": ProvinceIcon,
  "national": NationalOrRegionalIcon,
  "regional": NationalOrRegionalIcon,
  "international": InternationalIcon,
  "space": SpaceIcon,
  "other": OtherIcon,
};


export const awardTitleLabelIconMap: LabelIconMap = {
  "1st-place": BadgeIcon,
  "2nd-place": BadgeIcon,
  "3rd-place": BadgeIcon,
  "finalist": FinalistIcon,
  "runner-up": RunnerUpIcon,
  "honorable-mention": HonorableMentionIcon,
  "best-participant": BestParticipantIcon,
  "other": OtherIcon,
};

export const awardCategoryLabelIconMap: LabelIconMap = {
  "storytelling": StoryTellingIcon,
  "speech-contest": SpeechContestOrDebateIcon,
  "guessing-word": GuessingWordIcon,
  "debate": SpeechContestOrDebateIcon,
  "spelling-bee": SpellingBeeIcon,
  "toefl-competition": TOEFL_CompetitionIcon,
  "essay-competition": EssayCompetitionIcon,
  "singing": SingingCompetitionIcon,
  "poetry": PoetryIcon,
  "other": OtherIcon,
};

export type AwardLevelIconKey = keyof typeof awardLevelLabelIconMap;
export type AwardTitleIconKey = keyof typeof awardTitleLabelIconMap;
export type AwardCategoryIconKey = keyof typeof awardCategoryLabelIconMap;

export type AwardLevelIconComponent = (typeof awardLevelLabelIconMap)[AwardLevelIconKey];
export type AwardTitleIconComponent = (typeof awardTitleLabelIconMap)[AwardTitleIconKey];
export type AwardCategoryIconComponent = (typeof awardCategoryLabelIconMap)[AwardCategoryIconKey];