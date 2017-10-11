export interface Vote {
    state: VoteState,
    rating: number,
    positive: number,
    negative: number
}

export type VoteState = "none" | "positive" | "negative";