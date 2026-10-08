import Swal from 'sweetalert2';

export async function showErrorAlert(title: string, text: string) {
	return Swal.fire({
		icon: 'error',
		title: title,
		text: text,
		confirmButtonColor: '#d33'
	});
}

export async function showSuccessAlert(title: string, text: string) {
	return Swal.fire({
		icon: 'success',
		title: title,
		html: `<span style="font-size: 16px;"> ${text}</span>`,
		confirmButtonColor: '#a82e2e', // primary 컬러 적용
		confirmButtonText: '확인',
		customClass: {
			title: 'swal-title-custom',
			popup: 'swal-popup-custom'
		}
	});
}