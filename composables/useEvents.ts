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

export function useEvents() {
  const searchQuery = ref("")
  const selectedDate = ref("")
  const selectedCategory = ref("Բոլորը")
  const { t } = useI18n();
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
      id: 14,
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
      emailSent: true, groupName: true
    },
    {
      id: 15,
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
      eventDate: true,
      emailSent: true, groupName: true
    },
  ])

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
    [...events.value].sort((a, b) => new Date(b.date) - new Date(a.date))
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
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const eventDate = new Date(event.date)
      eventDate.setHours(0, 0, 0, 0)

      const isUpcoming = eventDate >= today

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

      return isUpcoming && matchesCategory && matchesSearch && matchesDate
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
    events,
    filteredEvents,
    newFilteredEvents,
    formatDate,
    searchQuery,
    selectedDate,
    selectedCategory,
    addEvent,
  }
}
