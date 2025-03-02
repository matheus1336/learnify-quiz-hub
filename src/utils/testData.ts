
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface TestData {
  placementTest: Question[];
  books: {
    [key: string]: {
      title: string;
      description: string;
      questions: Question[];
    };
  };
}

export const testData: TestData = {
  placementTest: [
    {
      id: 1,
      text: "______ is she? She's my sister.",
      options: ["Who", "What", "Where", "Why"],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "I ______ like coffee.",
      options: ["doesn't", "don't", "isn't", "aren't"],
      correctAnswer: 1
    },
    {
      id: 3,
      text: "They ______ watching TV right now.",
      options: ["are", "is", "am", "be"],
      correctAnswer: 0
    },
    {
      id: 4,
      text: "She has ______ to the store.",
      options: ["go", "goes", "went", "gone"],
      correctAnswer: 3
    },
    {
      id: 5,
      text: "Which word is a synonym for 'happy'?",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      correctAnswer: 2
    },
    {
      id: 6,
      text: "______ did you go to the party? Last night.",
      options: ["When", "Where", "Why", "Who"],
      correctAnswer: 0
    },
    {
      id: 7,
      text: "If I ______ rich, I would buy a big house.",
      options: ["am", "were", "are", "be"],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "She ______ here since 2010.",
      options: ["is", "was", "has been", "have been"],
      correctAnswer: 2
    },
    {
      id: 9,
      text: "The book ______ by J.K. Rowling.",
      options: ["writes", "wrote", "was written", "is writing"],
      correctAnswer: 2
    },
    {
      id: 10,
      text: "I wish I ______ how to swim.",
      options: ["know", "knew", "known", "knowing"],
      correctAnswer: 1
    }
  ],
  books: {
    beginner: {
      title: "Book 1: Beginner",
      description: "Ideal for those who are just starting to learn English.",
      questions: [
        {
          id: 1,
          text: "What is your _______?",
          options: ["name", "game", "fame", "same"],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "I ______ from Brazil.",
          options: ["am", "is", "are", "be"],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "She _______ TV every day.",
          options: ["watch", "watches", "watching", "watched"],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "______ is that? It's my book.",
          options: ["What", "Where", "Who", "Why"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "I ______ like spicy food.",
          options: ["don't", "doesn't", "isn't", "aren't"],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "We ______ students.",
          options: ["am", "is", "are", "be"],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "______ she have a car? Yes, she does.",
          options: ["Does", "Do", "Is", "Are"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "I have ______ apple.",
          options: ["a", "an", "the", "some"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "They ______ playing soccer now.",
          options: ["is", "are", "am", "be"],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "______ is the weather today? It's sunny.",
          options: ["What", "How", "Where", "When"],
          correctAnswer: 1
        }
      ]
    },
    intermediate: {
      title: "Book 2: Intermediate",
      description: "For students who already have a basic understanding of English.",
      questions: [
        {
          id: 1,
          text: "I've ______ seen that movie before.",
          options: ["never", "ever", "always", "often"],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "She ______ working here since 2015.",
          options: ["is", "was", "has been", "have been"],
          correctAnswer: 2
        },
        {
          id: 3,
          text: "If I ______ you, I would accept the offer.",
          options: ["am", "were", "are", "be"],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "By the time I arrived, the movie ______.",
          options: ["started", "starts", "had started", "has started"],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "She asked me ______ I wanted to go.",
          options: ["that", "what", "which", "where"],
          correctAnswer: 3
        },
        {
          id: 6,
          text: "This book is ______ interesting than that one.",
          options: ["more", "most", "much", "many"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "You ______ take an umbrella. It's raining.",
          options: ["should", "would", "could", "might"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "I'm not as tall ______ my brother.",
          options: ["like", "as", "than", "that"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "The hotel ______ we stayed was very nice.",
          options: ["which", "where", "when", "what"],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "She ______ be at home. I just saw her at the store.",
          options: ["must", "can't", "should", "might"],
          correctAnswer: 1
        }
      ]
    },
    advanced: {
      title: "Book 3: Advanced",
      description: "For students with a strong command of English who want to master complex concepts.",
      questions: [
        {
          id: 1,
          text: "Had I known about the problem, I ______ it earlier.",
          options: ["would fix", "would have fixed", "will fix", "had fixed"],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Not only ______ late, but he also forgot the documents.",
          options: ["he was", "was he", "he is", "is he"],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "The novel, ______ was written in the 19th century, remains popular.",
          options: ["who", "whom", "whose", "which"],
          correctAnswer: 3
        },
        {
          id: 4,
          text: "She ______ have left already; her car isn't in the parking lot.",
          options: ["must", "can", "should", "would"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "______ the rain, the event was held outdoors.",
          options: ["Despite", "Although", "However", "Even"],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "The issue ______ which they were debating is quite complex.",
          options: ["about", "for", "with", "on"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Seldom ______ such a magnificent performance.",
          options: ["I have seen", "have I seen", "I seen", "seen I have"],
          correctAnswer: 1
        },
        {
          id: 8,
          text: "The manager, ______ with the new proposal, decided to approve it.",
          options: ["impressing", "impressed", "to impress", "having impressed"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "By the time we graduate, we ______ over 1000 hours studying.",
          options: ["will spend", "would spend", "will have spent", "would have spent"],
          correctAnswer: 2
        },
        {
          id: 10,
          text: "She ______ to have finished the project by now.",
          options: ["supposed", "is supposed", "supposing", "supposes"],
          correctAnswer: 1
        }
      ]
    }
  }
};

export const getLevelFromScore = (score: number): string => {
  if (score <= 3) {
    return "beginner";
  } else if (score <= 7) {
    return "intermediate";
  } else {
    return "advanced";
  }
};

export const getLevelTitle = (level: string): string => {
  switch (level) {
    case "beginner":
      return "Beginner (Book 1)";
    case "intermediate":
      return "Intermediate (Book 2)";
    case "advanced":
      return "Advanced (Book 3)";
    default:
      return "Unknown Level";
  }
};
