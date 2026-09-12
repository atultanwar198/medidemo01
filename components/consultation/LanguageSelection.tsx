"use client";

interface LanguageSelectorProps {
  language: "en" | "hi";
  setLanguage: (language: "en" | "hi") => void;
}

export default function LanguageSelector({
  language,
  setLanguage,
}: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-2xl border p-6 text-left transition ${
          language === "en"
            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="mb-2 text-3xl">🇬🇧</div>

        <h3 className="font-semibold text-gray-900">English</h3>

        <p className="mt-1 text-sm text-gray-500">Continue in English</p>
      </button>

      <button
        type="button"
        onClick={() => setLanguage("hi")}
        className={`rounded-2xl border p-6 text-left transition ${
          language === "hi"
            ? "border-blue-600 bg-blue-50 ring-2 ring-blue-100"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="mb-2 text-3xl">🇮🇳</div>

        <h3 className="font-semibold text-gray-900">हिंदी</h3>

        <p className="mt-1 text-sm text-gray-500">हिंदी में जारी रखें</p>
      </button>
    </div>
  );
}
