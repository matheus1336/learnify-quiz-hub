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
      text: "______ ela é? Ela é minha irmã.",
      options: ["Quem", "O que", "Onde", "Por que"],
      correctAnswer: 0
    },
    {
      id: 2,
      text: "Eu ______ gosto de café.",
      options: ["não", "não", "não é", "não são"],
      correctAnswer: 0
    },
    {
      id: 3,
      text: "Eles ______ assistindo TV agora.",
      options: ["estão", "está", "estou", "ser"],
      correctAnswer: 0
    },
    {
      id: 4,
      text: "Ela ______ à loja.",
      options: ["ir", "vai", "foi", "ido"],
      correctAnswer: 2
    },
    {
      id: 5,
      text: "Qual palavra é sinônimo de 'feliz'?",
      options: ["Triste", "Bravo", "Alegre", "Cansado"],
      correctAnswer: 2
    },
    {
      id: 6,
      text: "______ você foi à festa? Ontem à noite.",
      options: ["Quando", "Onde", "Por que", "Quem"],
      correctAnswer: 0
    },
    {
      id: 7,
      text: "Se eu ______ rico, compraria uma casa grande.",
      options: ["sou", "fosse", "serei", "for"],
      correctAnswer: 1
    },
    {
      id: 8,
      text: "Ela ______ aqui desde 2010.",
      options: ["é", "foi", "tem estado", "têm estado"],
      correctAnswer: 2
    },
    {
      id: 9,
      text: "O livro ______ por J.K. Rowling.",
      options: ["escreve", "escreveu", "foi escrito", "está escrevendo"],
      correctAnswer: 2
    },
    {
      id: 10,
      text: "Eu gostaria de ______ nadar.",
      options: ["saber", "soubesse", "sabido", "sabendo"],
      correctAnswer: 0
    }
  ],
  books: {
    beginner: {
      title: "Livro 1: Iniciante",
      description: "Ideal para aqueles que estão começando a aprender inglês.",
      questions: [
        {
          id: 1,
          text: "Qual é o seu _______?",
          options: ["nome", "jogo", "fama", "mesmo"],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "Eu ______ do Brasil.",
          options: ["sou", "é", "são", "ser"],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "Ela _______ TV todos os dias.",
          options: ["assiste", "assiste", "assistindo", "assistiu"],
          correctAnswer: 0
        },
        {
          id: 4,
          text: "______ é isso? É meu livro.",
          options: ["O que", "Onde", "Quem", "Por que"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "Eu ______ gosto de comida apimentada.",
          options: ["não", "não", "não é", "não são"],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "Nós ______ estudantes.",
          options: ["sou", "é", "somos", "ser"],
          correctAnswer: 2
        },
        {
          id: 7,
          text: "______ ela tem um carro? Sim, ela tem.",
          options: ["Ela", "Você", "Ele", "Eles"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "Eu tenho ______ maçã.",
          options: ["um", "uma", "o", "alguns"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "Eles ______ jogando futebol agora.",
          options: ["está", "estão", "estou", "ser"],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "______ está o clima hoje? Está ensolarado.",
          options: ["O que", "Como", "Onde", "Quando"],
          correctAnswer: 1
        }
      ]
    },
    intermediate: {
      title: "Livro 2: Intermediário",
      description: "Para estudantes que já têm um conhecimento básico de inglês.",
      questions: [
        {
          id: 1,
          text: "Eu ______ vi esse filme antes.",
          options: ["nunca", "já", "sempre", "frequentemente"],
          correctAnswer: 0
        },
        {
          id: 2,
          text: "Ela ______ trabalhando aqui desde 2015.",
          options: ["é", "foi", "tem estado", "têm estado"],
          correctAnswer: 2
        },
        {
          id: 3,
          text: "Se eu ______ você, aceitaria a oferta.",
          options: ["sou", "fosse", "serei", "for"],
          correctAnswer: 1
        },
        {
          id: 4,
          text: "Quando eu cheguei, o filme ______.",
          options: ["começou", "começa", "tinha começado", "tem começado"],
          correctAnswer: 2
        },
        {
          id: 5,
          text: "Ela me perguntou ______ eu queria ir.",
          options: ["que", "o que", "qual", "onde"],
          correctAnswer: 3
        },
        {
          id: 6,
          text: "Este livro é ______ interessante do que aquele.",
          options: ["mais", "o mais", "muito", "muitos"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Você ______ levar um guarda-chuva. Está chovendo.",
          options: ["deveria", "iria", "poderia", "pode"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "Não sou tão alto ______ meu irmão.",
          options: ["como", "quanto", "do que", "que"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "O hotel ______ ficamos era muito bom.",
          options: ["que", "onde", "quando", "o que"],
          correctAnswer: 1
        },
        {
          id: 10,
          text: "Ela ______ estar em casa. Acabei de vê-la na loja.",
          options: ["deve", "não pode", "deveria", "pode"],
          correctAnswer: 1
        }
      ]
    },
    advanced: {
      title: "Livro 3: Avançado",
      description: "Para estudantes com um bom domínio do inglês que desejam dominar conceitos complexos.",
      questions: [
        {
          id: 1,
          text: "Se eu soubesse do problema, ______ mais cedo.",
          options: ["resolveria", "teria resolvido", "vou resolver", "tinha resolvido"],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Não só ______ atrasado, mas também esqueceu os documentos.",
          options: ["ele estava", "estava ele", "ele é", "é ele"],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "O romance, ______ foi escrito no século 19, continua popular.",
          options: ["que", "quem", "cujo", "o qual"],
          correctAnswer: 0
        },
        {
          id: 4,
          text: "Ela ______ ter saído já; o carro dela não está no estacionamento.",
          options: ["deve", "pode", "deveria", "iria"],
          correctAnswer: 0
        },
        {
          id: 5,
          text: "______ a chuva, o evento foi realizado ao ar livre.",
          options: ["Apesar de", "Embora", "No entanto", "Mesmo"],
          correctAnswer: 0
        },
        {
          id: 6,
          text: "O assunto ______ o qual eles estavam debatendo é bastante complexo.",
          options: ["sobre", "para", "com", "em"],
          correctAnswer: 0
        },
        {
          id: 7,
          text: "Raramente ______ uma apresentação tão magnífica.",
          options: ["eu vi", "vi eu", "eu tenho visto", "tenho visto eu"],
          correctAnswer: 0
        },
        {
          id: 8,
          text: "O gerente, ______ com a nova proposta, decidiu aprová-la.",
          options: ["impressionando", "impressionado", "impressionar", "tendo impressionado"],
          correctAnswer: 1
        },
        {
          id: 9,
          text: "Até o momento em que nos formarmos, ______ mais de 1000 horas estudando.",
          options: ["gastaremos", "gastaríamos", "teremos gasto", "teríamos gasto"],
          correctAnswer: 2
        },
        {
          id: 10,
          text: "Ela ______ ter terminado o projeto até agora.",
          options: ["deveria", "deveria", "devendo", "deve"],
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
      return "Iniciante (Livro 1)";
    case "intermediate":
      return "Intermediário (Livro 2)";
    case "advanced":
      return "Avançado (Livro 3)";
    default:
      return "Nível Desconhecido";
  }
};
