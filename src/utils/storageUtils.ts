
export interface TestProgress {
  type: 'placement' | 'book';
  bookLevel?: string;
  currentQuestion: number;
  answers: number[];
  completed: boolean;
}

const STORAGE_KEY = 'language_test_progress';

export const saveProgress = (progress: TestProgress): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const getProgress = (): TestProgress | null => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as TestProgress;
  } catch (error) {
    console.error('Error parsing progress data', error);
    return null;
  }
};

export const clearProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const calculateScore = (answers: number[], correctAnswers: number[]): number => {
  let score = 0;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] === correctAnswers[i]) {
      score++;
    }
  }
  return score;
};
