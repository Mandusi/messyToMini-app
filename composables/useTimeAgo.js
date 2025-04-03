import { ref, computed } from 'vue'

export function useTimeAgo(isoDate) {
	const timestamp = new Date(isoDate).getTime() // Convert ISO date to timestamp
	const now = ref(Date.now())

	// Update `now` every 1 seconds
	setInterval(() => {
		now.value = Date.now()
	}, 1000)

	const timeAgo = computed(() => {
		const diffInSeconds = Math.floor((now.value - timestamp) / 1000)

		const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

		if (diffInSeconds < 60) return rtf.format(-diffInSeconds, 'second')
		const diffInMinutes = Math.floor(diffInSeconds / 60)
		if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute')
		const diffInHours = Math.floor(diffInMinutes / 60)
		if (diffInHours < 24) return rtf.format(-diffInHours, 'hour')
		const diffInDays = Math.floor(diffInHours / 24)
		if (diffInDays < 7) return rtf.format(-diffInDays, 'day')
		const diffInWeeks = Math.floor(diffInDays / 7)
		if (diffInWeeks < 4) return rtf.format(-diffInWeeks, 'week')
		const diffInMonths = Math.floor(diffInDays / 30)
		if (diffInMonths < 12) return rtf.format(-diffInMonths, 'month')
		const diffInYears = Math.floor(diffInMonths / 12)
		return rtf.format(-diffInYears, 'year')
	})

	return timeAgo
}
