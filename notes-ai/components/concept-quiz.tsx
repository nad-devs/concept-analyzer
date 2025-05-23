"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, BookOpen } from "lucide-react"

interface ConceptQuizProps {
  concept: any
  questions: any[]
  onComplete: (score: number) => void
}

export function ConceptQuiz({ concept, questions, onComplete }: ConceptQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    const correct = answer === currentQuestion.answer
    setIsCorrect(correct)
    if (correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score + (isCorrect ? 1 : 0))
    } else {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setIsCorrect(null)
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-primary" />
            Quiz: {concept.title}
          </CardTitle>
          <Badge variant="outline">
            Question {currentIndex + 1} of {questions.length}
          </Badge>
        </div>
        <CardDescription>Test your knowledge of this concept</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-lg font-medium">{currentQuestion.question}</div>

        {currentQuestion.options && (
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  selectedAnswer === option
                    ? isCorrect
                      ? "outline"
                      : "destructive"
                    : selectedAnswer && option === currentQuestion.answer
                      ? "outline"
                      : "secondary"
                }
                className={`w-full justify-start text-left ${
                  selectedAnswer === option && isCorrect
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : ""
                } ${
                  selectedAnswer && option === currentQuestion.answer && selectedAnswer !== option
                    ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : ""
                }`}
                disabled={selectedAnswer !== null}
                onClick={() => handleAnswerSelect(option)}
              >
                {selectedAnswer === option && isCorrect && (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                )}
                {selectedAnswer === option && !isCorrect && <XCircle className="mr-2 h-4 w-4" />}
                {selectedAnswer && option === currentQuestion.answer && selectedAnswer !== option && (
                  <CheckCircle className="mr-2 h-4 w-4 text-green-500 dark:text-green-400" />
                )}
                {!selectedAnswer || (selectedAnswer !== option && option !== currentQuestion.answer) ? (
                  <div className="w-4 h-4 mr-2 rounded-full border border-current inline-flex items-center justify-center" />
                ) : null}
                {option}
              </Button>
            ))}
          </div>
        )}

        {selectedAnswer && (
          <div
            className={`p-4 rounded-md ${
              isCorrect
                ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200"
                : "bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-200"
            }`}
          >
            <div className="font-medium flex items-center">
              {isCorrect ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" /> Correct!
                </>
              ) : (
                <>
                  <XCircle className="mr-2 h-4 w-4" /> Incorrect
                </>
              )}
            </div>
            <p className="mt-1 text-sm">
              {isCorrect ? "Great job! You got it right." : `The correct answer is: ${currentQuestion.answer}`}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/20">
        <div className="text-sm text-muted-foreground">
          Score: {score}/{currentIndex + (selectedAnswer ? 1 : 0)} correct
        </div>
        <Button onClick={handleNext} disabled={selectedAnswer === null}>
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </Button>
      </CardFooter>
    </Card>
  )
}
