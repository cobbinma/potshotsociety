import { Instruction } from '@/lib/types'

interface InstructionStepsProps {
  instructions: Instruction[]
}

export function InstructionSteps({ instructions }: InstructionStepsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground mb-4">Instructions</h2>
      <ol className="space-y-6">
        {instructions.map((instruction, index) => (
          <li key={instruction._key} className="flex gap-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {index + 1}
            </span>
            <p className="flex-1 pt-1 text-foreground leading-relaxed">
              {instruction.step}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
