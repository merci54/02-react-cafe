import "modern-normalize";
import css from './App.module.css'
import CafeInfo from "../CafeInfo/CafeInfo";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import Notification from "../Notification/Notification";
import type { Votes, VoteType } from "../../types/votes";

import { useState } from "react";

export default function App() {

  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0
  })

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1
    })
  }

  const resetVotes = () => {
    setVotes({
    good: 0,
    neutral: 0,
    bad: 0
  })
  }

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0


  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes > 0} />
      {totalVotes == 0 ? <Notification /> : <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />}
    </div>
  )
}
