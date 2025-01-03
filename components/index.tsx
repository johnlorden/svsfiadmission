'use client'

import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { useToast } from 'import { useToast } from "@/hooks/use-toast"'
import { ApplyingFor } from './ApplyingFor'
import { StudentInformation } from './StudentInformation'
import { FamilyBackground } from './FamilyBackground'
import { EducationalBackground } from './EducationalBackground'
import { DocumentUpload } from './DocumentUpload'

const formSchema = z.object({
  applyingFor: z.object({
    gradeLevel: z.string(),
    strand: z.string().optional(),
  }),
  studentInformation: z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    middleName: z.string().optional(),
    birthdate: z.string(),
    gender: z.string(),
    address: z.string(),
    city: z.string(),
    province: z.string(),
    postalCode: z.string(),
  }),
  familyBackground: z.object({
    fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
    fatherOccupation: z.string(),
    motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
    motherOccupation: z.string(),
    guardianName: z.string().optional(),
    guardianRelationship: z.string().optional(),
    householdIncome: z.string(),
  }),
  educationalBackground: z.object({
    previousSchool: z.string().min(2, "Previous school name must be at least 2 characters"),
    schoolAddress: z.string(),
    schoolContact: z.string().optional(),
    lrn: z.string().length(12, "LRN must be exactly 12 characters"),
    lastGradeCompleted: z.string(),
  }),
  documents: z.array(z.object({
    name: z.string(),
    file: z.instanceof(File),
  })),
})

type FormData = z.infer<typeof formSchema>

const steps = ['Applying For', 'Student Information', 'Family Background', 'Educational Background', 'Document Upload']

export function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  })
  const { toast } = useToast()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/submit-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your application has been submitted successfully.",
        })
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleNext = async () => {
    const isValid = await methods.trigger(steps[currentStep].toLowerCase().replace(' ', '') as keyof FormData)
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ApplyingFor />
      case 1:
        return <StudentInformation />
      case 2:
        return <FamilyBackground />
      case 3:
        return <EducationalBackground />
      case 4:
        return <DocumentUpload />
      default:
        return null
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${
                index <= currentStep ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                {index + 1}
              </div>
              <span className="ml-2 text-sm hidden md:inline">{step}</span>
            </div>
          ))}
        </div>

        {renderStep()}

        <div className="flex justify-between mt-8">
          {currentStep > 0 && (
            <Button type="button" onClick={handlePrevious} variant="outline">
              Previous
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit">Submit Application</Button>
          )}
        </div>
      </form>
    </FormProvider>
  )
}

