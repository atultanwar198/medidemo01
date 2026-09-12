"use client";

import { useMemo, useState } from "react";
import { consultationCategories, getQuestionsForCategory, type ConsultationCategory } from "@/data/consultation";

export default function ConsultationForm() {
  const [category, setCategory] = useState<ConsultationCategory>("symptoms");
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const questions = useMemo(() => getQuestionsForCategory(category), [category]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!chiefComplaint.trim() || questions.some((question) => !answers[question.id]?.trim())) {
      setMessage("Please complete the concern and every question.");
      return;
    }
    setSaving(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "en",
          consultationCategory: category,
          chiefComplaint,
          consent: true,
          history: questions.map((question) => ({ questionId: question.id, question: question.en, answer: answers[question.id] })),
        }),
      });
      const data = await response.json();
      setMessage(response.ok ? "Your consultation has been submitted for doctor review." : data.message || "Unable to submit the consultation.");
      if (response.ok) { setChiefComplaint(""); setAnswers({}); }
    } catch { setMessage("Unable to submit the consultation."); } finally { setSaving(false); }
  }

  return <form onSubmit={submit}>
    <label>Consultation type<select value={category} onChange={(event) => { setCategory(event.target.value as ConsultationCategory); setAnswers({}); }}>
      {consultationCategories.map((item) => <option key={item.value} value={item.value}>{item.en}</option>)}
    </select></label>
    <label>Your health concern<textarea value={chiefComplaint} onChange={(event) => setChiefComplaint(event.target.value)} required /></label>
    {questions.map((question) => <fieldset key={question.id}><legend>{question.en}</legend>
      {question.responseType === "choice" ? question.options?.map((option) => <label key={option.value}><input type="radio" name={question.id} value={option.value} checked={answers[question.id] === option.value} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} required /> {option.en}</label>) :
        <input type={question.responseType === "scale" ? "number" : "text"} min={question.responseType === "scale" ? 0 : undefined} max={question.responseType === "scale" ? 10 : undefined} value={answers[question.id] || ""} onChange={(event) => setAnswers({ ...answers, [question.id]: event.target.value })} required />}
    </fieldset>)}
    <button type="submit" disabled={saving}>{saving ? "Submitting…" : "Submit consultation"}</button>
    {message && <p role="status">{message}</p>}
  </form>;
}
