const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`
export async function generateQuiz(theme) {
    const prompt = `Génère un quiz de 20 questions à choix multiples en français sur le thème "${theme}".
Répartition exacte et ordre imposé :
- 5 questions de difficulté "facile" (en premier)
- 7 questions de difficulté "intermediaire" (ensuite)
- 5 questions de difficulté "difficile" (ensuite)
- 3 questions de difficulté "expert" (en dernier)

Chaque question doit avoir EXACTEMENT 4 propositions : 1 bonne réponse et 3 mauvaises réponses plausibles.
Réponds UNIQUEMENT avec un tableau JSON valide de 20 éléments, sans texte avant ni après, respectant cet ordre et ce format exact :
[
  {
    "question": "...",
    "difficulty": "facile",
    "correct_answer": "...",
    "incorrect_answers": ["...", "...", "..."]
  }
]`

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    })

    if (!response.ok) {
        const errorBody = await response.json()
        console.error('Erreur API complète :', errorBody)
        throw new Error(errorBody.error?.message || 'Erreur inconnue')
    }

    const data = await response.json()
    const rawText = data.candidates[0].content.parts[0].text
    const cleanText = rawText.replace(/```json|```/g, '').trim()
    return JSON.parse(cleanText)
}