/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,jsx}"],
	theme: {
		extend: {
			colors: {
                primary: "#ffffff0d",
                secondary: "#ffffff1a",
				emphasis: "#7209b7",
            },
		},
	},
	plugins: [],
};
