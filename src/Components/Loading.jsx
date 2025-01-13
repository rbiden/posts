export default function Loading() {
	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='flex gap-12'>
				<div className='rounded-full bg-white h-8 w-8 animate-ping'></div>
				<div
					className='rounded-full bg-white h-8 w-8 animate-ping'
					style={{ animationDelay: "0.3s" }}
				></div>
				<div
					className='rounded-full bg-white h-8 w-8 animate-ping'
					style={{ animationDelay: "0.6s" }}
				></div>
			</div>
		</div>
	);
}
