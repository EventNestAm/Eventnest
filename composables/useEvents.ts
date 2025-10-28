import { ref, computed } from 'vue';
import Mafia from "@/assets/img/mafia.png?url";
import whatWhere from "@/assets/img/whatWhere.png?url";
import Football from "@/assets/img/football.png?url";
import Movie from "@/assets/img/movie.png?url";
import Music from "@/assets/img/music.png?url";
import Kargin from "@/assets/img/kargin.jpeg?url";
import Kargin2 from "@/assets/img/kargin2.jpeg?url";
// import Kargin3 from "@/assets/img/kargin3.jpeg?url";
export function useEvents() {
	const searchQuery = ref("");
	const selectedDate = ref("");
	const selectedCategory = ref("Բոլորը");

	const events = ref([
		{
			id: 1,
			title: "Կարգին հաղորդման վիկտորինա",
			date: "2025-08-01",
			time: "20:00",
			location: "73 Club, Երևան, Խանջյան փողոց, 33",
			image: Kargin,
			description:
				" Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
			category: "Վիկտորինա",
			eventDate: false, emailSent: true,
		},
		{
			id: 2,
			title: "Ֆուտբոլային վիկտորինա",
			date: "2025-08-08",
			time: "20:00",
			location: "73 Club, Երևան, Խանջյան փողոց, 33",
			image: Football,
			description:
				"Ճանաչիր ֆուտբոլը՝ հետաքրքիր հարցերի և թիմային խաղի միջոցով։ Մասնակցության վճար՝ 2000 AMD։",
			category: "Ֆուտբոլ",
			eventDate: false, emailSent: true,
		},
		{
			id: 3,
			title: "Երաժշտական վիկտորինա",
			date: "2025-08-15",
			time: "20:00",
			location: "73 Club, Երևան, Խանջյան փողոց, 33",
			image: Music,
			description:
				"Պատրա՞ստ ես ապացուցել, որ ճանաչում ես բոլոր երգերն առաջին նոտայից։ Երաժշտական վիկտորինան սպասում է միայն ամենախելացի ականջներին։ Մասնակցության վճար՝ 2000 AMD։",
			category: "Վիկտորինա",
			eventDate: false, emailSent: true,
		},
		{
			id: 4,
			title: "Ի՞նչ որտե՞ղ ե՞րբ",
			date: "2025-08-22",
			time: "20:00",
			location: "73 Club, Երևան, Խանջյան փողոց, 33",
			image: whatWhere,
			description:
				"Միացիր ամենախելացի ակումբին։«Ի՞նչ, Որտե՞ղ, Ե՞րբ» խաղը քեզ մարտահրավեր է նետում՝ վերլուծելու, մտածելու ու հաղթելու։ Մասնակցության վճար՝ 3000 AMD։",
			category: "Ի՞նչ որտե՞ղ ե՞րբ",
			eventDate: false, emailSent: true,
		},
		{
			id: 5,
			title: "Կինո վիկտորինա",
			date: "2025-08-29",
			time: "20:00",
			location: "73 Club, Երևան, Խանջյան փողոց, 33",
			image: Movie,
			description:
				"Քո ուղեղը IMDb-ից լավն է՞։Դե ապացուցիր՝ որքա՞ն լավ ես ճանաչում կինոաշխարհը՝ կատակներով, դերերով ու սաունդթրեքներով։Մասնակցության վճար՝ 2000 AMD",
			category: "Վիկտորինա",
			eventDate: false, emailSent: true,
		},
		{
			id: 6,
			title: "Կարգին հաղորդման վիկտորինա #2",
			date: "2025-10-12",
			time: "20:00",
			location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
			image: Kargin,
			description:
				"Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
			category: "Վիկտորինա",
			eventDate: false, emailSent: true,
		},
		{
			id: 7,
			title: "Կարգին հաղորդման վիկտորինա #3",
			date: "2025-11-07",
			time: "20:00",
			location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
			image: Kargin2,
			description:
				"Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
			category: "Վիկտորինա",
			eventDate: true, emailSent: true,
		},
		{
			id: 8,
			title: "Կարգին հաղորդման վիկտորինա #4",
			date: "2025-11-07",
			time: "20:00",
			location: "Layers Yerevan, Երևան, Մեսրոպ Մաշտոցի պողոտա 37",
			image: Kargin2,
			description:
				"Հումորային վիկտորինա, ներշնչված է լեգենդար և շատ սիրված «Կարգին հաղորդում» կատակերգական շոուից։  Մասնակցության վճար՝ 2000 AMD։",
			category: "Վիկտորինա",
			eventDate: true, emailSent: false,
		},
	]);

	async function addEvent(newEvent) {
		events.value.push(newEvent);

		try {
			await $fetch("/api/sendEventEmail", {
				method: "POST",
				body: {
					title: newEvent.title,
					date: newEvent.date,
					location: newEvent.location,
				},
			});
			console.log("📧 Email sent successfully for:", newEvent.title);
		} catch (error) {
			console.error("❌ Error sending event email:", error);
		}
	}

	events.value.forEach(async (event) => {
		if (!event.emailSent) {
			try {
				await $fetch("/api/sendEventEmail", {
					method: "POST",
					body: {
						title: event.title,
						date: event.date,
						location: event.location,
					},
				});
				console.log("📧 Email sent for:", event.title);
				event.emailSent = true; // mark as sent
			} catch (err) {
				console.error("❌ Failed to send email:", err);
			}
		}
	});


	const sortedEvents = computed(() => {
		return [...events.value].sort((a, b) => new Date(b.date) - new Date(a.date));
	});

	const filteredEvents = computed(() => {
		return sortedEvents.value.filter((event) => {
			const matchesCategory =
				selectedCategory.value === "Բոլորը" ||
				event.title.includes(selectedCategory.value) ||
				event.description.includes(selectedCategory.value) ||
				(event.category && event.category.includes(selectedCategory.value));

			const matchesSearch =
				event.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
				event.description.toLowerCase().includes(searchQuery.value.toLowerCase());

			const matchesDate = !selectedDate.value || event.date === selectedDate.value;

			return matchesCategory && matchesSearch && matchesDate;
		});
	});

	function formatDate(dateStr) {
		const date = new Date(dateStr);
		const weekdays = [
			"Կիրակի",
			"Երկուշաբթի",
			"Երեքշաբթի",
			"Չորեքշաբթի",
			"Հինգշաբթի",
			"Ուրբաթ",
			"Շաբաթ",
		];
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
		];
		return `${weekdays[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} թ․`;
	}


	return {
		events,
		filteredEvents,
		formatDate,
		searchQuery,
		selectedDate,
		selectedCategory,
		addEvent,
	};
}
