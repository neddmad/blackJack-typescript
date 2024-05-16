enum Suit {
  CLUBS = "clubs", //трефы
  DIAMONDS = "diamonds", //бубны
  HEARTS = "hearts", //червы
  SPEADES = "speades", //пики
}

enum Rank {
  TWO = "two",
  THREE = "three",
  FOUR = "four",
  FIVE = "five",
  SIX = "six",
  SEVEN = "seven",
  EIGHT = "eight",
  NINE = "nine",
  TEN = "ten",
  JACK = "jack",
  QEEN = "queen",
  KING = "king",
  ACE = "ace",
}

class Card {
  constructor(private _rank: Rank, private _suit: Suit) {}
  get rank(): Rank {
    return this._rank;
  }
  get suit(): Suit {
    return this._suit;
  }
}

class Dealer {
  public cards: Card[] = [];
  public dealersPersonalCards: Card[] = [];
  constructor(size: 36 | 52) {
    const suits: Suit[] = [
      Suit.CLUBS,
      Suit.DIAMONDS,
      Suit.HEARTS,
      Suit.SPEADES,
    ];

    const ranks: Rank[] = [
      Rank.TWO,
      Rank.THREE,
      Rank.FOUR,
      Rank.FIVE,
      Rank.SIX,
      Rank.SEVEN,
      Rank.EIGHT,
      Rank.NINE,
      Rank.TEN,
      Rank.JACK,
      Rank.QEEN,
      Rank.KING,
      Rank.ACE,
    ];

    for (const suit of suits) {
      for (const rank of ranks) {
        if (
          size === 36 &&
          (rank === Rank.TWO ||
            rank === Rank.THREE ||
            rank === Rank.FOUR ||
            rank === Rank.FIVE)
        ) {
          continue;
        }
        this.cards.push(new Card(rank, suit));
      }
    }
  }
}

class Player extends Dealer {
  public playersPersonalCards: Card[] = [];
  constructor(size: 36 | 52) {
    super(size);
  }
}

class Game extends Player {
  constructor(size: 36 | 52) {
    super(size);
  }

  addCard(person: Card[]) {
    return person.push(...this.cards.splice(0, 1));
  }

  wordToNumber(word: string): number {
    let wrdToNumber: { [key: string]: number } = {
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
      ten: 10,
      jack: 10,
      queen: 10,
      king: 10,
      ace: 1,
    };

    if (word in wrdToNumber) {
      if (word.startsWith("ace")) {
        const randomValue = Math.random() < 0.5 ? 1 : 11;
        wrdToNumber["ace"] = randomValue;
      }
      return wrdToNumber[word];
    } else {
      return NaN;
    }
  }
  sumsCards(cardsToTransform: Card[]): number {
    return cardsToTransform
      .map((e) => this.wordToNumber(e.rank))
      .reduce((init, val) => init + val);
  }
  checkOver21(personalCard: Card[]): boolean {
    if (this.sumsCards(personalCard) > 21) {
      alert(
        " У " +
          (personalCard === this.dealersPersonalCards ? "Дилера " : "Гравця ") +
          this.sumsCards(personalCard) +
          " очок. Програв - " +
          (personalCard === this.dealersPersonalCards ? "Дилер" : "Гравець")
      );
      return true;
    } else {
      return false;
    }
  }
  checkWinCondition(): void {
    if (
      this.sumsCards(this.dealersPersonalCards) >
        this.sumsCards(this.playersPersonalCards) ||
      this.sumsCards(this.dealersPersonalCards) ===
        this.sumsCards(this.playersPersonalCards)
    ) {
      return alert("Переміг дилер");
    } else {
      return alert("Переміг гравець");
    }
  }
  playersTurn(): void {
    let question;
    do {
      question = prompt(
        "У Вас " +
          this.sumsCards(this.playersPersonalCards) +
          " очок. " +
          "Чи бажаєте Ви взяти ще одну карту?"
      );

      if (question?.toLowerCase() === "так") {
        this.addCard(this.playersPersonalCards);
        return;
      }

      if (
        question?.toLowerCase() === "ні" ||
        question === "" ||
        question === null
      ) {
        alert(
          "У Вас залишається " +
            this.sumsCards(this.playersPersonalCards) +
            " очок. "
        );
        return;
      }

      if (this.checkOver21(this.playersPersonalCards)) {
        return;
      }
    } while (question);
  }
  dealersTurn(): void {
    alert("У дилера " + this.sumsCards(this.dealersPersonalCards) + " очок.");
    while (this.sumsCards(this.dealersPersonalCards) < 17) {
      this.addCard(this.dealersPersonalCards);
      alert("У дилера " + this.sumsCards(this.dealersPersonalCards) + " очок.");
      if (this.checkOver21(this.dealersPersonalCards)) {
        return;
      }
    }
    this.checkWinCondition();
  }

  startGame(): void {
    this.dealersPersonalCards.push(
      ...this.cards.sort(() => Math.random() - 0.5).splice(0, 2)
    );
    this.playersPersonalCards.push(...this.cards.splice(0, 2));
    console.log(this.dealersPersonalCards);
    console.log(this.playersPersonalCards);

    this.playersTurn();
    if (!this.checkOver21(this.playersPersonalCards)) {
      this.dealersTurn();
    }
  }
}

let b = new Game(36);
b.startGame();
