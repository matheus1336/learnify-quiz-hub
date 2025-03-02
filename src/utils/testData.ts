
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
      text: "______ is she? She is my sister.",
      options: ["Who", "What", "Where", "Why"],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "I ______ like coffee.",
      options: ["don't", "not", "am not", "are not"],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "They ______ watching TV now.",
      options: ["are", "is", "am", "be"],
      correctAnswer: 0
    },
    {
      id: 4,
      text: "She ______ to the store.",
      options: ["go", "goes", "went", "gone"],
      correctAnswer: 2
    },
    {
      id: 5,
      text: "Which word is a synonym for 'happy'?",
      options: ["Sad", "Angry", "Joyful", "Tired"],
      correctAnswer: 2
    },
    {
      id: 6,
      text: "______ did you go to the party? Yesterday evening.",
      options: ["When", "Where", "Why", "Who"],
      correctAnswer: 0
    },
    {
      id: 7,
      text: "If I ______ rich, I would buy a big house.",
      options: ["am", "were", "will be", "be"],
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
      text: "I would like ______ swim.",
      options: ["to", "for", "at", "in"],
      correctAnswer: 0
    }
  ],
  books: {
    beginner: {
      title: "Book 1: Beginner",
      description: "Ideal for those who are starting to learn English.",
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
          options: ["watches", "watch", "watching", "watched"],
          correctAnswer: 0
        },
        {
          id: 4,
          text: "______ is this? It's my book.",
          options: ["What", "Where", "Who", "Why"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "I ______ like spicy food.",
          options: ["don't", "not", "am not", "are not"],
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
      description: "For students who already have a basic knowledge of English.",
      questions: [
        {
          id: 1,
          text: "I ______ never seen that movie before.",
          options: ["have", "has", "had", "having"],
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
          options: ["am", "were", "will be", "be"],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "When I arrived, the movie ______.",
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
          options: ["more", "most", "very", "much"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "You ______ take an umbrella. It's raining.",
          options: ["should", "would", "could", "can"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "I'm not as tall ______ my brother.",
          options: ["as", "like", "than", "that"],
          correctAnswer: 0
        },
        {
          id: 9,
          text: "The hotel ______ we stayed was very nice.",
          options: ["that", "where", "when", "which"],
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
      description: "For students with a good command of English who wish to master complex concepts.",
      questions: [
        {
          id: 1,
          text: "Had I known about the problem, I ______ it earlier.",
          options: ["would solve", "would have solved", "will solve", "had solved"],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Not only ______ late, but he also forgot the documents.",
          options: ["was he", "he was", "he is", "is he"],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "The novel, ______ was written in the 19th century, remains popular.",
          options: ["which", "who", "whose", "whom"],
          correctAnswer: 0
        },
        {
          id: 4,
          text: "She ______ have left already; her car isn't in the parking lot.",
          options: ["must", "may", "should", "would"],
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
          text: "The subject ______ they were debating is quite complex.",
          options: ["about which", "which", "that", "on which"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Rarely ______ such a magnificent performance.",
          options: ["have I seen", "I have seen", "I had seen", "had I seen"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "The manager, ______ with the new proposal, decided to approve it.",
          options: ["impressing", "impressed", "impress", "having impressed"],
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
          text: "She ______ have completed the project by now.",
          options: ["should", "ought to", "ought", "is to"],
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
