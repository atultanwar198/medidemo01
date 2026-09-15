"use client";

import { useMemo, useState } from "react";

import LanguageSelection from "@/components/consultation/LanguageSelection";
import {
  consultationCategories,
  getQuestionsForCategory,
  type ConsultationCategory,
  type Question,
} from "@/data/consultation";

type Language = "en" | "hi";
type Step = "language" | "category" | "concern" | "questions";

const copy = {
  en: {
    chooseLanguage: "Choose your language",
    continue: "Continue",
    consultationType: "What would you like help with?",
    healthConcern: "What is your health concern?",
    healthConcernHint:
      "Briefly describe the main reason you need a consultation.",
    back: "Back",
    next: "Next question",
    submit: "Submit consultation",
    submitting: "Submitting…",
    question: "Question",
    of: "of",
    required: "Please provide an answer before continuing.",
    completeCategory: "Please choose a consultation type.",
    completeConcern: "Please describe your health concern.",
    submitted: "Your consultation has been submitted for doctor review.",
    unable: "Unable to submit the consultation.",
  },
  hi: {
    chooseLanguage: "अपनी भाषा चुनें",
    continue: "आगे बढ़ें",
    consultationType: "आपको किस बारे में सहायता चाहिए?",
    healthConcern: "आपकी स्वास्थ्य संबंधी चिंता क्या है?",
    healthConcernHint: "परामर्श लेने का मुख्य कारण संक्षेप में बताएं।",
    back: "वापस",
    next: "अगला प्रश्न",
    submit: "परामर्श जमा करें",
    submitting: "जमा किया जा रहा है…",
    question: "प्रश्न",
    of: "में से",
    required: "आगे बढ़ने से पहले उत्तर दें।",
    completeCategory: "कृपया परामर्श का प्रकार चुनें।",
    completeConcern: "कृपया अपनी स्वास्थ्य संबंधी चिंता बताएं।",
    submitted: "आपका परामर्श डॉक्टर की समीक्षा के लिए भेज दिया गया है।",
    unable: "परामर्श जमा नहीं किया जा सका।",
  },
} as const;

export default function ConsultationForm() {
  const [language, setLanguage] = useState<Language>("en");
  const [step, setStep] = useState<Step>("language");
  const [category, setCategory] = useState<ConsultationCategory | null>(null);
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const questions = useMemo(
    () => (category ? getQuestionsForCategory(category) : []),
    [category],
  );
  const activeQuestion = questions[questionIndex];
  const text = copy[language];

  function goTo(nextStep: Step) {
    setMessage("");
    setStep(nextStep);
  }
  function selectCategory(nextCategory: ConsultationCategory) {
    setCategory(nextCategory);
    setAnswers({});
    setQuestionIndex(0);
  }
  function questionLabel(question: Question) {
    return question[language];
  }

  async function submit() {
    if (
      !category ||
      questions.some((question) => !answers[question.id]?.trim())
    ) {
      setMessage(text.required);
      return;
    }
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          consultationCategory: category,
          chiefComplaint,
          consent: true,
          history: questions.map((question) => ({
            questionId: question.id,
            question: question[language],
            answer: answers[question.id],
          })),
        }),
      });
      const data = await response.json();
      setMessage(response.ok ? text.submitted : data.message || text.unable);
      if (response.ok) {
        setCategory(null);
        setChiefComplaint("");
        setAnswers({});
        setQuestionIndex(0);
        setStep("language");
      }
    } catch {
      setMessage(text.unable);
    } finally {
      setSaving(false);
    }
  }

  function handleQuestionContinue() {
    if (!activeQuestion || !answers[activeQuestion.id]?.trim()) {
      setMessage(text.required);
      return;
    }
    setMessage("");
    if (questionIndex === questions.length - 1) {
      void submit();
      return;
    }
    setQuestionIndex((index) => index + 1);
  }

  return (
    <section aria-live="polite" className="mx-auto max-w-xl">
      {step === "language" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {text.chooseLanguage}
          </h2>
          <LanguageSelection language={language} setLanguage={setLanguage} />
          <button
            type="button"
            onClick={() => goTo("category")}
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            {text.continue}
          </button>
        </div>
      )}
      {step === "category" && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {text.consultationType}
          </h2>
          <div className="space-y-3">
            {consultationCategories.map((item) => (
              <label
                key={item.value}
                className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-blue-400"
              >
                <input
                  type="radio"
                  name="category"
                  value={item.value}
                  checked={category === item.value}
                  onChange={() => selectCategory(item.value)}
                />
                <span>{item[language]}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goTo("language")}
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700"
            >
              {text.back}
            </button>
            <button
              type="button"
              onClick={() =>
                category ? goTo("concern") : setMessage(text.completeCategory)
              }
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              {text.continue}
            </button>
          </div>
        </div>
      )}
      {step === "concern" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {text.healthConcern}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {text.healthConcernHint}
            </p>
          </div>
          <textarea
            value={chiefComplaint}
            onChange={(event) => setChiefComplaint(event.target.value)}
            className="min-h-32 w-full rounded-lg border border-gray-300 p-3"
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => goTo("category")}
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700"
            >
              {text.back}
            </button>
            <button
              type="button"
              onClick={() =>
                chiefComplaint.trim()
                  ? goTo("questions")
                  : setMessage(text.completeConcern)
              }
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
            >
              {text.continue}
            </button>
          </div>
        </div>
      )}
      {step === "questions" && activeQuestion && (
        <div className="space-y-6">
          <p className="text-sm font-medium text-gray-500">
            {text.question} {questionIndex + 1} {text.of} {questions.length}
          </p>
          <fieldset>
            <legend className="text-xl font-semibold text-gray-900">
              {questionLabel(activeQuestion)}
            </legend>
            <div className="mt-4 space-y-3">
              {activeQuestion.responseType === "choice" ? (
                activeQuestion.options?.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 hover:border-blue-400"
                  >
                    <input
                      type="radio"
                      name={activeQuestion.id}
                      value={option.value}
                      checked={answers[activeQuestion.id] === option.value}
                      onChange={(event) =>
                        setAnswers((current) => ({
                          ...current,
                          [activeQuestion.id]: event.target.value,
                        }))
                      }
                    />
                    <span>{option[language]}</span>
                  </label>
                ))
              ) : (
                <input
                  type={
                    activeQuestion.responseType === "scale" ? "number" : "text"
                  }
                  min={activeQuestion.responseType === "scale" ? 0 : undefined}
                  max={activeQuestion.responseType === "scale" ? 10 : undefined}
                  value={answers[activeQuestion.id] || ""}
                  onChange={(event) =>
                    setAnswers((current) => ({
                      ...current,
                      [activeQuestion.id]: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 p-3"
                />
              )}
            </div>
          </fieldset>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                questionIndex === 0
                  ? goTo("concern")
                  : setQuestionIndex((index) => index - 1)
              }
              className="rounded-lg border border-gray-300 px-5 py-3 font-medium text-gray-700"
            >
              {text.back}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleQuestionContinue}
              className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {saving
                ? text.submitting
                : questionIndex === questions.length - 1
                  ? text.submit
                  : text.next}
            </button>
          </div>
        </div>
      )}
      {message && (
        <p role="status" className="mt-4 text-sm text-red-600">
          {message}
        </p>
      )}
    </section>
  );
}
