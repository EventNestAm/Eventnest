<script setup>
onMounted(() => {
	const form = document.getElementById("form");
	const result = document.getElementById("result");

	form.addEventListener("submit", function (e) {
		e.preventDefault();
		form.classList.add("was-validated");
		if (!form.checkValidity()) {
			form.querySelectorAll(":invalid")[0].focus();
			return;
		}
		const formData = new FormData(form);
		const object = Object.fromEntries(formData);
		const json = JSON.stringify(object);

		result.innerHTML = "Sending...";

		fetch("https://api.web3forms.com/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: json,
		})
			.then(async (response) => {
				let json = await response.json();
				if (response.status == 200) {
					result.classList.add("text-green-500");
					result.innerHTML = json.message;
				} else {
					console.log(response);
					result.classList.add("text-red-500");
					result.innerHTML = json.message;
				}
			})
			.catch((error) => {
				console.log(error);
				result.innerHTML = "Something went wrong!";
			})
			.then(function () {
				form.reset();
				form.classList.remove("was-validated");
				setTimeout(() => {
					result.style.display = "none";
				}, 5000);
			});
	});
});
const { t } = useI18n();
</script>

<template>
	<form
		action="https://api.web3forms.com/submit"
		method="POST"
		id="form"
		class="needs-validation"
		novalidate
	>
		<input type="hidden" name="access_key" value="3e1280a2-2fcd-4743-9230-5520ed1b4548" />
		<input type="checkbox" class="hidden" style="display: none" name="botcheck" />
		<div class="mb-5">
			<input
				type="text"
				:placeholder="t('NAME_SURNAME')"
				required
				class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-xl outline-none border-black focus:border-[#00308F]"
				name="name"
			/>
			<div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
				{{ t("FULL_NAME_PROMPT") }}
			</div>
		</div>
		<div class="mb-5">
			<label for="email_address" class="sr-only">{{t('EMAIL')}}</label
			><input
				id="email_address"
				type="email"
				:placeholder="t('EMAIL')"
				name="email"
				required
				class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-xl outline-none border-black focus:border-[#00308F]"
			/>
			<div class="empty-feedback text-red-400 text-sm mt-1">
				{{ t("EMAIL_PROMPT") }}
			</div>
			<div class="invalid-feedback text-red-400 text-sm mt-1">
				{{ t("VALID_EMAIL_PROMPT") }}
			</div>
		</div>
		<div class="mb-3">
			<textarea
				name="message"
				required
				:placeholder="t('YOUR_MESSAGE')"
				class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-xl outline-none h-36 border-black focus:border-[#00308F]"
			></textarea>
			<div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
				{{ t("MESSAGE_PROMPT") }}
			</div>
		</div>
		<LandingButton type="submit" size="lg" block class="rounded-full">{{
			t("SEND_MESSAGE")
		}}</LandingButton>
		<div id="result" class="mt-3 text-center"></div>
	</form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
	display: none;
}

.was-validated :placeholder-shown:invalid ~ .empty-feedback {
	display: block;
}

.was-validated :not(:placeholder-shown):invalid ~ .invalid-feedback {
	display: block;
}

.is-invalid,
.was-validated :invalid {
	border-color: #dc3545;
}
</style>
