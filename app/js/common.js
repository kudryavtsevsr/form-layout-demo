$(function() {

	// Переменые
	var form = $("#form"),
	email = form.find("#email"),
	password = form.find("#password"),
	signIn = form.find("#sign-in"),
	focusout = {
		email: false,
		password: false
	},
	validation = {
		email: false,
		password: false
	};

	// --- Открытие и закрытие формы ---
	$("#open-form").on("click", function() {
		$("#form").slideDown();
		return false;
	});
	$("#close").on("click", function() {
		$("#form").slideUp();
		return false;
	});

	// --- Валидация формы ---

	// Если поле почты потеряло фокус
	email.on("focusout", function() {
		validation['email'] = validEmail(email);
		focusout['email'] = true;
		formIsValid();
	});

	// Если в поле почты вводят данные
	email.on("input", function() {
		if(!focusout['email']) {
			validation['email'] = validEmail(email,false);
		} else {
			validation['email'] = validEmail(email,true);
		}
		formIsValid();
	});

	// Если поле пароля потеряло фокус
	password.on("focusout", function() {
		validation['password'] = validPassword(password);
		focusout['password'] = true;
		formIsValid();
	});

	// Если в поле пароля вводят данные
	password.on("input", function() {
		if(!focusout['password']) {
			validation['password'] = validPassword(password,false);
		} else {
			validation['password'] = validPassword(password,true);
		}
		formIsValid();
	});

	// Если пытаются отправить форму
	$("#form").submit(function () {
		validation['email'] = validEmail(email);
		focusout['email'] = true;
		validation['password'] = validPassword(password);
		focusout['password'] = true;
		formIsValid();
	});

	// --- Отправка формы --- 
	$("#form").submit(function () {
		if (!formIsValid()) return false;

		// Данные для отправки
		var response = {};
		response['email'] = email.val();
		response['password'] = password.val() ;
		response['remember'] = form.find("#remember").is(":checked") ? 'Да' : 'Нет';

		// Отправка
		console.log("Отправка: ", response);

		// Сброс формы после отправки
		validation = {email: false, password: false};
		form.trigger("reset");
		formIsValid();

		alert("Data was successfully sent!");

		return false;
	});

	// --- Вспомогательные функции ---

	// Валидация почты
	function validEmail(email,addClass) {
		var re_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (!re_email.test(email.val())) {
			if(addClass) email.addClass("input__field--error");
			console.log('email error');
			return false;
		} else {
			if(addClass) email.removeClass("input__field--error");
			return true;
		}
	}

	// Валидация пароля
	function validPassword(password,addClass) {
		if (password.val().length < 5) {
			if(addClass) password.addClass("input__field--error");
			console.log('password error');
			return false;
		} else {
			if(addClass) password.removeClass("input__field--error");
			return true;
		}
	}

	// Проверка валидности формы и активация кнопки
	function formIsValid() {
		if (!validation['email'] || !validation['password']) {
			signIn.addClass("sign-in--disabled");
			return false;
		} else {
			signIn.removeClass("sign-in--disabled");
			return true;
		}
	}

});
