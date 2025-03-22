declare global {
	interface ResBody {
		success: boolean
		error?: string
		data?: any
		total?: number
		code?: string
		isEmpty?: boolean
	}

	interface urlListItem {
		url: string
		slug: string
		clicks: number
	}
}

export {}
