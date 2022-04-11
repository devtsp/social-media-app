export function timePassed(time) {
	const old = new Date(time);
	const now = new Date();
	const diff = now - old;
	const msInHrs = 1000 * 60 * 60;
	const msInMn = 1000 * 60;
	const hrs = Math.floor(diff / msInHrs);
	const mn = Math.floor((diff % (hrs * msInHrs)) / msInMn);
	return hrs < 24 ? `${hrs} hours ago` : `${Math.floor(hrs / 24)} days ago`;
}
