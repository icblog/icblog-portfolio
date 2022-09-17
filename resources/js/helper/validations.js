import { handleOutputInFo } from "./functions";

//==============================================================================================//
//========================Validate Form Elements Helpers======================================//
//==============================================================================================//

function checkElementEmpty(elemId, message) {
	var elemValue = elemId.val().trim();
	if (elemValue === "") {
		return {
			outCome: false,
			errorDiv: handleOutputInFo(message, "error", false),
		};
	} else {
		return { outCome: true };
	}
} //function checkEmpty ends

function checkFormat(elemId, message, format) {
	var elemValue = elemId.val().trim();
	if (elemValue !== "") {
		if (!format.test(elemValue)) {
			return {
				outCome: false,
				errorDiv: handleOutputInFo(message, "error", false),
			};
		} else {
			return { outCome: true };
		}
	} // not empty
} //function checkFormat ends

function checkLenghtAnything(elemId, lenghtNumber, message) {
	var elemValue = elemId.val().trim();

	if (elemValue.length < lenghtNumber) {
		return {
			outCome: false,
			errorDiv: handleOutputInFo(message, "error", false),
		};
	} else {
		return { outCome: true };
	}
} //function checkLenghtAnything

function checkEqualityAnything(elemId, elemId2, message) {
	var elemValue = elemId.val().trim();
	var elemValue2 = elemId2.val().trim();

	if (elemValue !== elemValue2) {
		return {
			outCome: false,
			errorDiv: handleOutputInFo(message, "error", false),
		};
	} else {
		return { outCome: true };
	}
} // function checkEqualityAnything

//==============================================================================================//
//============================Validate Form Elements =============================================//
//==============================================================================================//

export const validateEmail = (elemId) => {
	let message = "*Email required",
		result = "",
		format =
			/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

	result = checkElementEmpty(elemId, message);
	if (!result.outCome) {
		return result.errorDiv;
	}

	message = "*Invalid email format";
	result = checkFormat(elemId, message, format);
	if (!result.outCome) {
		return result.errorDiv;
	}

	return true;
}; // function validateEmail ends


export const validateElementEmpty = (elemId, message) => {
	let result = "";

	result = checkElementEmpty(elemId, message);
	if (!result.outCome) {
		return result.errorDiv;
	}


	return true;
}; // function validateElementEmpty ends


