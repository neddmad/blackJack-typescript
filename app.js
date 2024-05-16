"use strict";

var Suit;
(function (Suit) {
    Suit["CLUBS"] = "clubs";
    Suit["DIAMONDS"] = "diamonds";
    Suit["HEARTS"] = "hearts";
    Suit["SPEADES"] = "speades"; 
})(Suit || (Suit = {}));
var Rank;
(function (Rank) {
    Rank["TWO"] = "two";
    Rank["THREE"] = "three";
    Rank["FOUR"] = "four";
    Rank["FIVE"] = "five";
    Rank["SIX"] = "six";
    Rank["SEVEN"] = "seven";
    Rank["EIGHT"] = "eight";
    Rank["NINE"] = "nine";
    Rank["TEN"] = "ten";
    Rank["JACK"] = "jack";
    Rank["QEEN"] = "queen";
    Rank["KING"] = "king";
    Rank["ACE"] = "ace";
})(Rank || (Rank = {}));
class Card {
    constructor(_rank, _suit) {
        this._rank = _rank;
        this._suit = _suit;
    }
    get rank() {
        return this._rank;
    }
    get suit() {
        return this._suit;
    }
}
class Dealer {
    constructor(size) {
        this.cards = [];
        this.dealersPersonalCards = [];
        const suits = [
            Suit.CLUBS, Suit.DIAMONDS,
            Suit.HEARTS, Suit.SPEADES
        ];
        const ranks = [
            Rank.TWO, Rank.THREE, Rank.FOUR, Rank.FIVE,
            Rank.SIX, Rank.SEVEN, Rank.EIGHT, Rank.NINE,
            Rank.TEN, Rank.JACK, Rank.QEEN, Rank.KING, Rank.ACE
        ];
        for (const suit of suits) {
            for (const rank of ranks) {
                if (size === 36 && (rank === Rank.TWO || rank === Rank.THREE || rank === Rank.FOUR || rank === Rank.FIVE)) {
                    continue;
                }
                this.cards.push(new Card(rank, suit));
            }
        }
    }
}
class Player extends Dealer {
    constructor(size) {
        super(size);
        this.playersPersonalCards = [];
    }
}
class Game extends Player {
    constructor(size) {
        super(size);
    }
    addCard(person) {
        return person.push(...this.cards.splice(0, 1));
    }
    wordToNumber(word) {
        let wrdToNumber = {
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
            ace: 1
        };
        if (word in wrdToNumber) {
            if (word.startsWith('ace')) {
                const randomValue = Math.random() < 0.5 ? 1 : 11;
                wrdToNumber['ace'] = randomValue;
            }
            return wrdToNumber[word];
        }
        else {
            return NaN;
        }
    }
    sumsCards(cardsToTransform) {
        return cardsToTransform.map(e => this.wordToNumber(e.rank)).reduce((init, val) => init + val);
    }
    checkOver21(personalCard) {
        if (this.sumsCards(personalCard) > 21) {
            alert(' У ' + (personalCard === this.dealersPersonalCards ? 'Дилера ' : 'Гравця ') + this.sumsCards(personalCard) + ' очок. Програв - ' + (personalCard === this.dealersPersonalCards ? 'Дилер' : 'Гравець'));
            return true;
        }
        else {
            return false;
        }
    }
    checkWinCondition() {
        if (this.sumsCards(this.dealersPersonalCards) > this.sumsCards(this.playersPersonalCards) || this.sumsCards(this.dealersPersonalCards) === this.sumsCards(this.playersPersonalCards)) {
            return alert('Переміг дилер');
        }
        else {
            return alert('Переміг гравець');
        }
    }
    playersTurn() {
        let question;
        do {
            question = prompt('У Вас ' + this.sumsCards(this.playersPersonalCards) + ' очок. ' + 'Чи бажаєте Ви взяти ще одну карту?');
            if ((question === null || question === void 0 ? void 0 : question.toLowerCase()) === 'так') {
                this.addCard(this.playersPersonalCards);
                return;
            }
            if ((question === null || question === void 0 ? void 0 : question.toLowerCase()) === 'ні' || question === "" || question === null) {
                alert('У Вас залишається ' + this.sumsCards(this.playersPersonalCards) + ' очок. ');
                return;
            }
            if (this.checkOver21(this.playersPersonalCards)) {
                return;
            }
        } while (question);
    }
    dealersTurn() {
        alert('У дилера ' + this.sumsCards(this.dealersPersonalCards) + ' очок.');
        while (this.sumsCards(this.dealersPersonalCards) < 17) {
            this.addCard(this.dealersPersonalCards);
            alert('У дилера ' + this.sumsCards(this.dealersPersonalCards) + ' очок.');
            if (this.checkOver21(this.dealersPersonalCards)) {
                return;
            }
        }
        this.checkWinCondition();
    }
    startGame() {
        this.dealersPersonalCards.push(...this.cards.sort(() => Math.random() - 0.5).splice(0, 2));
        this.playersPersonalCards.push(...this.cards.splice(0, 2));
        console.log(this.dealersPersonalCards);
        console.log(this.playersPersonalCards);
        this.playersTurn();
        if (!(this.checkOver21(this.playersPersonalCards))) {
            this.dealersTurn();
        }
    }
}
let b = new Game(36);
b.startGame();
