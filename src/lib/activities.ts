export interface Activity {
  name: string;
  score: number;
  type: 'Good Karma' | 'Needs Improvement';
}

export const activities: Activity[] = [
  // Good Karma
  { name: 'Attending classes regularly', score: 9, type: 'Good Karma' },
  { name: 'Completing assignments on time', score: 8, type: 'Good Karma' },
  { name: 'Participating in discussions', score: 7, type: 'Good Karma' },
  { name: 'Helping classmates', score: 8, type: 'Good Karma' },
  { name: 'Respecting teachers', score: 9, type: 'Good Karma' },
  { name: 'Organizing study material', score: 6, type: 'Good Karma' },
  { name: 'Waking up early', score: 7, type: 'Good Karma' },
  { name: 'Exercising or playing a sport', score: 8, type: 'Good Karma' },
  { name: 'Eating balanced meals', score: 6, type: 'Good Karma' },
  { name: 'Practicing mindfulness or journaling', score: 8, type: 'Good Karma' },
  { name: 'Volunteering for school/community', score: 9, type: 'Good Karma' },
  { name: 'Reading beyond syllabus', score: 7, type: 'Good Karma' },
  { name: 'Maintaining personal hygiene', score: 6, type: 'Good Karma' },
  { name: 'Reflecting on daily actions', score: 7, type: 'Good Karma' },
  { name: 'Apologizing or accepting mistakes', score: 8, type: 'Good Karma' },
  { name: 'Recycling or reducing waste', score: 6, type: 'Good Karma' },
  { name: 'Spending time with family', score: 7, type: 'Good Karma' },
  { name: 'Taking breaks and managing stress', score: 6, type: 'Good Karma' },
  
  // Needs Improvement
  { name: 'Skipping classes', score: -9, type: 'Needs Improvement' },
  { name: 'Ignoring homework', score: -7, type: 'Needs Improvement' },
  { name: 'Cheating in tests', score: -10, type: 'Needs Improvement' },
  { name: 'Being disrespectful to teachers', score: -8, type: 'Needs Improvement' },
  { name: 'Disrupting class', score: -7, type: 'Needs Improvement' },
  { name: 'Bullying or teasing', score: -9, type: 'Needs Improvement' },
  { name: 'Gossiping or spreading rumors', score: -6, type: 'Needs Improvement' },
  { name: 'Using phone excessively', score: -6, type: 'Needs Improvement' },
  { name: 'Playing games during study hours', score: -6, type: 'Needs Improvement' },
  { name: 'Watching inappropriate content', score: -8, type: 'Needs Improvement' },
  { name: 'Sleeping in class', score: -5, type: 'Needs Improvement' },
  { name: 'Overeating junk food', score: -4, type: 'Needs Improvement' },
  { name: 'Neglecting personal hygiene', score: -6, type: 'Needs Improvement' },
  { name: 'Avoiding physical activity', score: -4, type: 'Needs Improvement' },
  { name: 'Lying to escape blame', score: -8, type: 'Needs Improvement' },
  { name: 'Breaking promises', score: -7, type: 'Needs Improvement' },
  { name: 'Blaming others', score: -6, type: 'Needs Improvement' },
  { name: 'Mocking others efforts', score: -7, type: 'Needs Improvement' },
  { name: 'Ignoring someone in distress', score: -6, type: 'Needs Improvement' },
  { name: 'Wasting resources', score: -5, type: 'Needs Improvement' },
];

export const goodKarmaActivities = activities.filter(a => a.type === 'Good Karma');
export const badKarmaActivities = activities.filter(a => a.type === 'Needs Improvement');
