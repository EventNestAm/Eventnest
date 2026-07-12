import Mafiaa from "@/assets/img/quizes/Mafiaa.png?url"
import whatWhere from "@/assets/img/quizes/whatWhere.png?url"
import Football from "@/assets/img/quizes/football.png?url"
import Movie from "@/assets/img/quizes/movie.png?url"
import Moviee from "@/assets/img/quizes/moviee.jpg?url"
import Music from "@/assets/img/quizes/music.png?url"
import Kargin from "@/assets/img/quizes/kargin.jpeg?url"
import Kargin2 from "@/assets/img/quizes/kargin2.jpeg?url"
import KarginSerial from "@/assets/img/quizes/kargin_serial.jpg?url"
import Vitamin from "@/assets/img/quizes/Vitamin.jpeg"
import Merbaky from "@/assets/img/quizes/merbaky.jpg"
import Whoami from "@/assets/img/quizes/whoami.jpg"
import ourGame from "@/assets/img/quizes/ourGame.jpg"
import footballCup from "@/assets/img/quizes/footballCup.png"
import karaokeBattle from "@/assets/img/quizes/karaokeBattle.png"
import musicQuiz from "@/assets/img/quizes/musicQuiz.png"
import hayavari from "@/assets/img/quizes/hayavari.png"
import cartoon from "@/assets/img/quizes/cartoon.png"
import bookQuiz from "@/assets/img/quizes/bookQuiz.png"

export function useEvents() {
  const searchQuery = ref("")
  const selectedDate = ref("")
  const selectedCategory = ref("Բոլորը")
  const { t } = useI18n();
  const today = computed(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  })

  function isUpcoming(dateStr, todayDate) {
    const d = new Date(dateStr)
    d.setHours(0, 0, 0, 0)
    return d >= todayDate
  }
  const events = ref([
    {
      id: 1,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #1`,
      slug: "kargin-haxordman-viktorina-1",
      date: "2025-08-01",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: Kargin,
      description:
        "Հումորային վիկտորինա՝ ներշնչված լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 2,
      title: `${t("FOOTBALL_TITLE")} ${t("QUIZ_TITLE")} #1`,
      slug: "futbolayin-1",
      date: "2025-08-08",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: Football,
      description:
        "Ճանաչիր ֆուտբոլը՝ հետաքրքիր հարցերի և թիմային խաղի միջոցով։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("FOOTBALL"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 3,
      title: `${t("MUSICIAL_TITLE")} ${t("QUIZ_TITLE")} #1`,
      slug: "erajshtakan-1",
      date: "2025-08-15",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: Music,
      description:
        "Ապացուցիր, որ ճանաչում ես բոլոր երգերն առաջին նոտայից։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 4,
      title: t("WHAT_WHERE_WHEN"),
      slug: "inch-vortex-erb-1",
      date: "2025-08-22",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: whatWhere,
      description:
        "Միացիր ամենախելացի ակումբին։ «Ի՞նչ, Որտե՞ղ, Ե՞րբ» խաղը մարտահրավեր է նետում՝ մտածելու ու հաղթելու։ Մասնակցության վճար՝ 3000 AMD։",
      category: t("WHAT_WHERE_WHEN"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 5,
      title: `${t("MOVIE_QUIZ_TITLE")} #1`,
      slug: "kino-viktorina-1",
      date: "2025-08-29",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: Movie,
      description:
        "Քո ուղեղը IMDb-ից լավն է՞։ Ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 6,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #2`,
      slug: "kargin-haxordman-viktorina-2",
      date: "2025-10-12",
      time: "20:00",
      location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
      image: Kargin,
      description:
        "Հումորային վիկտորինա՝ ներշնչված սիրված «Կարգին հաղորդում» շոուից։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 7,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #3`,
      slug: "kargin-haxordman-viktorina-3",
      date: "2025-11-07",
      time: "20:00",
      location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
      image: Kargin2,
      description:
        "Նոր ձևաչափով «Կարգին հաղորդման» վիկտորինա՝ հումորով ու հիշողություններով։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 8,
      title: `${t("MOVIE_QUIZ_TITLE")} #2`,
      slug: "kino-viktorina-2",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-01-07",
      dateTitle: "Հունվարի 8",
      time: "19:00",
      price: "3000 AMD",
      location: "Fresca, 30, 2 Պարոնյան փողոց, Երևան",
      image: Movie,
      description:
        "Քո ուղեղը IMDb-ից լավն է՞։ Ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 9,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #4`,
      slug: "kargin-haxordman-viktorina-4",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-02-12",
      dateTitle: "Փետրվարի 12",
      time: "19:00",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Kargin2,
      description:
        "Ֆանտաստիկադ լա՞վ է աշխատում, քեզ համար կարևո՞ր է հաճելի Լաուրան ու և բայց սակայն փնտրում ես ավելի՞ն..",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 10,
      title: `Vitamin Club ${t("QUIZ_TITLE")} #1`,
      slug: "vitamin-club-quiz-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-02-27",
      dateTitle: "Փետրվարի 27",
      time: "19:00",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Vitamin,
      description:
        t('VITAMIN_PROMO'),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true,
      groupName: true
    },
    {
      id: 11,
      title: `${t("MAFIA_TITLE")} #1`,
      slug: "mafia-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-02-28",
      dateTitle: "Փետրվարի 28",
      time: "19:00",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Mafiaa,
      description:
        t("MAFIA_PROMO"),
      category: t("MAFIA"),
      eventDate: false,
      emailSent: true,
      groupName: false
    },
    {
      id: 12,
      title: `${t("MOVIE_QUIZ_TITLE")} #3`,
      slug: "kino-viktorina-3",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-03-22",
      dateTitle: "Մարտի 22",
      time: "19:00",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Moviee,
      description:
        t("CINEMAQUIZTEXT"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true,
      groupName: false
    },
    {
      id: 13,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #5`,
      slug: "kargin-haxordman-viktorina-5",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-03-29",
      dateTitle: "Մարտի 29",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 14,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #6`,
      slug: "kargin-haxordman-viktorina-6",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-04-09",
      dateTitle: "Ապրիլի 9",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 15,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #7`,
      slug: "kargin-haxordman-viktorina-7",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-04-18",
      dateTitle: "Ապրիլի 18",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true, isSoldout: true
    },
    {
      id: 16,
      title: `Կարգին Սերիալ ${t("QUIZ_TITLE")} #1`,
      slug: "kargin-serial-viktorina-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-04-19",
      dateTitle: "Ապրիլի 19",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: KarginSerial,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 17,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #8`,
      slug: "kargin-haxordman-viktorina-8",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-04-25",
      dateTitle: "Ապրիլի 25",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true, isSoldout: false
    },
    {
      id: 18,
      title: `Կարգին Սերիալ ${t("QUIZ_TITLE")} #2`,
      slug: "kargin-serial-viktorina-2",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-03",
      dateTitle: "Մայիսի 03",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: KarginSerial,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 19,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #9`,
      slug: "kargin-haxordman-viktorina-9",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-02",
      dateTitle: "Մայիսի 2",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true, isSoldout: false
    },
    {
      id: 20,
      title: `${t("WHOAMI")} #1`,
      slug: "ovem-es-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-17",
      dateTitle: "Մայիսի 17",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Whoami,
      description:
        t("WHOAMI_DESC"),
      category: t("GAMES"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 20
    },
    {
      id: 21,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #10`,
      slug: "kargin-haxordman-viktorina-10",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-16",
      dateTitle: "Մայիսի 16",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 0
    },
    {
      id: 22,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #11`,
      slug: "kargin-haxordman-viktorina-11",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-23",
      dateTitle: "Մայիսի 23",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 8
    },
    {
      id: 23,
      title: `Մեր Խաղը #1`,
      slug: "mer-xaxy-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-24",
      dateTitle: "Մայիսի 24",
      time: "19:30",
      price: "1500 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: ourGame,
      description:
        "5 խենթ փուլեր՝ ֆիլմեր, մեմեր, երաժշտություն, դետեկտիվ հանելուկներ և «Ռանդոմ ռիսկ»:",
      category: t("GAME"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 10
    },
    {
      id: 24,
      title: `${t("MOVIE_QUIZ_TITLE")} #4`,
      slug: "kino-viktorina-4",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-28",
      dateTitle: "Մարտի 28",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Moviee,
      description:
        t("CINEMAQUIZTEXT"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 30
    },
    {
      id: 25,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #12`,
      slug: "kargin-haxordman-viktorina-12",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-05-31",
      dateTitle: "Մայիսի 31",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 10
    },
    {
      id: 26,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #13`,
      slug: "kargin-haxordman-viktorina-13",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-05",
      dateTitle: "Հունիսի 05",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: true, quantity: 0
    },
    {
      id: 27,
      title: `Աշխարհի առաջնություն ${t("QUIZ_TITLE")}`,
      slug: "ashxarhi-arajnutyun-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-06",
      dateTitle: "Հունիսի 06",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: footballCup,
      description:
        t("FOOTBALL"),
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: true, quantity: 0
    },
    {
      id: 28,
      title: `Կարաոկե բաթլ #1`,
      slug: "karaoke-battle-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-13",
      dateTitle: "Հունիսի 13",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: karaokeBattle,
      description:
        t("KARAOKE_BATTLE"),
      category: t("GAME"),
      eventDate: true,
      emailSent: true, groupName: false, isSoldout: false, quantity: 2
    },
    {
      id: 29,
      title: `${t("MUSICIAL_TITLE")} ${t("QUIZ_TITLE")} #2`,
      slug: "music-quiz-2",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-14",
      dateTitle: "Հունիսի 14",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: musicQuiz,
      description:
        t("MUSIC_QUIZ_TITLE"),
      category: [t("QUIZ"), t("MUSIC")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 10
    },
    {
      id: 30,
      title: `Հայավարի ${t("QUIZ_TITLE")} #1`,
      slug: "hayavari-quiz-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-20",
      dateTitle: "Հունիսի 20",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: hayavari,
      description:
        t("HAYAVARI_QUIZ"),
      category: t("QUIZ"),
      eventDate: true, forceClosed: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 30
    },
    {
      id: 31,
      title: `Մուլտֆիլմերի ${t("QUIZ_TITLE")} #1`,
      slug: "cartoon-quiz-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-21",
      dateTitle: "Հունիսի 21",
      time: "19:30",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: cartoon,
      description:
        t("CARTOON_QUIZ"),
      category: t("QUIZ"),
      eventDate: true, forceClosed: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 45
    },
    {
      id: 32,
      title: `Կարգին Սերիալ ${t("QUIZ_TITLE")} #3`,
      slug: "kargin-serial-viktorina-3",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-27",
      dateTitle: "Հունիսի 27",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: KarginSerial,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true, quantity: 8
    },
    {
      id: 33,
      title: `Գրքի ${t("QUIZ_TITLE")} #1`,
      slug: "book-quiz-1",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-06-28",
      dateTitle: "Հունիսի 28",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: bookQuiz,
      description:
        t("BOOK_QUIZ"),
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true, quantity: 10
    },
    {
      id: 34,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #14`,
      slug: "kargin-haxordman-viktorina-14",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-05",
      dateTitle: "Հուլիսի 05",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: [t("QUIZ"), t("KARGIN")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 20
    },
    {
      id: 35,
      title: `Game of Thrones ${t("QUIZ_TITLE")} #1`,
      slug: "game-of-thrones",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-04",
      dateTitle: "Հուլիսի 04",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("GAME_OF_THRONES_QUIZ_DESC"),
      category: [t("QUIZ"), t("MOVIES")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 20
    },
    {
      id: 37,
      title: `${t("FOOTBALL")} ${t("QUIZ_TITLE")} #3`,
      slug: "football-quiz-3",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-19",
      dateTitle: "Հուլիսի 19",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: footballCup,
      description:
        t("FOOTBALL_QUIZ_DESC"),
      category: [t("QUIZ"), t("FOOTBALL")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 35
    },
    {
      id: 38,
      title: `Կարաոկե բաթլ #2`,
      slug: "karaoke-battle-2",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-10",
      dateTitle: "Հուլիսի 10",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: karaokeBattle,
      description:
        t("KARAOKE_BATTLE"),
      category: t("KARAOKE"),
      eventDate: true,
      emailSent: true, groupName: false, isSoldout: false, quantity: 5
    },
    {
      id: 39,
      title: `Կարգին հաղորդման ${t("QUIZ_TITLE")} #15`,
      slug: "kargin-haxordman-viktorina-15",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-12",
      dateTitle: "Հուլիսի 12",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: Kargin2,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: [t("QUIZ"), t("KARGIN")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 20
    },
    {
      id: 40,
      title: `Կարգին Սերիալ ${t("QUIZ_TITLE")} #4`,
      slug: "kargin-serial-viktorina-4",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-25",
      dateTitle: "Հուլիսի 25",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: KarginSerial,
      description:
        t("KARGIN_QUIZ_TITLE"),
      category: [t("QUIZ"), t("KARGIN")],
      eventDate: false,
      emailSent: true, groupName: true, quantity: 15
    },
    {
      id: 41,
      title: `${t("MUSICIAL_TITLE")} ${t("QUIZ_TITLE")} #2`,
      slug: "music-quiz-2",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-26",
      dateTitle: "Հուլիսի 26",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: musicQuiz,
      description:
        t("MUSIC_QUIZ_TITLE"),
      category: [t("QUIZ"), t("MUSIC")],
      eventDate: true,
      emailSent: true, groupName: true, isSoldout: false, quantity: 10
    },
    {
      id: 41,
      title: `${t("MOVIE_NIGHT")}`,
      slug: "movie-night",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-07-09",
      dateTitle: "Հուլիսի 9",
      time: "19:30",
      price: "3000 AMD",
      location: "The Kond House - 46 Leo Street",
      image: musicQuiz,
      description:
        t("MOVIE_NIGHT_DESC"),
      category: [t("QUIZ"), t("MOVIES")],
      eventDate: true,
      emailSent: true, groupName: false, isSoldout: false, quantity: 10
    },
  ])
  const eventsWithStatus = computed(() =>
    events.value.map(event => {
      const dateUpcoming = isUpcoming(event.date, today.value)
      const closed = event.forceClosed !== undefined ? event.forceClosed : !dateUpcoming
      return {
        ...event,
        eventDate: !closed,
        isUpcoming: !closed,
        isClosed: closed,
      }
    })
  )
  async function addEvent(newEvent) {
    events.value.push(newEvent)

    try {
      const res = await $fetch("/api/events/create", {
        method: "POST",
        body: {
          title: newEvent.title,
          date: newEvent.date,
          location: newEvent.location,
        },
      })
      console.log("📧 Email sent successfully for:", newEvent.title, res)
      newEvent.emailSent = true
    } catch (error) {
      console.error("❌ Error creating event or sending email:", error)
    }

  }

  events.value.forEach(async (event) => {
    if (!event.emailSent) {
      console.log('Hello')
      try {
        const res = await $fetch("/api/events/create", {
          method: "POST",
          body: {
            title: event.title,
            date: event.date,
            location: event.location,
          },
        })
        console.log("📧 Email sent for:", event.title, res)
        event.emailSent = true
      } catch (err) {
        console.error("❌ Failed to send email:", err)
      }
    }
  })

  const sortedEvents = computed(() =>
    [...eventsWithStatus.value].sort((a, b) => new Date(b.date) - new Date(a.date))
  )

  const filteredEvents = computed(() =>
    sortedEvents.value.filter((event) => {
      const matchesCategory =
        selectedCategory.value === "Բոլորը" ||
        event.title.includes(selectedCategory.value) ||
        event.description.includes(selectedCategory.value) ||
        (event.category && event.category.includes(selectedCategory.value))

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesDate =
        !selectedDate.value || event.date === selectedDate.value

      return matchesCategory && matchesSearch && matchesDate
    })
  )

  const newFilteredEvents = computed(() =>
    sortedEvents.value.filter((event) => {
      const matchesCategory =
        selectedCategory.value === "Բոլորը" ||
        event.title.includes(selectedCategory.value) ||
        event.description.includes(selectedCategory.value) ||
        (event.category && event.category.includes(selectedCategory.value))

      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesDate =
        !selectedDate.value || event.date === selectedDate.value

      return event.isUpcoming && matchesCategory && matchesSearch && matchesDate
    })
  )

  function formatDate(dateStr) {
    const date = new Date(dateStr)
    const weekdays = [
      "Կիրակի",
      "Երկուշաբթի",
      "Երեքշաբթի",
      "Չորեքշաբթի",
      "Հինգշաբթի",
      "Ուրբաթ",
      "Շաբաթ",
    ]
    const months = [
      "հունվարի",
      "փետրվարի",
      "մարտի",
      "ապրիլի",
      "մայիսի",
      "հունիսի",
      "հուլիսի",
      "օգոստոսի",
      "սեպտեմբերի",
      "հոկտեմբերի",
      "նոյեմբերի",
      "դեկտեմբերի",
    ]
    return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} թ․`
  }

  return {
    events: eventsWithStatus,
    filteredEvents,
    newFilteredEvents,
    formatDate,
    searchQuery,
    selectedDate,
    selectedCategory,
    addEvent,
  }
}
