interface LabelColorMap {
  [key: string]: string;
}

export const awardLevelLabelColorMap: LabelColorMap = {
  extracurricular: 'text-neutral-700 bg-neutral-300 hover:text-neutral-300 hover:bg-neutral-700',
  school: 'text-slate-700 bg-slate-300 hover:text-slate-300 hover:bg-slate-700',
  university: 'text-purple-700 bg-purple-300 hover:text-purple-300 hover:bg-purple-700',
  subdistrict: 'text-orange-700 bg-orange-300 hover:text-orange-300 hover:bg-orange-700',
  district: 'text-cyan-700 bg-cyan-300 hover:text-cyan-300 hover:bg-cyan-700',
  city: 'text-cyan-700 bg-cyan-300 hover:text-cyan-300 hover:bg-cyan-700',
  province: 'text-green-700 bg-green-300 hover:text-green-300 hover:bg-green-700',
  national: 'text-emerald-700 bg-emerald-300 hover:text-emerald-300 hover:bg-emerald-700 hover:shadow-md hover:shadow-emerald-300',
  regional: 'text-sky-700 bg-sky-300 hover:text-sky-300 hover:bg-sky-700 hover:shadow-md hover:shadow-sky-300',
  international: 'text-blue-700 bg-blue-300 hover:text-blue-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-300',
  space: 'text-white bg-black hover:text-purple-500 hover:shadow-md hover:shadow-purple-400',
};

export const awardTitleLabelColorMap: LabelColorMap = {
  '1st-place': 'text-yellow-700 bg-yellow-300 hover:text-yellow-300 hover:bg-yellow-700 hover:shadow-md hover:shadow-yellow-300',
  '2nd-place': 'text-slate-700 bg-slate-300 hover:text-slate-300 hover:bg-slate-700 hover:shadow-md hover:shadow-slate-300',
  '3rd-place': 'text-[#8A582E] bg-[#E4C3A0] hover:text-[#E4C3A0] hover:bg-[#8A582E] hover:shadow-md hover:shadow-[#E4C3A0]',
  finalist: 'text-orange-700 bg-orange-300 hover:text-orange-300 hover:bg-orange-700',
  'runner-up': 'text-stone-700 bg-stone-300 hover:text-stone-300 hover:bg-stone-700',
  'honorable-mention': 'text-emerald-700 bg-emerald-300 hover:text-emerald-300 hover:bg-emerald-700',
  'best-participant': 'text-purple-700 bg-purple-300 hover:text-purple-300 hover:bg-purple-700',
};

export const awardCategoryLabelColorMap: LabelColorMap = {
  storytelling: 'text-amber-700 bg-amber-300 hover:text-amber-300 hover:bg-amber-700 hover:shadow-md hover:shadow-amber-300',
  'speech-contest': 'text-indigo-700 bg-indigo-300 hover:text-indigo-300 hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-300',
  'guessing-word': 'text-lime-700 bg-lime-300 hover:text-lime-300 hover:bg-lime-700 hover:shadow-md hover:shadow-lime-300',
  debate: 'text-red-700 bg-red-300 hover:text-red-300 hover:bg-red-700 hover:shadow-md hover:shadow-red-300',
  'spelling-bee': 'text-yellow-700 bg-yellow-300 hover:text-yellow-300 hover:bg-yellow-700 hover:shadow-md hover:shadow-yellow-300',
  'toefl-competition': 'text-blue-700 bg-blue-300 hover:text-blue-300 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-300',
  'essay-competition': 'text-gray-700 bg-gray-300 hover:text-gray-300 hover:bg-gray-700 hover:shadow-md hover:shadow-gray-300',
  singing: 'text-pink-700 bg-pink-300 hover:text-pink-300 hover:bg-pink-700 hover:shadow-md hover:shadow-pink-300',
  poetry: 'text-purple-700 bg-purple-300 hover:text-purple-300 hover:bg-purple-700 hover:shadow-md hover:shadow-purple-300',
};

export type AwardLevelColorKey = keyof typeof awardLevelLabelColorMap;
export type AwardTitleColorKey = keyof typeof awardTitleLabelColorMap;
export type AwardCategoryColorKey = keyof typeof awardCategoryLabelColorMap;
