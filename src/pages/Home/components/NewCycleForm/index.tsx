import { useFormContext } from 'react-hook-form'
import { useCycle } from 'contexts/cyclesContext'

import * as S from './styles'

export function NewCycleForm() {
  const { activeCycle } = useCycle()
  const { register } = useFormContext()

  return (
    <S.FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <S.TaskInput
        id="task"
        disabled={!!activeCycle}
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
      />
      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
      </datalist>
      <label htmlFor="minutesAmount">durante</label>
      <S.MinutesAmountInput
        type="number"
        disabled={!!activeCycle}
        id="minutesAmount"
        placeholder="00"
        step={5}
        min={1}
        max={60}
        {...register('minutesAmount', { valueAsNumber: true })}
      />
      <span>minutos.</span>
    </S.FormContainer>
  )
}
