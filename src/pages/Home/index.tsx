import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { useCycle } from 'contexts/cyclesContext'

import { HandPalm, Play } from 'phosphor-react'

import * as S from './styles'

const validateSchema = zod.object({
  task: zod.string().min(1, 'Infome a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos')
})

type NewCycleFormData = zod.infer<typeof validateSchema>

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useCycle()

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(validateSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  const isSubmitDisabled = watch('task')

  return (
    <S.HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <S.StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} /> Interromper
          </S.StopCountdownButton>
        ) : (
          <S.StartCountdownButton disabled={!isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </S.StartCountdownButton>
        )}
      </form>
    </S.HomeContainer>
  )
}
