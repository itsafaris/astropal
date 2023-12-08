import aquariusImg from "@components/zodiacSigns/aquarius";
import ariesImg from "@components/zodiacSigns/aries";
import cancerImg from "@components/zodiacSigns/cancer";
import capricornImg from "@components/zodiacSigns/capricorn";
import geminiImg from "@components/zodiacSigns/gemini";
import leoImg from "@components/zodiacSigns/leo";
import libraImg from "@components/zodiacSigns/libra";
import piscesImg from "@components/zodiacSigns/pisces";
import sagittariusImg from "@components/zodiacSigns/sagittarius";
import scorpioImg from "@components/zodiacSigns/scorpio";
import taurusImg from "@components/zodiacSigns/taurus";
import virgoImg from "@components/zodiacSigns/virgo";

type ZodiacSignType =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

interface ZodiacSignData {
  about: string;
  career: string;
  compatibility: string;
  date_range: string;
  element: string;
  health: string;
  love: string;
  man: string;
  name: string;
  nature: string;
  relationship: string;
  ruling_planet: string;
  strengths: string;
  symbol: string;
  weaknesses: string;
  woman: string;
}

interface NumerologyData {
  date: string;
  destiny_number: number;
  evil_num: string;
  fav_color: string;
  fav_day: string;
  fav_god: string;
  fav_mantra: string;
  fav_metal: string;
  fav_stone: string;
  fav_substone: string;
  friendly_num: string;
  name: string;
  name_number: number;
  neutral_num: string;
  radical_num: string;
  radical_number: number;
  radical_ruler: string;
}

export function getZodiacSign(birthDate: string): {
  name: ZodiacSignType;
  imgUrl?: string;
  svgComponent: typeof aquariusImg;
} {
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript Date object

  switch (true) {
    case (month === 3 && date.getDate() >= 21) || (month === 4 && date.getDate() <= 19):
      return {
        name: "aries",
        svgComponent: ariesImg,
      };
    case (month === 4 && date.getDate() >= 20) || (month === 5 && date.getDate() <= 20):
      return {
        name: "taurus",
        svgComponent: taurusImg,
      };
    case (month === 5 && date.getDate() >= 21) || (month === 6 && date.getDate() <= 20):
      return {
        name: "gemini",
        svgComponent: geminiImg,
      };
    case (month === 6 && date.getDate() >= 21) || (month === 7 && date.getDate() <= 22):
      return {
        name: "cancer",
        svgComponent: cancerImg,
      };
    case (month === 7 && date.getDate() >= 23) || (month === 8 && date.getDate() <= 22):
      return {
        name: "leo",
        svgComponent: leoImg,
      };
    case (month === 8 && date.getDate() >= 23) || (month === 9 && date.getDate() <= 22):
      return {
        name: "virgo",
        svgComponent: virgoImg,
      };
    case (month === 9 && date.getDate() >= 23) || (month === 10 && date.getDate() <= 22):
      return {
        name: "libra",
        svgComponent: libraImg,
      };
    case (month === 10 && date.getDate() >= 23) || (month === 11 && date.getDate() <= 21):
      return {
        name: "scorpio",
        svgComponent: scorpioImg,
      };
    case (month === 11 && date.getDate() >= 22) || (month === 12 && date.getDate() <= 21):
      return {
        name: "sagittarius",
        svgComponent: sagittariusImg,
      };
    case (month === 12 && date.getDate() >= 22) || (month === 1 && date.getDate() <= 19):
      return {
        name: "capricorn",
        svgComponent: capricornImg,
      };
    case (month === 1 && date.getDate() >= 20) || (month === 2 && date.getDate() <= 18):
      return {
        name: "aquarius",
        svgComponent: aquariusImg,
      };
    case (month === 2 && date.getDate() >= 19) || (month === 3 && date.getDate() <= 20):
      return {
        name: "pisces",
        svgComponent: piscesImg,
      };
    default:
      throw new Error("Failed to compute Zodiac sign");
  }
}

interface Service {
  getDailyPhrase(): Promise<string>;
  getZodiacSignData(signType: ZodiacSignType): Promise<ZodiacSignData>;
  getNumerologyData(): Promise<NumerologyData>;
}

const serviceMock: Service = {
  getDailyPhrase: () => {
    return new Promise((res) =>
      res("Success is not the key to happiness. Happiness is the key to success.")
    );
  },

  getZodiacSignData: () => {
    return new Promise((res) => {
      res({
        about:
          "Libra sign epitomizes balance and fairness. The sign restores equilibrium to all affairs, no matter how big or small it is. Libra individuals are fascinated by balance and symmetry. They enjoy keeping their brains stimulated with books, discussions and fighting for justice. They often self-indulge in expensive and beautiful things. They may even have a taste for the finer things in life. They will focus more on partnerships. Relationships are paramount for them. However, they will prioritize the needs of others.\nLibrans admire harmony and love gentleness and peace around them. Hence, they become mediators and patch up the quarrels happening between others whenever possible. They try to keep everyone happy and engaged. They are ruled by Venus and hence, adore high art, intellectualism, and connoisseurship. Also, they are cool, calculative, cerebral and charming. They can charm anyone and also draw many people to them. They are fond of social aspects as well.",
        career:
          "Libra natives always consider their colleagues as their close mates. You thrive in a company culture where there is low-drama, harmony, trustworthy employees and lots of fun working in a team. You find it a bit tough to work in a more buttoned-up and reserved environment. You avoid drama in the workplace. You are very creative and fun-loving and always try to have fun in the workplace. You bristle at rigidity, preferring to find your way when there is a lot of workload or when you have a hectic schedule. The big picture is far more important to you than the details. This means you may lose steam halfway through a project—especially without a team member to hold you accountable and cheer you to do more efforts.",
        compatibility: "Gemini, Aquarius, Leo, Sagittarius",
        date_range: "September 23 - October 22",
        element: "Air",
        health:
          "Balance is the key to Libra's health and wellbeing. You need to have a balanced diet, balance of work and recreation and maintain balanced relationships with other people. You tend to be overactive and restless. You need to stay away from thoughtless actions as they can bring stress and tension. You have a habit to work under extreme conditions. Thus, you may suffer from nervous exhaustion which may lead to poor dietary habits. Due to systematic overload, you feel tired and weak at times. Also, you may suffer from memory loss as well. So having a quiet time and minimum simulation will be of great benefit to you.\nThe ruling planet Venus holds sway over skin, hair, and veins, as well as the throat, kidneys, and the lumbar region. You are prone to weakness in the lower back. You may also be prone to kidney ailments and skin breakouts which can cause restlessness. Avoid intake of alcohol and the food that is difficult to digest. Drinking plenty of water will be helpful for you as it will keep your system flushed and free from toxins.",
        love: "Librans love to be in love with someone and be loved in return. You love the traditional accouterments of romance. You admire beauty and harmony in all forms; music, art, people, and romance. You will not just look for love and romance but also for the one who can co-create an easy rapport. You are very romantic and soft-hearted. You expect to be appreciated by your loved ones and reciprocate well to the admiration. You enjoy being flattered so you want them to compliment you for your choice of restaurants, films, attire, and everything you feel is best for you.\nYou have a natural ability to appease your beloved and usually feel inclined to do things he/she wants to do. You are always looking for the one who satisfies you emotionally, spiritually, intellectually, and physically. Also, you are attracted to the one who stands out in a crowd.",
        man: "Libra man is an expert communicator. You always have the perfect thing to say in any situation. You can come off as diplomatic, tactful, and charismatic according to the situation. You belong to a cardinal sign so motivated to start a conversation in social settings. Libra men are ruled by Venus, the planet of love, pleasure, and relationships. Libra men are filled to the brim with romantic thoughts, and also love to share them.\nYour natural optimism is one of the main reasons why people find you perfect for giving advice, an ice breaker to strike up a conversation, or witty one-liners to make the whole room laugh. You are a socialist and have a ton of friends, but everything you do will be in a partnership. You can turn every outing into an exciting and romantic experience with your charm and silliness. Although you are fun-loving and flexible in nature, you may get annoyed when you feel you are inconsistent.",
        name: "Libra",
        nature:
          "Libra natives will tend to be highly imaginative, pleasant, courteous, creative and elegant individuals. You have a very cool-headed and calm personality. Usually, you do not get into hot discussions easily. For instance, you get angry, but your anger will be short-lived. You are balanced and fascinated by symmetry. You are always willing to help people in need. You voluntarily provide financial, moral and psychological support to your near and dear ones. You are socially inclined and like to spend time and resources with loved ones.\nAlthough you are highly creative, you will try traditional methods first. If this method is not working, you will try new methods to achieve success. You are good at expressing yourselves about all aspects of life and also possess excellent convincing power. You simply like to weigh the best options for yourselves as well as the people around you.",
        relationship:
          "Libra relationships are expected to be balanced, with an equal give and take. You will spend an enormous amount of energy and time cultivating a long term relationship. Once you are committed to someone, you are very loyal. You strive for harmony in your relationships.\nLibra is an amazing sign to be in a relationship with. You literally do your best in relationships and once someone has won your heart, you will give your best to maintain it. You are very thoughtful, caring, loving and will give everything for the people you love. You are social butterflies and do well in groups of people. Also, you have a natural skills of understanding, mediating, and collaborating with people and these skills will help you maintain your relationships with others. You avoid getting into raging arguments and fights and always try to sort things out logically no matter how tense the situation is. You do everything in your power to make things right and return to peace.",
        ruling_planet: "Venus",
        strengths: "Cooperative, diplomatic, gracious, fair-minded, social",
        symbol: "Scales",
        weaknesses: "Indecisive, avoids confrontations, will carry a grudge, self-pity",
        woman:
          "Libra women are very intelligent, coquettish, charming, captivating, and friendly. So you can draw people to you naturally and easily. You are always up for a wild and playful adventure. You embody fairness, justice, and balance. Libra women are represented by the scales, so ideally weighted, flawless, and complete. Also, you are highly sociable and have a gift for communication. You are a fascinating mix of rational logic and erratic emotion. You shoot holes in others’ flawed opinions then make up for winning the argument with your charm. You are always open to reason and common sense. You will good-naturedly admit your mistakes if people talk to you logically. You are always fashionable, elegant, tasteful, and well-groomed. Above this, you have an eye for quality, beauty, and harmony in all things. Your refined and caring nature will help you take care of your partner both physically and emotionally. You love everything about romance and partnership and will constantly work towards improving a relationship.",
      });
    });
  },

  getNumerologyData: () => {
    return new Promise((res) => {
      res({
        date: "25-12-1988",
        destiny_number: 9,
        evil_num: "1,9",
        fav_color: "Black",
        fav_day: "Sunday, Monday",
        fav_god: "Narsingh Bhagawan",
        fav_mantra: "|| Om Keng Ketave Namah ||",
        fav_metal: "Iron",
        fav_stone: "Cat's Eye",
        fav_substone: "Golden Hakik",
        friendly_num: "3,2,6",
        name: "demo",
        name_number: 2,
        neutral_num: "4,5,8",
        radical_num: "7",
        radical_number: 7,
        radical_ruler: "Ketu",
      });
    });
  },
};

const service: Service = {
  getDailyPhrase: async () => {
    const url = "https://horoscope-astrology.p.rapidapi.com/dailyphrase";
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d666bab423msh3c76e4627e8fc65p1a17d2jsn04a8b2236f8b",
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return result.daily;
  },

  getZodiacSignData: async (signType: ZodiacSignType) => {
    const url = `https://horoscope-astrology.p.rapidapi.com/sign?s=${signType}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "d666bab423msh3c76e4627e8fc65p1a17d2jsn04a8b2236f8b",
        "X-RapidAPI-Host": "horoscope-astrology.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  },

  getNumerologyData: async () => {
    const url = "https://vedicrishi-horoscope-matching-v1.p.rapidapi.com/numero_table/";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "d666bab423msh3c76e4627e8fc65p1a17d2jsn04a8b2236f8b",
        "X-RapidAPI-Host": "vedicrishi-horoscope-matching-v1.p.rapidapi.com",
      },
      body: JSON.stringify({
        day: "25",
        month: "12",
        year: "1988",
        hour: "2",
        min: "30",
        name: "demo",
        lat: "25.123",
        lon: "82.34",
        tzone: "5.5",
      }),
    };

    const response = await fetch(url, options);
    const result = await response.json();

    return result;
  },
};

export function getService({ mock = false }: { mock: boolean }) {
  return mock ? serviceMock : service;
}
