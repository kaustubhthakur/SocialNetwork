import { useCallback } from "react";

const useShowToast = () => {
	const showToast = useCallback((title, description, status) => {
		// Create a simple custom toast
		const toastContainer = document.createElement("div");
		toastContainer.style.position = "fixed";
		toastContainer.style.top = "20px";
		toastContainer.style.right = "20px";
		toastContainer.style.backgroundColor = status === "error" ? "red" : "green";
		toastContainer.style.color = "white";
		toastContainer.style.padding = "10px 20px";
		toastContainer.style.borderRadius = "5px";
		toastContainer.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
		toastContainer.style.zIndex = "1000";

		toastContainer.innerHTML = `<strong>${title}</strong><p>${description}</p>`;
		document.body.appendChild(toastContainer);

		// Remove the toast after 3 seconds
		setTimeout(() => {
			document.body.removeChild(toastContainer);
		}, 3000);
	}, []);

	return showToast;
};

export default useShowToast;
