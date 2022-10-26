import { useEffect } from 'react'
import { differenceInSeconds } from 'date-fns'
import { useCycle } from 'contexts/cyclesContext'

import * as S from './styles'

export function Countdown() {
  const {
    activeCycle,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed
  } = useCycle()

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secontAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secontAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        )
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDifference)
        }
      }, 1000)
    }
    return () => {
      // serve para limpar o ciclo antigo caso comece um novo ciclo
      clearInterval(interval)
    }
  }, [activeCycle, markCurrentCycleAsFinished, setSecondsPassed, totalSeconds])

  return (
    <S.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <S.Separator>:</S.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </S.CountdownContainer>
  )
}
