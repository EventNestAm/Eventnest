import Mafiaa from "@/assets/img/Mafiaa.png?url"
import whatWhere from "@/assets/img/whatWhere.png?url"
import Football from "@/assets/img/football.png?url"
import Movie from "@/assets/img/movie.png?url"
import Moviee from "@/assets/img/moviee.png?url"
import Music from "@/assets/img/music.png?url"
import Kargin from "@/assets/img/kargin.jpeg?url"
import Kargin2 from "@/assets/img/kargin2.jpeg?url"
import Vitamin from "@/assets/img/Vitamin.jpeg"

export function useEvents() {
  const searchQuery = ref("")
  const selectedDate = ref("")
  const selectedCategory = ref("Բոլորը")
  const { t } = useI18n();
  const events = ref([
    {
      id: 1,
      title: "Կարգին հաղորդման վիկտորինա",
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
      title: "Ֆուտբոլային վիկտորինա",
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
      title: "Երաժշտական վիկտորինա",
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
      title: "Ի՞նչ որտե՞ղ ե՞րբ",
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
      title: "Կինո վիկտորինա",
      slug: "kino-viktorina-1",
      date: "2025-08-29",
      time: "20:00",
      location: "73 Club, Երևան, Խանջյան փողոց, 33",
      image: Moviee,
      description:
        "Քո ուղեղը IMDb-ից լավն է՞։ Ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը։ Մասնակցության վճար՝ 2000 AMD։",
      category: t("QUIZ"),
      eventDate: false,
      emailSent: true, groupName: true
    },
    {
      id: 6,
      title: "Կարգին հաղորդման վիկտորինա #2",
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
      title: "Կարգին հաղորդման վիկտորինա #3",
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
      title: "Կինո վիկտորինա #2",
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
      title: "Կարգին հաղորդման վիկտորինա #4",
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
      title: "Vitamin Club Quiz #1",
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
      title: "Mafia #1",
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
      title: "Կինո վիկտորինա #3",
      slug: "kino-viktorina-3",
      titleDesc: "An evening of strategy, emotions and people like you",
      date: "2026-03-12",
      dateTitle: "Մարտի 12",
      time: "19:00",
      price: "3000 AMD",
      location: "Loft - Մոսկովյան 3Ա",
      image: Moviee,
      description:
        "Քո ուղեղը IMDb-ից լավն է՞։ Ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը։ Մասնակցության վճարը անձի համար՝ 3000 AMD։",
      category: t("QUIZ"),
      eventDate: true,
      emailSent: true,
      groupName: true
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
    formatDate,
    searchQuery,
    selectedDate,
    selectedCategory,
    addEvent,
  }
}
